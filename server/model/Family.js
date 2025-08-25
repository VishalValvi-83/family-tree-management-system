import { Schema, model } from 'mongoose';

const familySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    age: {
        type: Number,
        required: [true, 'Age is required.']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required.']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required.']
    },
    relation: {
        type: String,
        required: [true, 'Relation is required.']
    },

    treeOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });

const Family = model('Family', familySchema);

export default Family;
