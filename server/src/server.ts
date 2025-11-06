import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import 'dotenv/config'
import { handleErrorMiddleware } from './middlewares/error.js'
import { notFoundRoute } from './utils/notFound.js'

//variables
const app = new Hono()
const port = Number(process.env.PORT) || 5000

//middlewares
app.use(logger())
app.use(cors({
  allowMethods : ['POST' , 'GET' , 'PUT' , 'DELETE'],
  origin : process.env.CLIENT_URL as string
}))

//routes
app.onError(handleErrorMiddleware)
app.notFound(notFoundRoute)

serve({
  fetch: app.fetch,
  port: port
}, () => {
  console.log(`Server running on ${port} port`)
})
