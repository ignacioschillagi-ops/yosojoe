/* ==========================================================================
   PROYECTOS — YoSoyJoe
   ==========================================================================
   Para agregar una app nueva:

   1. Copiá uno de los bloques { ... } de abajo y pegalo dentro del array,
      separado por una coma.
   2. Cambiá los valores de cada campo (mirá la guía de cada campo abajo).
   3. Guardá tus imágenes en assets/projects/ (logo y mockup) con nombres
      únicos, por ejemplo: logo-nombreapp.png y mockup-nombreapp.png
   4. Guardá el archivo. La página se actualiza sola, no hace falta tocar
      el HTML ni el CSS.

   Campos de cada proyecto:
   - title       : nombre de la app (texto corto)
   - description : 1 a 3 frases contando qué hace y para qué sirve
   - logo        : ruta a la imagen del logo (cuadrada, ideal 120x120px)
   - mockup      : ruta a la imagen o captura de la app (horizontal, ideal 480x300px)
   - url         : link a la web/app en producción
   - tags        : lista corta de etiquetas (opcional, podés dejar [])
   ========================================================================== */

const PROJECTS = [
  {
  title: "Aiva!",
  description: "Soy tu asesora de moda personal! Además de darte consejos de moda, ayuda a recomendar el talle exacto de una tabla de talles, y a estimar las medidas de una prenda de referencia.",
  logo: "assets/projects/logo-aiva.png",
  mockup: "assets/projects/mockup-aiva.png",
  url: "https://ai-vapp.vercel.app/",
  tags: ["AI", "Moda", "Compras online", "Gratis"]
},
{
  title: "Timbapp",
  description: "Una app para usar con tus amigos. En base a lo que tengas a mano, elegí tu categoría y qué te gustaría jugar. Adentro de cada juego vas a encontrar instrucciones detalladas y un anotador personalizado, listo para jugar.",
  logo: "assets/projects/logo-timbapp.png",
  mockup: "assets/projects/mockup-timbapp.png",
  url: "https://timbapp.vercel.app/",
  tags: ["Con Amigos", "Cartas", "Dados", "Juegos", "Gratis"]
},
{
  title: "Tanapp",
  description: "Questa è un'app per praticare la conversazione in italiano. Ti aiuta a migliorare la lingua con esercizi e chiacchiere.",
  logo: "assets/projects/logo-tanapp.png",
  mockup: "assets/projects/mockup-tanapp.png",
  url: "https://tanapp-it.vercel.app/",
  tags: ["AI", "Italiano", "Idioma", "Gratis"]
},
{
  title: "Average Joe's",
  description: "Es tu organizador AI de rutinas de entrenamiento: pensala como una carpeta con todas las que necesites para cada momento — la del gimnasio, una para cuando viajás, otra para entrenar en casa, una de calistenia al aire libre, o hasta una para hacer con amigos.",
  logo: "assets/projects/logo-joes.png",
  mockup: "assets/projects/mockup-joes.png",
  url: "https://average-joes-app.vercel.app/",
  tags: ["AI", "Gym", "Rutinas", "Gratis"]
},
{
  title: "D-Rol",
  description: "Un juego de rol narrativo con IA como Dungeon Master. Creás tu personaje, tomás decisiones y vivís una aventura épica generada en tiempo real. El mundo recuerda todo lo que hacés.",
  logo: "assets/projects/logo-drol.png",
  mockup: "assets/projects/mockup-drol.png",
  url: "https://d-rol.vercel.app/",
  tags: ["AI", "D&D", "Juego", "Rol", "Gratis"]
},
{
  title: "ZAINORG",
  description: "Armamos tu mochila o valija por vos: contanos tu destino, el clima, cuántos días viajás, con quién vas y qué actividades tenés pensadas, y calculamos qué llevar, cuánto espacio ocupa y qué tamaño de equipaje te conviene.",
  logo: "assets/projects/logo-zainorg.png",
  mockup: "assets/projects/mockup-zainorg.png",
  url: "https://zainorg.vercel.app/",
  tags: ["AI", "Viajes", "Mochila", "Valija", "Gratis"]
}

  /* 👇 Para sumar la 6ta app, descomentá y completá este bloque:
  ,{
    title: "Nombre de tu App 6",
    description: "Descripción breve.",
    logo: "assets/projects/logo-app6.svg",
    mockup: "assets/projects/mockup-app6.svg",
    url: "https://tu-app-6.com",
    tags: ["AI", "Gratis"]
  }
  */
];
