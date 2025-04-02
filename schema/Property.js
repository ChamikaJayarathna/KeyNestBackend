import mongoose, { Schema } from "mongoose";
import FilterSchema from './Filter.js'

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
    bathroom: {
        type: Number,
        required: true,
        min: 1,
    },
    carSpaces : {
        type: Number,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["Rent", "Buy", "Sell"],
        required: true
    },
    property: {
        type: String,
        enum: ["Apartment", "House", "Land", "Townhouse", "Villa", "RetirementLiving", "Acreage", "Rural"],
        required: true,
    },
    condition: {
        type: String,
        enum: ["New", "Established"]
    },
    utilities: {
        type: String,
        enum: ["Owner", "Tenant", "Shared"],
        required: true,
    },
    pet: {
        type: String,
        enum: ["Allowed", "Not allowed"],
        required: true,
    },
    filter:{
        type: FilterSchema,
        default: () => ({})
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
}, {timestamps: true });

export default mongoose.model('property', PropertySchema);