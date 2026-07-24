# Cómo agregar una nueva app a YoSoyJoe

No hace falta tocar el diseño ni el HTML. Todo se carga desde un solo archivo.

## Paso 1 — Preparar las imágenes

Para cada app necesitás dos imágenes, guardadas en la carpeta `assets/projects/`:

1. **Logo**: cuadrado, ideal 120x120px (o similar). Ej: `logo-tuapp.png`
2. **Mockup**: una captura o composición de la app, horizontal, ideal 480x300px (relación 16:10). Ej: `mockup-tuapp.png`

Podés usar `.png`, `.jpg` o `.svg`.

## Paso 2 — Editar `js/projects-data.js`

Abrí ese archivo y copiá un bloque como este dentro del array `PROJECTS` (agregando una coma antes si no es el primero):

```js
{
  title: "Nombre de tu app",
  description: "Qué hace la app, para quién es útil y qué resuelve.",
  logo: "assets/projects/logo-tuapp.png",
  mockup: "assets/projects/mockup-tuapp.png",
  url: "https://tu-app.com",
  tags: ["AI", "Gratis"]
}
```

Guardá el archivo. La tarjeta nueva va a aparecer sola en la sección "Mis apps", incluyendo el contador.

## Paso 3 — Revisar

Abrí `index.html` en el navegador (doble clic) y confirmá que la tarjeta se vea bien.

## Publicar la página

Es un sitio estático (HTML/CSS/JS puro), así que se puede subir gratis a:

- **Netlify** o **Vercel**: arrastrás la carpeta `yosoyjoe` y listo.
- **GitHub Pages**: subís la carpeta a un repo y activás Pages.

No requiere backend ni base de datos.
