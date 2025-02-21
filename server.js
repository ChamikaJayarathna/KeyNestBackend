import express from 'express';
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import DBConnection from './config/dbconnection.js';
import authRoute from './routes/auth-route.js';
import propertyRoute from './routes/property-route.js';

const app = express();
const PORT = 3000;

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
    DBConnection();
    console.log(`Server is running on port ${PORT}`);
});