/**
 * Proyecto Ringua - Simulación de Red IoT (2º ASIR)
 * Autores: Dennise, Rashed, Fiorella, Ángel y Gustavo
 * Archivo: js/main.js
 * Descripción: Archivo principal de JavaScript para la manipulación del DOM,
 * filtrado del catálogo IoT, eventos del panel, validación del formulario
 * y futura conversión a SPA (Single Page Application).
 */

// main.js se carga en todas las páginas: cada parte comprueba antes que su página tiene sus elementos.

// GUSTAVO (dispositivos.html)

if (document.querySelector(".js-filtro") != null) {
    let filtroActivo = "todos"

    const filtrarDispositivos = () => {
        const texto = document.querySelector("#buscador").value.toLowerCase().trim()

        let visibles = 0
        document.querySelectorAll(".js-tarjeta").forEach(tarjeta => {
            const datos = (tarjeta.dataset.nombre + " " + tarjeta.dataset.id + " " + tarjeta.dataset.ip).toLowerCase()
            if ((filtroActivo == "todos" || tarjeta.dataset.tipo == filtroActivo) && datos.includes(texto)) {
                tarjeta.classList.remove("d-none")
                visibles++
            } else {
                tarjeta.classList.add("d-none")
            }
        })

        document.querySelector("#contador-numero").textContent = visibles
        document.querySelector("#sin-resultados").classList.toggle("oculto", visibles != 0)
    }

    document.querySelectorAll(".js-filtro").forEach(boton => {
        boton.addEventListener("click", () => {

            document.querySelectorAll(".js-filtro").forEach(otroBoton => {
                otroBoton.classList.remove("btn-primary")
                otroBoton.classList.add("btn-outline-primary")
            })

            boton.classList.remove("btn-outline-primary")
            boton.classList.add("btn-primary")

            filtroActivo = boton.dataset.filtro
            filtrarDispositivos()
        })
    })

    document.querySelector("#buscador").addEventListener("input", filtrarDispositivos)

    let tarjetaDetalle = null

    document.querySelectorAll(".js-boton-detalle").forEach(boton => {
        boton.addEventListener("click", () => {
            tarjetaDetalle = boton.closest(".js-tarjeta")
            const etiquetas = tarjetaDetalle.querySelectorAll(".badge")

            document.querySelector("#modal-detalle-titulo").textContent = tarjetaDetalle.dataset.nombre
            document.querySelector("#modal-detalle-descripcion").textContent = tarjetaDetalle.querySelector(".card-text").textContent.trim()
            document.querySelector("#modal-detalle-id").textContent = tarjetaDetalle.dataset.id
            document.querySelector("#modal-detalle-tipo").textContent = etiquetas[0].textContent
            document.querySelector("#modal-detalle-estado").textContent = etiquetas[1].textContent
            document.querySelector("#modal-detalle-ip").textContent = tarjetaDetalle.dataset.ip
            document.querySelector("#modal-detalle-ubicacion").textContent = tarjetaDetalle.dataset.ubicacion
            document.querySelector("#modal-detalle-script").textContent = tarjetaDetalle.dataset.script
        })
    })

    document.querySelector("#btn-alternar-estado").addEventListener("click", () => {
        if (tarjetaDetalle == null) {
            return
        }
        const etiquetaEstado = tarjetaDetalle.querySelectorAll(".badge")[1]

        if (tarjetaDetalle.dataset.estado == "activo") {
            tarjetaDetalle.dataset.estado = "inactivo"
            etiquetaEstado.textContent = "Inactivo"
            etiquetaEstado.classList.remove("text-bg-success")
            etiquetaEstado.classList.add("text-bg-secondary")
        } else {
            tarjetaDetalle.dataset.estado = "activo"
            etiquetaEstado.textContent = "Activo"
            etiquetaEstado.classList.remove("text-bg-secondary")
            etiquetaEstado.classList.add("text-bg-success")
        }
        document.querySelector("#modal-detalle-estado").textContent = etiquetaEstado.textContent
    })
}

// ÁNGEL (index.html)

if (document.querySelector("#btn-cargar-novedades") != null) {
    const fases = [
        { numero: 1, titulo: "Análisis de requisitos y diseño de red", estado: "Completada" },
        { numero: 2, titulo: "Despliegue y configuración en Packet Tracer", estado: "Completada" },
        { numero: 3, titulo: "Programación de scripts en Python", estado: "Completada" },
        { numero: 4, titulo: "Pruebas, documentación y presentación", estado: "Actual" }
    ]
    const botonNovedades = document.querySelector("#btn-cargar-novedades")
    const listaNovedades = document.querySelector("#lista-novedades")

    botonNovedades.addEventListener("click", () => {
        if (listaNovedades.children.length == 0) {
            fases.forEach(fase => {
                const estado = document.createElement("span")
                estado.classList.add("badge", "rounded-pill")
                if (fase.estado == "Actual") {
                    estado.classList.add("text-bg-primary")
                } else {
                    estado.classList.add("text-bg-success")
                }
                estado.textContent = fase.estado

                const novedad = document.createElement("li")
                novedad.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center")
                novedad.textContent = "Fase " + fase.numero + ": " + fase.titulo
                novedad.appendChild(estado)
                listaNovedades.appendChild(novedad)
            })
            listaNovedades.hidden = false
        } else {
            listaNovedades.hidden = !listaNovedades.hidden
        }

        if (listaNovedades.hidden) {
            botonNovedades.textContent = "Mostrar novedades"
        } else {
            botonNovedades.textContent = "Ocultar novedades"
        }
        botonNovedades.setAttribute("aria-expanded", !listaNovedades.hidden)
    })
}

