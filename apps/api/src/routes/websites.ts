import { Hono } from 'hono'
const websites = new Hono()

websites.get('/', (c) => c.json({ success: true, data: [] }))
websites.post('/', (c) => c.json({ success: true, message: 'Create website' }))

export default websites
