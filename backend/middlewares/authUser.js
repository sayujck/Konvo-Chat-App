import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const authUser = async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized' })
    }
    try {
        const jwtResponse = jwt.verify(token, process.env.JWT_SECRET)
        if(jwtResponse.id) {
            req.userId = jwtResponse.id
            const user = await User.findById(req.userId).select("-password")
            req.user = user
            next() 
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized'})
        }  
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Invalid token' })
    }
}

export default authUser