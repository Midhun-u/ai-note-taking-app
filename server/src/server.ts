import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
const port = 5000

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: port
}, () => {
  console.log(`Server running on ${port} port`)
})
