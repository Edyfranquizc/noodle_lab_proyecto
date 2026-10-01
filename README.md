# 🍜🧪 Noodle/Lab

Identidad de marca y sitio web de **Noodle/Lab**, un laboratorio de ramen *take-away* en Buenos Aires, Argentina.

El caldo se sirve en botellas tipo tubo de ensayo, con packaging ecológico, orgánico y reutilizable.

---

## 🎨 Sistema de diseño

### Colores

| Variable CSS        | Hex       | Uso                |
| ------------------- | --------- | ------------------ |
| `--bg-lab-white`    | `#F7F5F0` | Fondo principal    |
| `--brand-graphite`  | `#2B2B2B` | Textos y contraste |
| `--brand-chili-red` | `#E8462F` | Acento / CTA       |
| `--brand-sage-lab`  | `#4E8C7C` | Acento secundario  |
| `--brand-orange`    | `#FA7605` | Acento             |
| `--bg-crema`        | `#F5EFDA` | Fondo alternativo  |

### Tipografías

- **Sora**: títulos
- **IBM Plex Mono**: cuerpo de texto (toque "técnico de laboratorio")

### Íconos y logo

- **Lucide Icons** (ej: `flask-conical` en el botón CTA)
- Logo en SVG propio, con versión blanca (`logo-noodle-lab-blanco.svg`) que conserva la barra roja

---

## 💻 Stack

HTML, CSS y JavaScript puro. Sin frameworks.

---

## ✨ Funcionalidades

- **Splash screen** con logo pulsando y barra de carga
- **Hero** en dos columnas: texto y CTA a la izquierda, portada a la derecha
- **Navegación** en grid, con menú hamburguesa animado en mobile
- **Tabla periódica de sabores** (Cerdo, Pollo, Vegano, Pescado, Res, Picante)
- **Scroll-reveal** de las botellas con `IntersectionObserver`
- **Marquesina** con frases de marca

---

## 🔁 Flujo de interacción

1. Clic en la imagen de portada
2. Aparece la tabla periódica
3. Clic en un elemento
4. Aparece la sección de botellas y la página hace scroll hasta ella

Los pasos son secuenciales: nunca se disparan al mismo tiempo.

---

## 📁 Estructura

```
noodle-lab/
├── index.html
├── style.css
├── script.js
└── assets/
    └── logo-noodle-lab-blanco.svg
```

---

## 🚀 Cómo correrlo

Abrí `index.html` en el navegador. No necesita instalación.

---

## 👩‍💻 Autora

**Edy Franquiz**: UX/UI Designer & Frontend Developer
