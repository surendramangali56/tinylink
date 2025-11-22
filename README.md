# TinyLink (Take-home assignment)


This repository is a complete implementation of the TinyLink assignment using Next.js (App Router), TypeScript, Prisma, and PostgreSQL.


## What to run locally


1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL`.
2. Install dependencies:
```bash
npm install
```
3. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
4. Start dev server:
```bash
npm run dev
```


Open http://localhost:3000


## Endpoints
- `POST /api/links` — create link `{ target, code? }`
- `GET /api/links` — list links
- `GET /api/links/:code` — get link by code
- `DELETE /api/links/:code` — delete
- `GET /:code` — redirect route
- `GET /healthz` — health check


## Deployment
I recommend Vercel for Next.js and Neon for Postgres.


- Add `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL` in Vercel dashboard.
- Run `npx prisma migrate deploy` during deployment or use a GitHub Action to run migrations.


## Notes
- `code` follows regex `^[A-Za-z0-9]{6,8}$`. If not provided, a random 7-character code is generated.
- Duplicate codes return HTTP 409.


## Original assignment
The original assignment PDF was included with the submission for reviewer reference.