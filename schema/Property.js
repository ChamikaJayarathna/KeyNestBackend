import mongoose, { Schema } from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true,
        min: 1,
    },
    type: {
        type: String,
        enum: ["rent", "buy"],
        required: true
    },
    property: {
        type: String,
        enum: ["apartment", "house", "land"],
        required: true,
    },
    utilities: {
        type: String,
        enum: ["owner", "tenant", "shared"],
        required: true,
    },
    pet: {
        type: String,
        enum: ["allowed", "not-allowed"],
        required: true,
    },
    author: { 
        type: Schema.Types.ObjectId, 
        required: true,
        ref: "user"
    },
    features: { 
        type: [[Number]],
        default: []
    }
});

export default mongoose.model('property', PropertySchema);