import User from '../models/tempUser.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req,res)=>{
    const{firstname,lastname,email,password}= req.body;
    const fullname = `${firstname} ${lastname}`.trim();
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'Email already taken'
            })
        }

         const newUser = new User({
            fullname,
            email,
            password,
            
        })
        await newUser.save();

        res.status(201).json({
            success:true,
            message:'User Registered successfully'
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message:'Server error'
        })
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        res.status(401).json({
            msg:'something is missing',
            success:false
        })
        return;
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({
                msg:'Invalid Id',
                success:false
            })
            return;
        }
    
        const isPasswordMatch = await compare(password,user.password);
        if(!isPasswordMatch){
            res.status(401).json({
                msg:'Invalid Password',
                success:false
            })
            return;
        }
    
        const accesstoken = jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn:'10m'}
        )

        const refreshtoken = jwt.sign(
            {id: user._id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'7d'}
        )

         res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            secure:false,
            samesite:'Strict',
            maxAge:7*24*60*60*100
        })
    
        res.status(200).json({
            msg:'Login successfully',
            success:true,
            accesstoken
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            msg:'Server Error',
            success:false
        })
    }
    
}