import { Hono } from 'hono'
const cms = new Hono()

cms.get('/pages', (c) => c.json({ success: true, data: [] }))
cms.get('/collections', (c) => c.json({ success: true, data: [] }))

export default cms
