import { Hono } from 'hono'
const auth = new Hono()

auth.post('/login', (c) => c.json({ success: true, message: 'Auth endpoint skeleton' }))

export default auth
