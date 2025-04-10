import mongoose from "mongoose";

const DBConnection = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log(err);
    })
}

export default DBConnection;