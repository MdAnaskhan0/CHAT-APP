import e from 'express'
import mongoose from 'mongoose'
import {genSalt, getSalt} from 'bcrypt'

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    firstName:{
        type: String,
        required: false,
    },
    lastName:{
        type: String,
        required: false,
    },
    image:{
        type: String,
        required: false,
    },
    color:{
        type: Number,
        required: false,
    },
    profileSetUp:{
        type: Boolean,
        required: false,
    }
})

authSchema.pre('save', async function (next) {
    const salt = await genSalt();
    this.password = await getSalt(this.password, salt);
    next() ;
})

const user = mongoose.model('auth', authSchema);
export default user;