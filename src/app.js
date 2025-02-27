import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './router.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
  origin:
    "http://192.168.1.2:5173/"
}))

app.use(router)



export default app;

// "https://backend-josy-vite-rest.onrender.com/"
