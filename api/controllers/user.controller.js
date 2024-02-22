import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import User from '../models/user.model.js'

export const test = (req, res) => {
    res.json({ message: 'HELLO' })
}

export const updateUser = async (req, res, next) => {
    console.log(req.params);

    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'))
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 charachters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)

    }

    if (req.body.userName) {

        if (req.body.userName.length < 7 || req.body.userName.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
        }
        if (req.body.userName.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contains spaces'))
        }
        if (req.body.userName !== req.body.userName.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'))
        }
        if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contains letters and numbers'))
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                userName: req.body.userName,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },

        }, { new: true })
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}