# Guía Interactiva de Fórmulas — Comunicaciones (UTN-FRT · ISI)

Página web estática con las fórmulas de las Unidades 1 a 9 de la cátedra
de Comunicaciones: cada fórmula tiene su explicación, variables, un
ejemplo resuelto y una calculadora interactiva. Incluye un buscador y un
mapa de conexiones entre unidades.

No requiere build ni backend: es HTML + CSS + JavaScript plano, con KaTeX
empaquetado localmente (carpeta `vendor/katex`) para que funcione incluso
sin conexión a internet.

## Estructura

- `index.html` — estructura y estilos de la página.
- `data.js` — contenido: las 9 unidades y sus fórmulas.
- `app.js` — lógica de navegación, buscador y calculadoras.
- `vendor/katex/` — librería KaTeX empaquetada localmente.

## Uso local

Abrir `index.html` directamente en el navegador, o servirlo con
cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

## Despliegue en Vercel

Es un sitio 100% estático, así que no necesita configuración de build:
Vercel lo sirve tal cual. Ver instrucciones de despliegue en la
conversación / documentación del proyecto.
