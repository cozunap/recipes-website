# SaaS Platform Architecture

## Core Principles
1. **CMS-First**: The database is the source of truth, the visual builder is just an interface.
2. **Multi-Tenant Strictness**: Every database query must filter by `organization_id` or `website_id`.
3. **API-Driven**: All UI actions execute via the Hono API (Cloudflare Workers).
4. **Edge-Native**: R2 for storage, Hyperdrive for DB pooling, Pages for Next.js rendering.

## Security Model
- **Authentication**: JWT tokens stored in HttpOnly cookies.
- **Authorization**: Role-Based Access Control (RBAC) via the `organization_members` table.
- **Media**: Signed upload URLs prevent malicious bulk uploads.

## Development Workflow
Run `npm run dev` at the root to spin up Turborepo, which starts Next.js and Hono simultaneously.
