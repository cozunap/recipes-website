import { Hono } from 'hono'
const orgs = new Hono()

orgs.get('/', (c) => c.json({ success: true, data: [] }))
orgs.post('/', (c) => c.json({ success: true, message: 'Create org' }))

export default orgs
