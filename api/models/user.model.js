import { Timestamp } from 'bson'
import mongoose, { model } from 'mongoose'

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }

}, { timestamps: true }
)

const User = mongoose.model('User', userSchema)

exports default User
