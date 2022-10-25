import "express-async-errors"
import express from 'express'
import { routes } from './routes'
import cors from 'cors'
import { errorHandler } from "./middlewares/error-handler-middleware"

const app = express()

app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(3333, () => {
  console.log(`🔥 Servidor na porta 3333`)
})
