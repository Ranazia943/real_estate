import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { AgentGetSellerContacts, CancelToogle, CraeteSellerContact, DeleteSellerContact, Fetch_All_Seller_Contacts, UserGetAgentContacts } from '../controller/SellerController.js';


const SellerRouter = express.Router();

SellerRouter.route("/create/:id").post(isAuthenticated,isAuthorized("user"), CraeteSellerContact)
SellerRouter.route("/a_sellers").get(isAuthenticated,AgentGetSellerContacts)
SellerRouter.route("/allsellers").get(isAuthenticated,isAuthorized("admin"),Fetch_All_Seller_Contacts)
SellerRouter.route("/u_sellers").get(isAuthenticated,UserGetAgentContacts)
SellerRouter.route("/delete/:id").delete(isAuthenticated,DeleteSellerContact)
SellerRouter.route("/cancel/:id").get(isAuthenticated,CancelToogle)

export default SellerRouter;