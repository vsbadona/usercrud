import express from "express"
import { deleteUser, forgotPassword, getUser, loginUser, updatePassword, updateProfile, userRegister } from "../Controller/userController.js"

const Router = express.Router()

Router.post('/register',userRegister)
Router.get('/login',loginUser)
Router.post('/forgot',forgotPassword)
Router.post('/updatepassword',updatePassword)
Router.get('/user',getUser)
Router.patch('/update',updateProfile)
Router.delete('/delete',deleteUser)


export default Router