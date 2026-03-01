import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';
// import authRoutes from "./routes/authRoutes.ts";
// import taskRoutes from './routes/taskRoutes.ts';
// import connectDB from './config/db.ts';

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Server live");
})

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})