# Guía Interactiva de Fórmulas — Comunicaciones (UTN-FRT · ISI)

Página web estática con el contenido de las Unidades 1 a 9 de la cátedra
**Comunicaciones** (Ingeniería en Sistemas de Información, UTN-FRT): cada
fórmula tiene su explicación en texto, las variables que la componen, un
ejemplo numérico resuelto y, en la mayoría de los casos, una calculadora o
un gráfico interactivo para jugar con los valores. Incluye además un
buscador global y un "mapa de conexiones" que muestra en qué otras
unidades reaparece cada concepto.

No requiere build ni backend: es HTML + CSS + JavaScript plano. KaTeX
(la librería que dibuja las fórmulas matemáticas) está empaquetado
localmente en `vendor/katex`, así que la página funciona incluso sin
conexión a internet.

El contenido se armó a partir de los apuntes originales de la cátedra
(carpeta `Teoria/`, un PDF consolidado por unidad más el material de
apoyo suelto) y fue revisado contra los ejemplos numéricos ya resueltos
en esos apuntes para que las calculadoras den los mismos resultados.

## Cómo verla

Abrir `index.html` directamente en el navegador, o servirla con
cualquier servidor estático (recomendado, para que funcione igual que en
producción):

```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

## Estructura de archivos

```
├── index.html       → esqueleto de la página + todo el CSS (inline, en <style>)
├── data.js          → el contenido en sí: UNITS (las 9 unidades) y FORMULAS
├── app.js           → la lógica: router, render de tarjetas, motor de
│                       calculadoras y gráficos interactivos, buscador
├── vendor/katex/     → KaTeX empaquetado local (JS, CSS y fuentes)
├── vercel.json       → configuración mínima de deploy (sitio estático, sin build)
└── README.md
```

### `data.js` — el contenido

Es el único archivo que hay que tocar para corregir o agregar contenido
(salvo que se necesite un tipo de gráfico nuevo, ver más abajo). Tiene
dos partes:

**`UNITS`** — un array con las 9 unidades. Cada una es:

```js
{
  id: "u5",                 // identificador corto, usado en rutas internas
  num: 5,                   // número de unidad (para mostrar "UNIDAD 5")
  name: "Canales de Comunicaciones",
  short: "Nyquist, Shannon, Eb/No",   // subtítulo en el menú lateral
  intro: "...",              // texto de introducción de la unidad
  topics: [                  // (opcional) bloques conceptuales SIN fórmula,
    { title: "...", html: "..." }   // se muestran antes de las tarjetas de fórmula
  ],
  formulas: ["u5-f0","u5-f1", ...]  // ids de las fórmulas de esta unidad, en orden
}
```

**`FORMULAS`** — un objeto donde cada clave es el id de una fórmula
(ej. `"u5-f2"`) y el valor es:

```js
FORMULAS["u5-f2"] = {
  id:"u5-f2", unit:"u5",
  name:"Capacidad de Nyquist",
  latex:"C = 2B\\log_2 M",         // se renderiza con KaTeX
  vars:[["C","capacidad del canal (bps)"], ["B","ancho de banda (Hz)"], ["M","niveles"]],
  explain:"texto con el por qué de la fórmula, conectándola con otras unidades",
  example:"un caso numérico ya resuelto",
  related:["u7-f1","u8-f2"],        // ids de fórmulas relacionadas → aparecen como "chips" clickeables
  calc:{ ... }                      // calculadora numérica genérica (opcional)
  // — o en vez de calc —
  special:"shannon-capacity"        // gráfico/calculadora a medida (opcional)
}
```

- **`calc`** define una calculadora numérica automática: una lista de
  `inputs` (con su etiqueta, unidad y valor por defecto) y una función
  `compute(valores)` que devuelve los resultados a mostrar. El motor
  genérico (`mountGenericCalc` en `app.js`) construye el formulario solo;
  no hay que escribir HTML a mano.
- **`special`** se usa cuando la fórmula necesita algo más que números
  en una caja: un canvas con una curva, un árbol, una señal digital,
  etc. El string es una clave que `app.js` reconoce dentro de
  `mountSpecialCalc()`.

### `app.js` — el motor

- **Router** (`goTo`, `viewUnit`, `viewMapa`, `viewInicio`): decide qué
  pantalla mostrar y arma el HTML de cada tarjeta de fórmula a partir de
  los datos de `data.js`.
- **`mountGenericCalc`**: motor de calculadora numérica genérico, usado
  por toda fórmula que tenga `calc` en vez de `special`.
- **`mountSpecialCalc`**: switch con un `if` por cada visualización a
  medida. Hoy incluye, entre otras:
  - `fourier` (U2): reconstrucción animada de una onda cuadrada sumando
    armónicos, con slider de cantidad de armónicos.
  - `linecode` (U7): graficador de códigos de línea — el usuario escribe
    una trama de bits y ve, apiladas, las señales NRZ-L, NRZ-I, RZ,
    Manchester, Manchester diferencial y AMI para esa misma trama.
  - `entropy`, `hamming-distance`, `parity`, `crc`: calculadoras
    interactivas de la Unidad 4 y 6 (entropía de una fuente, distancia
    de Hamming, bit de paridad VRC, división polinomial CRC paso a
    paso).
- **Buscador**: indexa `name`/`explain` de todas las fórmulas y salta
  directo a la tarjeta correspondiente.
- **Mapa de conexiones**: tabla fija en `MAP_CONCEPTS` que cruza
  "concepto" contra "unidad" — se actualiza a mano si se agrega una
  fórmula que retoma un concepto de otra unidad.

### Cómo agregar una fórmula nueva

1. Agregar su id al array `formulas` de la unidad correspondiente en
   `UNITS`.
2. Agregar el objeto en `FORMULAS` (ver estructura arriba). Si alcanza
   con una calculadora numérica, usar `calc`; si no, definir un
   `special` nuevo.
3. Si es un `special` nuevo, agregar el bloque `if(f.special === "...")`
   correspondiente dentro de `mountSpecialCalc()` en `app.js` (los
   bloques existentes — `fourier`, `linecode`, `crc`, etc. — sirven de
   plantilla: un canvas, inputs que disparan `recompute()`, y una
   función `draw()`).
4. Si corresponde, agregar `related` cruzado en las fórmulas que la
   mencionan, y una fila nueva en `MAP_CONCEPTS` si introduce un
   concepto que se reutiliza en otra unidad.

## Diseño

- Paleta clara: fondo `#F5F7F3` (papel verde muy suave), tinta
  `#16241E`, acento verde `#0E7C66`, acento ámbar `#A85A18` para las
  referencias cruzadas.
- Las cajas de fórmula y los resultados de calculadora son oscuras a
  propósito (`#122019`), como un "visor de instrumento" (osciloscopio):
  es el único elemento oscuro de la página, para que la fórmula resalte
  sin oscurecer el resto.
- Tipografías: Space Grotesk (títulos), IBM Plex Sans (texto), IBM Plex
  Mono (datos, variables, código).
- Sin frameworks (React, Vue, etc.) ni build step — JavaScript vanilla.
- Responsive: el menú lateral se colapsa en pantallas chicas (≤860px),
  hay un breakpoint adicional para celulares (≤480px), la tabla del
  mapa de conexiones tiene scroll horizontal propio y los gráficos
  (canvas) escalan manteniendo su relación de aspecto.

## Deploy

Es un sitio 100% estático: no necesita build command ni output
directory. En Vercel, framework preset "Other" (o en blanco) y listo —
cada push a `main` redeploya solo.

```bash
git add .
git commit -m "mensaje"
git push
```
