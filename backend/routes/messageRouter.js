import express from 'express'
import authUser from '../middlewares/authUser.js'
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/messageController.js'

const messageRouter = express.Router()

messageRouter.get('/users',authUser, getUsersForSidebar)
messageRouter.get('/:id',authUser, getMessages)
messageRouter.post('/send/:id',authUser, sendMessage)


export default messageRouter