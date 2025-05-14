import express from 'express';
import { Admin_Update_User, ChangePassword, Delete_User, Fetch_Agent_Details, Fetch_Agents, Fetch_All_Users, ForgotPassword, Login, Logout, Register, resendemailVerification, ResetPassword, UpdateProfile, VerifyEmail } from '../controller/userController.js';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';


const UserRouter = express.Router();

UserRouter.route("/register").post(Register)
UserRouter.route("/verifyotp").post(VerifyEmail)
UserRouter.route("/resend").post(resendemailVerification)
UserRouter.route("/login").post(Login)
UserRouter.route("/logout").get(Logout)
UserRouter.route("/updateprofile").put(isAuthenticated, UpdateProfile)
UserRouter.route("/changepassword").put(isAuthenticated, ChangePassword)
UserRouter.route("/forgot").post( ForgotPassword)
UserRouter.route("/reset-password/:token").put( ResetPassword)
UserRouter.route("/allusers").get(isAuthenticated,isAuthorized("admin"),Fetch_All_Users);
UserRouter.route("/delete/:id").delete(isAuthenticated,isAuthorized("admin"),Delete_User);
UserRouter.route("/updateuser/:id").put(isAuthenticated,isAuthorized("admin"),Admin_Update_User);


// Agents
UserRouter.route("/fetch_agents").get(Fetch_Agents)
UserRouter.route("/fetch_agent/:id").get(Fetch_Agent_Details)


export default UserRouter;