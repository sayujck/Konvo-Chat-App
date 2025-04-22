import express from 'express'
import authRouter from './routes/authRoute.js';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import messageRouter from './routes/messageRouter.js';
import cors from 'cors'

dotenv.config()
const app = express();
const port = process.env.PORT

connectDB()

// middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

// routes
app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)


app.get('/', (req, res) => res.send("API is working"));
app.listen(port,()=>{
    console.log("server running on port", port);
})