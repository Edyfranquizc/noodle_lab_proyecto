<div align="center">

  <img src="img/logo-noodle-lab-vector.svg" alt="Logo Noodle/Lab" width="300">

  # 🍜🧪 NOODLE / LAB
  ### *La Fórmula del Ramen Urbano*

  [![Behance](https://img.shields.io/badge/Behance-Identidad_Visual-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/gallery/257381339/NoodleLab-la-formula-del-ramen-urbano)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

  <p align="center">
    <strong>Identidad de marca y desarrollo web interactivo para un laboratorio de ramen <em>take-away</em> en Buenos Aires, Argentina.</strong>
  </p>

</div>

---

## 📌 Sobre el Proyecto

**Noodle/Lab** es una propuesta gastronómica conceptual que fusiona la precisión técnica de un laboratorio científico con la esencia vibrante de la cultura urbana porteña. 

Su concepto clave aborda el ramen desde una perspectiva sintética y experimental: caldos servidos en botellas reutilizables estilo *Erlenmeyer* y packaging sustentable, orgánico y retornable.

Este repositorio abarca desde la conceptualización de la interfaz (UI/UX) hasta la implementación frontend responsive, ofreciendo una experiencia digital dinámica e inmersiva.

🎨 **¿Quieres ver el desarrollo de la identidad visual completa?**  
👉 **[Ver Identidad Visual en Behance](https://www.behance.net/gallery/257381339/NoodleLab-la-formula-del-ramen-urbano)**

---

## 🎨 Sistema de Diseño (Design System)

### 🎨 Paleta Cromática

| Variable CSS | Muestra | Nombre | HEX | Uso Principal |
| :--- | :---: | :--- | :---: | :--- |
| `--bg-lab-white` | <img src="https://placehold.co/20x20/F7F5F0/F7F5F0.png" width="20"> | Lab White | `#F7F5F0` | Fondo primario claro |
| `--brand-graphite` | <img src="https://placehold.co/20x20/2B2B2B/2B2B2B.png" width="20"> | Graphite | `#2B2B2B` | Textos e interfaces neutras |
| `--brand-chili-red` | <img src="https://placehold.co/20x20/E8462F/E8462F.png" width="20"> | Chili Red | `#E8462F` | Acentos, marca y CTAs |
| `--brand-sage-lab` | <img src="https://placehold.co/20x20/4E8C7C/4E8C7C.png" width="20"> | Sage Lab | `#4E8C7C` | Elementos secundarios |
| `--brand-orange` | <img src="https://placehold.co/20x20/FA7605/FA7605.png" width="20"> | Brand Orange | `#FA7605` | Highlights e interacciones |
| `--bg-crema` | <img src="https://placehold.co/20x20/F5EFDA/F5EFDA.png" width="20"> | Crema | `#F5EFDA` | Fondos de tarjetas / modales |
| `--background-dark` | <img src="https://placehold.co/20x20/1A1A1A/1A1A1A.png" width="20"> | Dark Background | `#1A1A1A` | Secciones en contraste |

### 🔤 Tipografía

* **Sora:** Utilizada en encabezados, títulos principales e hitos visuales.
* **IBM Plex Mono:** Utilizada en cuerpos de texto, datos técnicos y UI, aportando la estética industrial/laboratorio.

### 🧩 Iconografía & Logotipo

* **Lucide Icons:** Iconografía vectorial coherente (destacando el uso de `flask-conical`).
* **Branding Vectorial:** Isologotipo SVG propio adaptable con versiones clara y oscura (`logo-noodle-lab-blanco.svg`).

---

## ✨ Funcionalidades Destacadas

- 🧪 **Splash Screen Animado:** Pantalla de carga con isotipo interactivo y barra de progreso.
- ⚡ **Hero Section Inmersiva:** Maquetación en doble columna con presentación del concepto y llamados a la acción (CTA).
- 📱 **Navegación Responsive:** Menú contextual en Grid y menú hamburguesa adaptado con micro-interacciones.
- ⚛️ **Tabla Periódica de Sabores:** Selector interactivo para explorar 6 variedades de caldos *(Cerdo, Pollo, Vegano, Pescado, Res y Picante)*.
- 📜 **Scroll Reveal Interactivo:** Animaciones por desplazamiento utilizando `IntersectionObserver`.
- 🛒 **Carrito de Compras (UI):** Gestión de pedidos en tiempo real y visualización de productos.
- 📩 **Formulario de Contacto Activo:** Integrado con **Formspree.io** para procesamiento de mensajes sin servidor backend.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructuración semántica y accesible.
- **CSS3:** Variables globales, Flexbox, CSS Grid y animaciones personalizadas.
- **JavaScript (Vanilla ES6+):** Lógica del carrito, DOM dinámico e `IntersectionObserver`.
- **Formspree:** Integración serverless para el formulario de contacto.
- **Lucide Icons:** Librería ligera de iconos vectoriales.

---

## 📁 Estructura del Proyecto

NOODLE_LAB_PROYECTO/
├── blog/
│   └── index.html           # Sección de blog en construcción
├── css/
│   └── style.css            # Hoja de estilos principal y variables
├── img/
│   ├── logo-noodle-lab-vector.svg
│   └── ...                  # Recursos gráficos y fotografías de productos
├── js/
│   ├── carrito.js           # Lógica del carrito de compras
│   ├── main.js              # Interacciones DOM y Scroll Reveal
│   └── tienda-datos.js      # Set de datos de los productos
├── 404.html                 # Página de error personalizada
├── index.html               # Landing page principal
├── Noodle-Lab_Menu_FINAL.pdf # Menú digital descargable
└── README.md                # Documentación del repositorio

---

## 🚀 Instalación y Ejecución Local

Al estar desarrollado en JavaScript Vanilla, el proyecto no requiere instalación de dependencias ni gestores de paquetes.

1. **Clonar el repositorio:**
   `git clone https://github.com/Edyfranquizc/noodle-lab.git`

2. **Acceder al directorio:**
   `cd noodle-lab`

3. **Ejecutar el proyecto:**
   Abre el archivo `index.html` en tu navegador preferido o utiliza la extensión **Live Server** en Visual Studio Code.

---

## 👩‍💻 Autora

<div align="left">

**Edygar Franquiz**  
*UX/UI Designer & Frontend Developer*

[![Behance](https://img.shields.io/badge/Behance-1769FF?style=flat-square&logo=behance&logoColor=white)](https://www.behance.net/gallery/257381339/NoodleLab-la-formula-del-ramen-urbano)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/Edyfranquizc)

</div>