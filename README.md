# Sonoro · Música 1° año

Plataforma de juegos y teoría para primer año de secundaria.
Sitio estático (sin build): se publica tal cual en Vercel.

## Estructura

```
index.html            Plataforma de los alumnos (juegos, teoría, perfil, ranking)
docente/index.html    Panel docente (acceso por contraseña) -> /docente
vercel.json           Configuración de Vercel (URLs limpias, cabeceras, noindex del panel)
robots.txt            Evita que se indexe /docente
games-src/            Código fuente de los juegos (referencia para futuras versiones)
  ritmo/              Proyecto de Ritmo (con tests: node --test test/*.test.js ; build: node build.js)
  propiedades/        ¿Qué cambió? (HTML único)
```

Los juegos ya están incluidos dentro de `index.html` (cada uno corre en su propio marco).
Si se actualiza un juego, hay que volver a incrustarlo en `index.html`.

## Probar en local

```bash
npx serve .
# alumnos:  http://localhost:3000
# docente:  http://localhost:3000/docente
```

## Subir a Git

```bash
git init
git add .
git commit -m "Sonoro: primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sonoro.git
git push -u origin main
```

## Deploy en Vercel

1. En vercel.com: **Add New → Project** e importá el repositorio.
2. **Framework Preset:** `Other`. **Build Command:** vacío. **Output Directory:** vacío (la raíz).
3. **Deploy**. Cada `git push` a `main` vuelve a publicar solo.

Alternativa por consola: `npx vercel` (y `npx vercel --prod` para producción).

## Importante (etapa actual)

- Los datos (usuarios, puntos, progreso) se guardan en el navegador de cada dispositivo (`localStorage`).
  Cada alumno ve solo lo suyo y el ranking solo incluye usuarios del mismo dispositivo.
- El panel docente trabaja con el puente de copiar y pegar (Herramientas docente en la plataforma).
- La contraseña del docente y las de los alumnos usan una codificación simple, apta solo para pruebas.
  No cargar datos reales de alumnos hasta conectar la base de datos.

## Próxima etapa: MongoDB Atlas

- Agregar funciones serverless en `/api` (usuarios, puntos, progreso, ranking, blanqueo).
- Guardar contraseñas con hash seguro (bcrypt/argon2) y sesiones con token.
- El código de blanqueo pasa a ser un enlace de un solo uso con vencimiento.
- Variables de entorno (en Vercel → Settings → Environment Variables): `MONGODB_URI`, `JWT_SECRET`.
