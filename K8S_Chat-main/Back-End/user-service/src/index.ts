import express, {Express, Request,Response} from 'express'
import cors from 'cors';  // Import the CORS middleware
import rootRouter from './routes'
import { AppDataSource } from './database/data-source'
import "reflect-metadata";
import * as dotenv from 'dotenv'


dotenv.config()
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

const app:Express = express()
app.use(cors({
    origin: "*",  // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],  // Allow specific HTTP methods if necessary
    credentials: true,  // Allow cookies or other credentials to be sent
  }));
app.use(express.json())
app.use('/api/user', rootRouter)


AppDataSource.initialize().then(()=>{
    console.log('Database connected')
}).catch((error)=>{
    console.log('Database connection failed', error)
    process.exit(1);
})

const PORT = process.env.PORT || 8180
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})