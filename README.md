# SaaS Website Builder Platform

Enterprise-grade Headless CMS and Visual Website Builder.
Built with Next.js, Hono, Drizzle, PostgreSQL, Turborepo, and Cloudflare.

## Architecture
- `apps/web`: Public Renderer & Marketing Site
- `apps/admin`: CMS & Dashboard
- `apps/builder`: Visual Editor Canvas
- `apps/api`: Hono.js Cloudflare Worker
- `packages/database`: Drizzle ORM
- `packages/auth`: Firebase / Auth config
- `packages/ui`: Shared React components
