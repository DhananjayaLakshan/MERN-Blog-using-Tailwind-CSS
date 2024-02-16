import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js'


export const singup = async (req, res, next) => {
    const { userName, email, password } = req.body

    if (!userName || !email || !password || userName === "" || email === "" || password === "") {
        next(errorHandler(400, 'All fields are required!'))
    }
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ userName, email, password: hashedPassword })

    try {
        await newUser.save()
        res.json('Signup Successfull')
    } catch (error) {
        next(error)
    }





}