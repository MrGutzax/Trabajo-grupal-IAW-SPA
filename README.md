# Ringua · Red IoT de Monitorización y Control

Proyecto de grupo de 2º de ASIR (IAW): web del proyecto Ringua, una simulación de red IoT hecha en Cisco Packet Tracer con scripts en Python.

**Autores:** Dennise, Rashed, Fiorella, Ángel y Gustavo

**Web publicada:** https://mrgutzax.github.io/Trabajo-grupal-IAW-SPA/

## Fases

| Fase | Producto | Rama |
| --- | --- | --- |
| 1 | Web estática multipágina (`index`, `proyecto`, `dispositivos`, `panel`, `contacto`) | `v1.0-estatica` |
| 2 | SPA: un único `index.html` con secciones e interacciones DOM | `v2.0-spa` |
| 3 | Versión de producción publicada en GitHub Pages | `main` |

## Estructura

```text
/
├── index.html      # Todas las vistas: inicio, proyecto, dispositivos, panel y contacto
├── js/main.js      # Navegación SPA y la parte de cada integrante (marcada con su nombre)
└── img/            # Logotipo y esquema de la topología
```

## Interacciones DOM

- **Navegación SPA:** el menú y los enlaces muestran y ocultan cada sección sin recargar la página.
- **Dispositivos:** filtro por categoría y buscador por nombre, ID o IP, con contador y aviso sin resultados.
- **Panel:** simulación de lecturas con umbrales, alertas y registro de eventos.
- **Contacto:** validación del formulario.
- **Inicio y proyecto:** novedades del sistema y botón para mostrar u ocultar las fases.
