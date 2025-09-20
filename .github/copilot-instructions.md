# Copilot Instructions for AI Coding Agents

## Project Overview
- This is a Next.js app using the `/src/app` directory structure and TypeScript.
- The project is bootstrapped with `create-next-app` and uses modern Next.js features (app router, server actions, etc).
- Data access and schema management is handled via Drizzle ORM, with SQL migrations in `src/lib/db/drizzle/`.
- UI components are organized in `src/components/` and `src/app/(private)/.../components/`.
- Authentication logic is in `src/lib/auth/` and `src/app/auth/`.
- S3 integration is handled in `src/lib/s3.ts`.

## Key Patterns & Conventions
- **App Structure:**
  - Public pages are in `src/app/`, private/admin pages in `src/app/(private)/`.
  - Route handlers (API endpoints) are in `src/app/api/[...all]/route.ts`.
  - Actions (server-side logic) are in `src/app/actions/`.
- **Database:**
  - Drizzle ORM is used for schema (`src/lib/db/schema.ts`), types (`src/lib/db/types.ts`), and migrations.
  - Use Drizzle's migration files for schema changes, not raw SQL unless necessary.
- **UI:**
  - Shared UI primitives are in `src/components/ui/`.
  - Feature-specific components are colocated with their routes.
- **State & Data Flow:**
  - Use server actions for mutations and data fetching where possible.
  - Prefer passing props and using hooks (`src/hooks/use-mobile.ts`) for client-side state.
- **Auth:**
  - Auth logic is split between client (`src/lib/auth/client.ts`) and server (`src/lib/auth/index.ts`).
  - Auth pages are in `src/app/auth/`.
- **S3:**
  - Use `src/lib/s3.ts` for all S3-related operations (uploads, presigned URLs).

## Developer Workflows
- **Start Dev Server:**
  - `pnpm dev` (preferred), or `npm/yarn/bun dev`.
- **Database Migrations:**
  - Use Drizzle migration files in `src/lib/db/drizzle/`.
- **Linting:**
  - Run `pnpm lint` (uses `eslint.config.mjs`).
- **Build:**
  - `pnpm build`.
- **Testing:**
  - No explicit test setup detected; add tests in `src/` if needed.
- **Deployment:**
  - Deploy via Vercel (see README).

## Integration Points
- **Drizzle ORM** for database (SQLite/local.db by default).
- **S3** for file storage (see `src/lib/s3.ts`).
- **Next.js App Router** for routing and API endpoints.

## Examples
- To add a new category: see `src/app/(private)/categories/components/add-category-dialog.tsx` and related server action in `src/app/actions/categories.ts`.
- To upload images: see `src/app/(private)/shoots/[id]/components/shoots-upload-dialog-client.tsx` and S3 logic in `src/lib/s3.ts`.

## Tips for AI Agents
- Follow the file organization and colocate feature components with their routes.
- Use Drizzle ORM for all DB access; avoid raw SQL unless updating migrations.
- Use server actions for backend logic, not API routes unless necessary.
- Reference existing components and actions for feature patterns.

---
If any section is unclear or missing, please ask for clarification or examples from the user.
