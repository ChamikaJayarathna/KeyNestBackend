import mongoose from "mongoose";

let profile_imgs_name_list = ["Chase", "Aiden", "Ryker", "Christopher", "Aidan", "Leah", "George", "Valentina", "Jude", "Emery", "Wyatt", "Sawyer", "Alexander", "Mason", "Destiny", "Sara", "Brian", "Oliver", "Maria", "Adrian"]

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, 
        default: "user"
    },
    profile_img:{
        type: String,
        default: () => {
            return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
        }
    }
})

export default mongoose.model('user', UserSchema);