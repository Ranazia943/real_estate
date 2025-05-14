import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Create_WhishItem, Delete_WhishItem, Fetch_All_Whishlists, Fetch_by_length, My_WhishLists } from '../controller/whichController.js';


const WhishRouter = express.Router();

WhishRouter.route("/create").post(isAuthenticated,isAuthorized("user"),Create_WhishItem);
WhishRouter.route("/mylists").get(isAuthenticated,My_WhishLists);
WhishRouter.route("/delete/:id").delete(isAuthenticated,Delete_WhishItem);
WhishRouter.route("/whishlists").get(isAuthenticated,isAuthorized("admin"),Fetch_All_Whishlists);


WhishRouter.route("/bylength").get(isAuthenticated,isAuthorized("admin"),Fetch_by_length);

export default WhishRouter;