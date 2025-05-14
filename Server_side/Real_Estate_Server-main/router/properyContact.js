import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Create_Property_Contact, Delete_Property_Contact, Fetch_All_Buyer_Contacts, Fetch_Property_Dealers, Get_Property_Contact, Get_Property_Contacts, Rejection_Toggle, ToggleByuserConformProperty, User_Cancel_Property_Toggle } from '../controller/propertyContact.js';


const PropertyContactRouter = express.Router();

PropertyContactRouter.route("/create/:id").post(isAuthenticated,isAuthorized("user"), Create_Property_Contact)
PropertyContactRouter.route("/agent_contacts").get(isAuthenticated, Get_Property_Contacts)
PropertyContactRouter.route("/agent_contact/:id").get(isAuthenticated, Get_Property_Contact)
PropertyContactRouter.route("/delete/:id").delete(isAuthenticated, Delete_Property_Contact)
PropertyContactRouter.route("/dealers").get(isAuthenticated, Fetch_Property_Dealers)
PropertyContactRouter.route("/canceltoggle/:id").get(isAuthenticated, User_Cancel_Property_Toggle)
PropertyContactRouter.route("/allbuyers").get(isAuthenticated,isAuthorized("admin"),Fetch_All_Buyer_Contacts)
PropertyContactRouter.route("/confirm/:id").get(isAuthenticated,isAuthorized("agent"),ToggleByuserConformProperty)
PropertyContactRouter.route("/rejected/:id").get(isAuthenticated,isAuthorized("agent"),Rejection_Toggle)


export default PropertyContactRouter;