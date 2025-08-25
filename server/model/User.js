import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: 'Invalid email address.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 200
    },
}, {
    timestamps: true
})

const User = model("User", userSchema);

export default User;