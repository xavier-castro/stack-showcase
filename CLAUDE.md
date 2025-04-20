# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Build: `pnpm build`
- Dev server: `pnpm dev`
- Lint: `pnpm lint` or `pnpm lint:fix` to auto-fix issues
- Type check: `pnpm typecheck`
- Check all: `pnpm check` (runs lint + typecheck)
- Format: `pnpm format:write` or `pnpm format:check`
- Database: `pnpm db:generate`, `pnpm db:push`, `pnpm db:studio`

## Code Style Guidelines

- **TypeScript**: Always use strict typing with proper type annotations
- **Imports**: Use `import type` for type imports (inline style preferred)
- **Path aliases**: Use `~/` to import from src directory
- **Components**: React Server Components by default, explicit client components when needed
- **Error handling**: Always handle errors explicitly, use zod for input validation
- **Database**: Drizzle ORM - enforce where clauses with delete/update operations
- **State management**: Use tRPC with React Query for data fetching and mutations
- **Naming**: Camel case for variables/functions, PascalCase for components/types
- **Code organization**: Follow Next.js App Router conventions, keep APIs in server directory
- **Tailwind**: Use composition with descriptive class names