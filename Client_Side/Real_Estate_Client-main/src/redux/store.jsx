import { configureStore } from "@reduxjs/toolkit";
import User from "./slice/userSlice"
import Property from "./slice/propertySlice" 
import PropertyContact from "./slice/propertyContactSlice" 
import Seller from "./slice/sellerSlice" 
import Admin from "./slice/adminSlice" 
import Team from "./slice/teamSlice" 
import Contact from "./slice/contactSlice" 
import Review from "./slice/reviewSlice" 
import FeaturedCity from "./slice/Featured_CitySlice" 
import Service from "./slice/serviceSlice" 
import Whish from "./slice/whishSlice" 


const store = configureStore({
    reducer:{
        User,
        Property,
        PropertyContact,
        Seller,
        Admin,
        Team,
        Contact,
        Review,
        FeaturedCity,
        Service,
        Whish
    }
})

export default store;