import express from 'express';
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import DBConnection from './config/dbconnection.js';
import authRoute from './routes/auth-route.js';
import propertyRoute from './routes/property-route.js';
import chatRoute from './routes/chat-route.js';
import messageRoute from './routes/message-route.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/property', propertyRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

app.listen(PORT, () => {
    DBConnection();
    console.log(`Server is running on port ${PORT}`);
});