import express from 'express';
import { isAuthenticated, isAuthorized } from '../utils/auth.js';
import { Admin_Fetch_All_Properties, Create_rating, Delete_Property, Featured_Properties, Featured_Property_Toggle, FeaturedCCity_Property_Toggle, Fetch_My_Properties, Fetch_Properties, Fetch_Property_Details, Property_create, Update_Property } from '../controller/properrtyController.js';


const PropertyRouter = express.Router();

PropertyRouter.route("/create").post(isAuthenticated,isAuthorized("agent","admin"), Property_create)
PropertyRouter.route("/properties").get(Fetch_Properties)
PropertyRouter.route("/admin-properties").get(isAuthenticated,isAuthorized("admin"), Admin_Fetch_All_Properties)
PropertyRouter.route("/featres_properties").get(Featured_Properties)
PropertyRouter.route("/my_properties").get(isAuthenticated, Fetch_My_Properties)
PropertyRouter.route("/property/:id").get(Fetch_Property_Details)
PropertyRouter.route("/rating/:id").put(isAuthenticated, Create_rating)
PropertyRouter.route("/update_property/:id").put(isAuthenticated, Update_Property)
PropertyRouter.route("/delete/:id").delete(isAuthenticated, Delete_Property)
PropertyRouter.route("/featuedcity/:id").get(isAuthenticated, isAuthorized("admin"),FeaturedCCity_Property_Toggle)
PropertyRouter.route("/featured/:id").get(isAuthenticated, isAuthorized("admin"),Featured_Property_Toggle)

export default PropertyRouter;