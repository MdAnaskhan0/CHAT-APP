import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/authRoutes.js'

// Connect to MongoDB
dotenv.config()


const app = express()
const port = process.env.SERVER_PORT || 5000
const DATABASE_URL = process.env.MONGO_DB_URL

app.use(express.json())
app.use(cookieParser())


// Origin configuration
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}))


// Connect to MongoDB
mongoose.connect(DATABASE_URL).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log(err)
})



// api routes
app.use('/api/auth', authRoutes)



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})