# Unit quizzes
Objective: add one concise, interactive quiz at the end of each of the nine units.
Branch: codex/unit-quizzes. Delivery strategy: local work-unit commit; no push requested.
Test runner: Node syntax checks plus browser-local interaction checks.

## Specs
S1. "por cada unidad (al final de cada una) una especie de quiz de cada una"
S2. "haz preguntas practicas como teoricas"
S3. Each quiz appears after the unit material and lets the student answer interactively with immediate feedback.

## Tasks
- T1 | S1-S3 | inline | done | Generic renderer, styles, and data model added.
- T2 | S1-S3 | inline | done | Three theory/practice questions added for every unit; Unit 1 flow checked in browser.
- T3 | S1-S3 | inline | done | Syntax and structural checks passed; local work-unit commit created.

## Log
- L1 | User request: "puedes traer los cambios si es que hay, levantarlo en local y hacer por cada unidad (al final de cada una) una especie de quiz de cada una, asi para hacerlo mas dinamico , haz preguntas practicas como teoricas"
- L2 | 2026-11-16 | Authorized git pull from origin/main; repository was already up to date.
- L3 | 2026-11-16 | RED observed: quiz data model was absent. GREEN: `node --check app.js`, `node --check data.js`, quiz-data validation, `git diff --check`, and a complete Unit 1 browser quiz flow passed.
- L4 | 2026-11-16 | Local work-unit commit created after all checks passed.
