import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Define the environment bindings for Cloudflare Workers
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('*', cors())

// Core Architecture Modules
import authRoutes from './routes/auth'
import orgRoutes from './routes/organizations'
import websiteRoutes from './routes/websites'
import cmsRoutes from './routes/cms'
import publishRoutes from './routes/publish'

app.get('/api/health', (c) => c.json({ status: 'ok', version: '1.0.0' }))

app.route('/api/v1/auth', authRoutes)
app.route('/api/v1/organizations', orgRoutes)
app.route('/api/v1/websites', websiteRoutes)
app.route('/api/v1/cms', cmsRoutes)
app.route('/api/v1/publish', publishRoutes)

export default app
