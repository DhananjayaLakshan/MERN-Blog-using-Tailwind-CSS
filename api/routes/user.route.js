import express from 'express'
import { test, updateUser, deleteUser, signOutUser, getUsers } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', test)
router.get('/getusers', verifyToken, getUsers)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signOutUser)

export default router
