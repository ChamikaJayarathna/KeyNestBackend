import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from './routes/auth-route.js';
import propertyRoute from './routes/property-route.js';

const app = express();
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log(err);
})

// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/property', propertyRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});