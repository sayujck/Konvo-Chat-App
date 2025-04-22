import express from 'express'
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/authController.js'
import authUser from '../middlewares/authUser.js'

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.put('/update-profile', authUser,updateProfile)
authRouter.get('/check', authUser, checkAuth)

export default authRouter