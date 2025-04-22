import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            res.json({
                success: false,
                message: 'Fill form completely'
            })
        }
        if (password.length < 8) {
            res.json({
                success: false,
                message: 'Password must be atleast 8 character'
            })
        } else {
            const existingUser = await User.findOne({ email })
            if (existingUser)
                return res.json({ success: false, message: 'user already exists' })
            else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = new User({ fullName, email, password: hashedPassword })
                await newUser.save()
                res.status(200).json({
                    newUser,
                    message: "Successfully Registered",
                    success: true,
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.json({
                success: false,
                message: 'Fill form completely'
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordValid) {
                res.json({
                    success: false,
                    message: 'Invalid Password'
                })
            }

            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 60 * 1000,
            })
            return res.status(200).json({
                user: existingUser,
                message: 'Login Successfull',
                success: true
            })
        }
        else {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 60 * 1000,
        })
        return res.status(200).json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId
        const { profilePic } = req.body

        if (!profilePic) {
            return res.status(400).json({ message: "profile pic is required" })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAuth = async(req, res) => {
    try {
        console.log("working");
        
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal server Error"})
    }
}
