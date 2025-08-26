import { Schema, model } from "mongoose";

const familySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    father: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        default: null
    },
    mother: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        default: null
    },
    siblings: [{
        type: Schema.Types.ObjectId,
        ref: 'Family',
        default: []
    }],
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Family',
        default: []
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Family = model('Family', familySchema);

export default Family;
