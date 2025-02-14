import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import authRoute from './routes/auth-route.js';

const app = express();
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log(err);
})

app.use(express.json());

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});