import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Create_Team_member, Delete_Team_member, Fetch_All_Team_members, Update_Team_member } from '../controller/teamController.js';


const TeamRouter = express.Router();

TeamRouter.route("/create").post(isAuthenticated,isAuthorized("admin"),Create_Team_member)
TeamRouter.route("/teams").get(Fetch_All_Team_members)
TeamRouter.route("/update/:id").put(isAuthenticated,isAuthorized("admin"),Update_Team_member)
TeamRouter.route("/delete/:id").delete(isAuthenticated,isAuthorized("admin"),Delete_Team_member)

export default TeamRouter;