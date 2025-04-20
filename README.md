# Stack Showcase

A demonstration of modern web development stacks and UI components.

## Features

- **T3 Stack**: Next.js, TypeScript, tRPC, Drizzle ORM
- **shadcn/ui**: A collection of reusable UI components 
- **Theming**: Dark/light mode support with next-themes
- **Dashboard**: Example application layout

## Component Showcases

### shadcn/ui Components (/shadcn)

This page showcases various components from [shadcn/ui v4](https://v4.shadcn.com/), including:

- Buttons (variants and sizes)
- Cards
- Dialogs
- Forms with validation
- Calendar
- Tabs
- Tables
- Toast notifications

## First Essential Installs

```bash
pnpm dlx shadcn@latest init
pnpm install tw-animate-css
pnpm add next-themes
```

## Development

```bash
# Start the development server
pnpm dev

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Format code
pnpm format:write
```
