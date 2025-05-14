import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../model/AuthModel.js';
import { Verification_Email_Template } from '../template/otp_Temp.js';
import nodemailer from 'nodemailer';
import { resolveHostname } from 'nodemailer/lib/shared/index.js';


export const Register = async(req,res)=>{
    try {
        const {name,email,password,role,profile,address,phone,facebook_link,twitter_link,linkedin_link,agent_type,yourself,agent_experience} = req.body;
        if(!name ||!email ||!password ||!role ||!profile ||!address ||!phone){
           return res.status(400).json({
            success: false,
            message: 'All fields are required'
           }) 
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }
        if(role==="agent" && (!agent_type ||!yourself ||!agent_experience || !facebook_link ||!twitter_link ||!linkedin_link)){
            return res.status(400).json({
                success: false,
                message: 'Agent specific fields are required'
            })
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000);
        const otpCodeExpiredAt = Date.now() + 1.5 * 60 * 1000; // 1.5 Minute
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword,
            role,
            profile,
            address,
            phone,
            otpCode,
            otpCodeExpiredAt
        }
        if(role==="agent"){
            user.agent_type = agent_type;
            user.yourself = yourself;
            user.agent_experience = agent_experience;
            user.facebook_link = facebook_link;
            user.twitter_link = twitter_link;
            user.linkedin_link = linkedin_link;
        }
        const newUser = await User.create(user);
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: 'Email verification',
            html: Verification_Email_Template.replace("{verificationCode}",otpCode)
        };
        await transporter.sendMail(mailOptions);
        res.cookie("token",token,{
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 15 minutes
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? "none":'lax',
            path:'/'
        })
        res.status(200).json({
            success: true,
            message: `${role} registered successfully`,
            user: newUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}


export const VerifyEmail = async(req,res)=>{
    try {
        const {otp} = req.body;
        const user = await User.findOne({otpCode:otp});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            })
        }
        if(Date.now() > user.otpCodeExpiredAt){
            return res.status(400).json({
                success: false,
                message: 'OTP expired'
            })
        }
        user.isverified = true;
        user.otpCode = undefined;
        user.otpCodeExpiredAt = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const resendemailVerification = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        if(user.isverified){
            return res.status(400).json({
                success: false,
                message: 'Email already verified'
            })
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000);
        const otpCodeExpiredAt = Date.now() + 1.5 * 60 * 1000; // 1.5 Minute
        user.otpCode = otpCode;
        user.otpCodeExpiredAt = otpCodeExpiredAt;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: 'Email verification',
            html: Verification_Email_Template.replace("{verificationCode}",otpCode)
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: 'Verification email resent successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const Login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email ||!password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.cookie("token",token,{
            expires:  new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 day
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? "none":'lax',
            path:'/'
        })
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const Logout = async(req,res)=>{
    try {
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const UpdateProfile = async(req,res)=>{
    try {
        const {name,email,role,profile,address,phone,facebook_link,twitter_link,linkedin_link,agent_type,yourself,agent_experience} = req.body;
       const user = await User.findById(req.user._id);
       if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    if(!name ||!email ||!profile ||!address ||!phone){
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }
    if(role==="agent" && (!agent_type ||!yourself ||!agent_experience || !facebook_link ||!twitter_link ||!linkedin_link)){
        return res.status(400).json({
            success: false,
            message: 'Agent specific fields are required'
        })
    }
    user.name = name;
    user.email = email;
    user.role = role;
    user.profile = profile;
    user.address = address;
    user.phone = phone;
    if(role === "agent"){
        user.agent_type = agent_type;
        user.yourself = yourself;
        user.agent_experience = agent_experience;
        user.facebook_link = facebook_link;
        user.twitter_link = twitter_link;
        user.linkedin_link = linkedin_link;
    }
    await user.save();
    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user
    })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const ChangePassword = async(req,res)=>{
    try {
        const {oldPassword,newPassword,confirm_Password} = req.body;
        const user = await User.findById(req.user._id).select("+password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if(!oldPassword){
            return res.status(400).json({
                success: false,
                message: 'old password field is required'
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid old password'
            })
        }
        if(!newPassword ||!confirm_Password){
            return res.status(400).json({
                success: false,
                message: 'new password and confirm password fields are required'
            })
        }
        if(newPassword!== confirm_Password){
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match'
            })
        }
        const hashpassword = await bcrypt.hash(newPassword, 10);
        user.password = hashpassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const ForgotPassword = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: 'Password reset',
            text: `To reset your password, please click on the following link: \n\n
            ${process.env.client_url}/reset-password/${token}\n\n
            If you did not request a password reset, please ignore this email and no changes will be made.`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: 'request successfull please check your email for further instructions'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const ResetPassword = async(req,res)=>{
    try {
        const {newPassword} = req.body;
        const {token} = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if(!newPassword){
            return res.status(400).json({
                success: false,
                message: 'new password field is required'
            })
        }
        const hashpassword = await bcrypt.hash(newPassword, 10);
        user.password = hashpassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}


export const Fetch_Agents = async(req,res)=>{
    try {
        const {agent_type} = req.query;;

        const query = {role:"agent"};
        if(agent_type){
            query.agent_type = agent_type;
        }
        const agents = await User.find(query);
        res.status(200).json({
            success: true,
            message: 'Agents fetched successfully',
            agents
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const Fetch_Agent_Details = async(req,res)=>{
    try {
        const {id} = req.params;
        const agent = await User.findById(id);
        if(!agent){
            return res.status(404).json({
                success: false,
                message: 'Agent not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Agent fetched successfully',
            agent
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}
export const Fetch_All_Users = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })   
    }
}

export const Delete_User = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if(user.role==="admin"){
            return res.status(403).json({
                success: false,
                message: 'You cannot delete an admin'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}

export const Admin_Update_User = async(req,res)=>{
    try {
        const {role} = req.body;
        const {id} = req.params;
        const user = await User.findById(id);
        if(!role){
            return res.status(404).json({
                success: false,
                message: 'Role Needed'
            });
        }
        if(user.role==="agent"){
            return res.status(400).json({
                success: false,
                message: 'You cannot update an agent'
            });
        }
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        user.role = role;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}