// DENNISE (contacto.html)

if (document.querySelector("#form-contacto") != null) {
    let zonaMensajes = document.querySelector("#mensajes")

    // Al pulsar "Enviar mensaje"
    document.querySelector("#btn-enviar").addEventListener("click", evento => {
        evento.preventDefault()

        let nombre = document.querySelector("#nombre")
        let email = document.querySelector("#email")
        let asunto = document.querySelector("#asunto")
        let mensaje = document.querySelector("#mensaje")
        let aceptacion = document.querySelector("#aceptacion")

        // 1. Quitar el rojo a todos
        document.querySelectorAll("#form-contacto .js-campo").forEach(campo => {
            campo.classList.remove("is-invalid")
        })

        // 2. Ponérselo solo a los que estén mal
        if (nombre.value.length < 3) { nombre.classList.add("is-invalid") }
        if (!email.value.includes("@")) { email.classList.add("is-invalid") }
        if (asunto.value == "") { asunto.classList.add("is-invalid") }
        if (mensaje.value.length < 10) { mensaje.classList.add("is-invalid") }
        if (!aceptacion.checked) { aceptacion.classList.add("is-invalid") }

        // 3. Si ninguno está en rojo, mensaje de éxito
        zonaMensajes.textContent = ""
        if (document.querySelectorAll("#form-contacto .is-invalid").length == 0) {
            zonaMensajes.textContent = "Mensaje enviado correctamente."
        }
    })

    // Al pulsar "Limpiar formulario"
    document.querySelector("#btn-limpiar").addEventListener("click", () => {
        document.querySelectorAll("#form-contacto .is-invalid").forEach(campo => {
            campo.classList.remove("is-invalid")
        })
        zonaMensajes.textContent = ""
    })
}

// FIORELLA (panel.html)

