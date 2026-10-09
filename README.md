# Word Nest API

Word Nest is a backend project for a vocabulary learning app.  
This project showcases practical backend engineering skills: API design, data modeling, validation, error handling, and clean TypeScript project structure.

## What This Project Demonstrates

- Building a REST API with `Express` + `TypeScript`
- Modeling relational data with `Prisma` + `PostgreSQL`
- Request validation using `Zod`
- Layered architecture (`routes -> controllers -> services -> database`)
- Centralized, production-style error handling
- Many-to-many relationship handling (`Word <-> Category`)

## Tech Stack

- `Node.js`
- `Express`
- `TypeScript`
- `Prisma ORM`
- `PostgreSQL`
- `Zod`

## Architecture Overview

The codebase is organized for maintainability:

- `src/routes`: endpoint definitions
- `src/controllers`: request/response handling
- `src/services`: business logic and database operations
- `src/validators`: schema validation
- `src/middleware`: global error handling
- `src/db`: Prisma client setup


## API Endpoints

Base URL in local development: `http://localhost:4000`

### Words

- `GET /api/words` - list all words with categories
- `GET /api/words/:id` - get one word
- `POST /api/words` - create word
- `PATCH /api/words/:id` - update word (pass `categoryIds` to replace the word's categories)
- `DELETE /api/words/:id` - delete word

### Categories

- `GET /api/categories` - list categories
- `GET /api/categories/:id` - get one category with its words
- `POST /api/categories` - create category
- `PATCH /api/categories/:id` - update category
- `DELETE /api/categories/:id` - delete category

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set your `DATABASE_URL`.

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run migrations:

```bash
npm run prisma:migrate
```

5. Start the dev server:

```bash
npm run dev
```

The server runs on `http://localhost:4000` by default.

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - compile TypeScript to `dist`
- `npm run start` - run compiled app
- `npm run prisma:generate` - regenerate Prisma client
- `npm run prisma:migrate` - run Prisma migrations in dev

## Notes

- If Prisma types look outdated, run:

```bash
npm run prisma:generate
```

- This project currently focuses on backend API implementation and core architecture.