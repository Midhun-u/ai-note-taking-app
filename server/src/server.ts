import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { handleErrorMiddleware } from './middlewares/error.js'
import { notFoundRoute } from './utils/notFound.js'
import { noteRouter } from './routes/notesRoute.js'
import { connectDatabase } from './config/db.js'

//Variables
const app = new Hono({strict : false})
const port = Number(process.env.PORT) || 5000

//Middlewares
app.use(logger())
app.use(cors({
  allowMethods : ['POST' , 'GET' , 'PUT' , 'DELETE'],
  origin : process.env.CLIENT_URL as string,
  credentials : true
}))

//Routes
app.onError(handleErrorMiddleware)
app.notFound(notFoundRoute)
app.route("/api/note" , noteRouter)

//Connecting database
connectDatabase()

serve({
  fetch: app.fetch,
  port: port
}, () => {
  console.log(`Server running on ${port} port`)
})
