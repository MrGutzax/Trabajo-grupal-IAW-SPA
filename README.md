# Ringua — Portal Web y Panel de Simulación de Red IoT

Sitio web multipágina desarrollado con **HTML5 semántico**, **Bootstrap 5.3** y **CSS3** para presentar y documentar el proyecto **Ringua**: una simulación de red IoT de monitorización y control hídrico realizada en **Cisco Packet Tracer** con scripts de automatización en **Python** para **2º de ASIR** (Administración de Sistemas Informáticos en Red).

- **Autores:** Dennise, Rashed, Fiorella, Ángel y Gustavo
- **Curso:** 2º de CFGS ASIR

La estructura del proyecto está diseñada de forma modular y con **ganchos para el DOM (`id`, clases `js-*` y atributos `data-*`)** listos para programar la interactividad en JavaScript y su posterior conversión en una **SPA (Single Page Application)**.

---

## Estructura de carpetas y archivos

```text
/
├── index.html          # Página de inicio: hero, resumen, 3 tarjetas destacadas y lista dinámica
├── proyecto.html       # Descripción técnica, objetivos, tecnologías, fases y barra lateral (aside)
├── dispositivos.html   # Catálogo de 9 dispositivos IoT, filtros, buscador, contador y ventana modal
├── panel.html          # Maqueta de dashboard con 4 tarjetas de métricas y tabla de últimos eventos
├── contacto.html       # Formulario de contacto con validación Bootstrap e información de los autores
├── css/
│   └── styles.css      # Estilos propios mínimos, accesibilidad y clases .oculto / .resaltado
├── js/
│   └── main.js         # Archivo preparado para programar la lógica del DOM (enlazado con defer)
├── img/
│   ├── logo-ringua.svg       # Logotipo vectorial del proyecto
│   └── topologia-ringua.svg  # Esquema placeholder de la topología de Packet Tracer
└── README.md           # Documentación del repositorio
```

---

## Características técnicas

- **HTML5 semántico y accesible:** uso de `<header>`, `<nav>`, `<main id="contenido">`, `<section>`, `<article>`, `<aside>` y `<footer>`, enlace *Saltar al contenido principal*, jerarquía única de `<h1>` por documento y atributos ARIA.
- **Diseño responsive (Mobile First):** maquetación con el sistema de rejilla de Bootstrap 5.3 (`container`, `row`, `col-12 col-md-6 col-lg-4`, `col-12 col-lg-8` + `col-12 col-lg-4`).
- **Preparado para JavaScript y SPA:**
  - Cada página encapsula su vista dentro de `<main id="contenido">` y un `<section id="inicio|proyecto|dispositivos|panel|contacto" class="js-seccion">`.
  - Cabecera (`<header>`) y pie (`<footer>`) idénticos en todos los archivos.
  - Clases de utilidad `.oculto` y `.resaltado` predefinidas en `css/styles.css`.
  - Comentarios `<!-- EDITAR: ... -->` para personalizar datos técnicos y `<!-- JS: ... -->` junto a cada gancho del DOM.

---

## Cómo ejecutar el proyecto en local

Al utilizar únicamente rutas relativas y Bootstrap 5.3 por CDN, no necesitas instalar dependencias ni gestores de paquetes:

1. Clona o descarga este repositorio en tu equipo:
   ```bash
   git clone https://github.com/TU-USUARIO/ringua-iot.git
   cd ringua-iot
   ```
2. **Opción A (Directa):** haz doble clic sobre `index.html` para abrirlo en tu navegador web.
3. **Opción B (Recomendada para desarrollo):** abre la carpeta en **Visual Studio Code** y utiliza la extensión **Live Server** (*Go Live*), o ejecuta un servidor HTTP ligero con Python:
   ```bash
   python -m http.server 8000
   ```
   Después abre `http://localhost:8000` en el navegador.

---

## Cómo publicarlo en GitHub Pages

1. Sube todos los archivos a un repositorio público en tu cuenta de GitHub.
2. Entra en tu repositorio en GitHub y abre la pestaña **Settings** (Configuración).
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En el apartado **Build and deployment** > **Source**, selecciona **Deploy from a branch**.
5. En **Branch**, elige la rama principal (`main` o `master`) y la carpeta **`/ (root)`**, y pulsa **Save**.
6. Espera entre 1 y 2 minutos y recarga la página: GitHub mostrará la URL pública de tu web (`https://tu-usuario.github.io/nombre-repo/`).
