# Guía Interactiva de Fórmulas - Comunicaciones

Trabajo Final Integrador de Comunicaciones, UTN-FRT 2026.

La idea del proyecto fue bastante directa: durante el cursado las fórmulas quedan repartidas en varios apuntes y, cuando llega el momento de repasar, cuesta encontrar qué usar y para qué. Esta página junta las nueve unidades en un solo lugar para tener una guía más práctica al estudiar.

## Sitio online

[comunicaciones-k4-utn-frt.vercel.app](https://comunicaciones-k4-utn-frt.vercel.app/)

## Qué tiene

- Las 9 unidades de la materia.
- Fórmulas con variables explicadas y ejemplos cortos.
- Calculadoras para probar valores propios.
- Gráficos para temas como Fourier, códigos de línea, Hamming, QAM y DMT.
- Buscador y mapa de conexiones entre unidades.
- Un quiz breve al final de cada unidad para practicar lo visto.

## Cómo abrirla

La forma rápida es abrir `index.html` en el navegador. Si se quiere usar como sitio local, desde la carpeta del proyecto se puede ejecutar:

```bash
python3 -m http.server 8731
```

Después abrir [http://localhost:8731](http://localhost:8731).

No hace falta instalar dependencias ni levantar un backend. Las fórmulas se renderizan con KaTeX, que ya está incluido dentro de `vendor/katex`.

## Archivos principales

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Estructura y estilos de la página. |
| `data.js` | Unidades, fórmulas, ejemplos, preguntas y contenido teórico. |
| `app.js` | Navegación, búsqueda, calculadoras, gráficos y quizzes. |
| `vendor/katex/` | Librería local para mostrar fórmulas matemáticas. |

## Para seguir mejorándolo

La mayor parte del contenido está en `data.js`. Si se quiere agregar una fórmula, primero se incorpora a la unidad correspondiente y después se crea su objeto dentro de `FORMULAS`. Para un cálculo simple se puede usar la calculadora genérica; para una visualización nueva habría que sumar su lógica en `app.js`.

## Integrantes

- Santillán Facundo Nahuel - Legajo 52405
- Martín Peñaloza Santiago - Legajo 52581
- Geréz César Augusto - Legajo 25243
