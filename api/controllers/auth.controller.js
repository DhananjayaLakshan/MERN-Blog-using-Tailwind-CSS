import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'


export const singup = async (req, res) => {
    const { userName, email, password } = req.body

    if (!userName || !email || !password || userName === "" || email === "" || password === "") {
        return res.status(400).json({ message: 'All fields are required!!' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    try {
        const newUser = new User({ userName, email, password: hashedPassword })
        await newUser.save()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


    res.json('Signup Successfull')



}