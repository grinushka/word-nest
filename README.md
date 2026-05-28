# Word Nest (Backend)

Simple Express + TypeScript + PostgreSQL + Prisma backend for vocabulary learning.

## Quick start

1. Install dependencies.

```bash
npm install
```

2. Create `.env` from `.env.example` and set `DATABASE_URL`.

3. Generate Prisma client.

```bash
npm run prisma:generate
```

4. Run migrations.

```bash
npm run prisma:migrate
```

5. Start dev server.

```bash
npm run dev
```

## Reminder checklist

- [ ] `.env` exists and `DATABASE_URL` is set.
- [ ] `npm run prisma:generate` has been run after schema changes.
- [ ] `npm run prisma:migrate` has been run when needed.
- [ ] `npm run build` passes.

## Troubleshooting notes

### `Property 'word' does not exist on type 'PrismaClient...` 

Cause: Prisma client types are stale or not generated.

Fix:

```bash
npm run prisma:generate
```