if (document.querySelector("#lista-eventos") != null) {
    const tablaEventos = document.querySelector("#lista-eventos")

    // Devuelve un número aleatorio entre min y max (con los decimales indicados)
    const numeroAleatorio = (min, max, decimales) => {
        const numero = Math.random() * (max - min) + min
        return Number(numero.toFixed(decimales))
    }

    // Mira el valor de una tarjeta y actualiza su mensaje de estado y su color.
    // Devuelve true si el valor está fuera de rango.
    const evaluarMetrica = (metrica) => {
        const nombre = metrica.dataset.metrica
        const unidad = metrica.dataset.unidad
        const min = Number(metrica.dataset.min)
        const max = Number(metrica.dataset.max)
        const valor = Number(metrica.querySelector(".js-valor-metrica").textContent)
        const estado = metrica.querySelector("#estado-metrica-" + nombre)

        estado.classList.remove("text-success", "text-danger")

        if (valor < min) {
            estado.classList.add("text-danger")
            estado.textContent = "Por debajo del mínimo (" + min + " " + unidad + ")"
            return true
        }
        if (valor > max) {
            estado.classList.add("text-danger")
            estado.textContent = "Por encima del máximo (" + max + " " + unidad + ")"
            return true
        }

        estado.classList.add("text-success")
        estado.textContent = "Valor normal (" + min + "-" + max + " " + unidad + ")"
        return false
    }

    // Dispositivo que envía cada lectura
    const dispositivos = {
        nivel: { nombre: "Sensor de Nivel de Agua", ip: "192.168.10.11" },
        temperatura: { nombre: "Sensor de Temperatura", ip: "192.168.10.12" },
        humedad: { nombre: "Sensor de Humedad del Suelo", ip: "192.168.10.13" },
        caudal: { nombre: "Sensor de Caudal", ip: "192.168.10.14" }
    }

    // Añade una fila a la tabla de eventos (OK si está en rango, Alerta si no)
    const añadirEvento = (metrica, fueraDeRango) => {
        const nombre = metrica.dataset.metrica
        const valor = metrica.querySelector(".js-valor-metrica").textContent
        const hora = new Date().toLocaleTimeString()
        const dispositivo = dispositivos[nombre] || { nombre: "Home Gateway IoT Central", ip: "192.168.10.1" }

        let texto = "Lectura enviada al Home Gateway: " + nombre + " en " + valor + " " + metrica.dataset.unidad + "."
        if (nombre == "humedad") {
            texto = "Humedad del suelo al " + valor + " %. Lectura enviada al Home Gateway."
        }
        let badge = '<span class="badge text-bg-success">OK</span>'
        let severidad = "info"
        if (fueraDeRango) {
            texto = "Alerta: " + nombre + " fuera de rango (" + valor + " " + metrica.dataset.unidad + ")."
            badge = '<span class="badge text-bg-danger">Alerta</span>'
            severidad = "aviso"
        }

        const fila = document.createElement("tr")
        fila.classList.add("js-fila-evento")
        fila.dataset.severidad = severidad
        fila.innerHTML = `
            <td class="ps-3 text-nowrap"><code>${hora}</code></td>
            <td class="fw-semibold">${dispositivo.nombre}</td>
            <td><code>${dispositivo.ip}</code></td>
            <td>${texto}</td>
            <td class="pe-3 text-end">${badge}</td>
        `
        tablaEventos.appendChild(fila)
    }

    // Fila de la acción automática de riego
    const añadirAccionRiego = () => {
        const fila = document.createElement("tr")
        fila.classList.add("js-fila-evento")
        fila.dataset.severidad = "info"
        fila.innerHTML = `
            <td class="ps-3 text-nowrap"><code>${new Date().toLocaleTimeString()}</code></td>
            <td class="fw-semibold">Electroválvula de Riego Sector A</td>
            <td><code>192.168.10.21</code></td>
            <td>Apertura automática activada por humedad baja.</td>
            <td class="pe-3 text-end"><span class="badge text-bg-primary">Acción</span></td>
        `
        tablaEventos.appendChild(fila)
    }

    // Al pulsar "Simular nueva lectura"
    // (la temperatura ya la actualiza rashed.js; aquí se generan las demás y se evalúan todas)
    document.querySelector(".js-simular-lectura").addEventListener("click", () => {
        let alertas = 0

        const ultimaFila = tablaEventos.lastElementChild
        const TemperaturaActiva = ultimaFila != null && ultimaFila.textContent.includes("Nueva lectura simulada")
        if (!TemperaturaActiva) {
            document.querySelector("#ultima-actualizacion").textContent = "Último muestreo: " + new Date().toLocaleTimeString()
        }

        document.querySelectorAll(".js-metrica").forEach(metrica => {
            const min = Number(metrica.dataset.min)
            const max = Number(metrica.dataset.max)

            if (metrica.dataset.metrica != "temperatura" || !TemperaturaActiva) {
                // Se deja un margen de 10 para que a veces salga fuera de rango
                const decimales = (metrica.dataset.metrica == "caudal" || metrica.dataset.metrica == "temperatura") ? 1 : 0
                const valor = Math.max(0, numeroAleatorio(min - 10, max + 10, decimales))
                metrica.querySelector(".js-valor-metrica").textContent = valor
            }

            const fueraDeRango = evaluarMetrica(metrica)
            if (fueraDeRango) {
                alertas++
            }

            // La temperatura la registra rashed.js si está cargado; las demás se registran aquí
            if (metrica.dataset.metrica != "temperatura" || !TemperaturaActiva) {
                añadirEvento(metrica, fueraDeRango)
            }

            // Humedad por debajo del mínimo: se abre la electroválvula del Sector A
            const humedad = Number(metrica.querySelector(".js-valor-metrica").textContent)
            if (metrica.dataset.metrica == "humedad" && humedad < min) {
                añadirAccionRiego()
            }
        })

        // Contador de registros y estado de la conexión
        document.querySelector("#contador-eventos").textContent = tablaEventos.children.length + " registros"

        const estadoConexion = document.querySelector("#estado-conexion")
        estadoConexion.classList.remove("text-bg-success", "text-bg-warning")
        if (alertas > 0) {
            estadoConexion.classList.add("text-bg-warning")
        } else {
            estadoConexion.classList.add("text-bg-success")
        }
    })

    // Al pulsar "Limpiar eventos"
    document.querySelector(".js-limpiar-eventos").addEventListener("click", () => {
        tablaEventos.innerHTML = ""
        document.querySelector("#contador-eventos").textContent = "0 registros"

        const estadoConexion = document.querySelector("#estado-conexion")
        estadoConexion.classList.remove("text-bg-warning")
        estadoConexion.classList.add("text-bg-success")
    })
}

// RASHED (proyecto.html)

if (document.querySelector("#lista-fases") != null) {
    const listaFases = document.querySelector("#lista-fases")
    const botonFases = document.createElement("button")

    botonFases.type = "button"
    botonFases.className = "btn btn-outline-primary btn-sm mb-3"
    botonFases.textContent = "Ocultar fases"
    listaFases.parentElement.insertBefore(botonFases, listaFases)

    botonFases.addEventListener("click", () => {
        if (listaFases.hidden) {
            listaFases.hidden = false
            botonFases.textContent = "Ocultar fases"
        } else {
            listaFases.hidden = true
            botonFases.textContent = "Mostrar fases"
        }
    })
}
