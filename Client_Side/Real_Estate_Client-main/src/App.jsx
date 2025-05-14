import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import Properties from "./components/Properties"
import Property_detail from "./components/Property_detail"
import Services from "./components/Services"
import Team from "./components/Team"
import About from "./components/About"
import Contact from "./components/Contact"
import Register from "./components/screen/Register"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPVerify from "./components/screen/OTP_FORM"
import Login from "./components/screen/Login"
import Dashboard from "./components/Dashboard/Dashboard"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Change_Password from "./components/Dashboard/Change_Password"
import Forgot from "./components/screen/Forgot"
import Reset from "./components/screen/Reset"
import User_Agent from "./components/screen/User_Agent"
import Create_Property from "./components/Dashboard/Create_Property"
import Scroll from "./components/Scroll"
import Property_Buyer_Contacts from "./components/Dashboard/Proerty_Buyer_Contacts"
import Buyer_Contact_Detail from "./components/Dashboard/Buyer_Contact_Detail"
import Property_Dealers from "./components/Dashboard/Property_Dealer"
import My_Properties from "./components/Dashboard/My_Properties"
import Update_Property from "./components/Dashboard/Update_Property"
import Agents from "./components/Agents"
import Agent_Detail from "./components/Agent_Detail"
import Sellers from "./components/Dashboard/Seller_Contact"
import Agent_Contact from "./components/Dashboard/Agent_Contacts"
import Admin_Dashboard from "./admin_dashboard/Admin_dashboard"
import Admin_All_Properties from "./admin_dashboard/Admin_All_Properties"
import Admin_My_Properties from "./admin_dashboard/Admi_My_Property"
import Admin_Add_Property from "./admin_dashboard/Admin_Add_Properties"
import Admin_All_Users from "./admin_dashboard/Admin_All_Users"
import Admin_Property_Buyer_Contacts from "./admin_dashboard/Admin_All_Buyers"
import Admin_Buyer_Detail from "./admin_dashboard/Buyer_Detail_Admin"
import Admin_Property_Seller_Contacts from "./admin_dashboard/Admin_All_Sellers"
import Add_Team_Member from "./admin_dashboard/Add_Team_Member"
import All_Team_Member from "./admin_dashboard/All_Team_Members"
import Agent_SignUp from "./components/screen/Agent_SignUp"
import All_Contacts from "./admin_dashboard/All_Contacts"
import All_Reviews from "./admin_dashboard/All_Reviews"
import CreateReview from "./components/CreateReview"
import Featured_Properties from "./components/Featured_Properties"
import All_FeaturedCities from "./admin_dashboard/All_Featured_Cities"
import Add_Featured_Cities from "./admin_dashboard/Add_Featured_Cities"
import Add_Service from "./admin_dashboard/Add_Service"
import All_Services from "./admin_dashboard/All_Services"
import WhishList from "./components/WhishList"
import All_WhishList from "./admin_dashboard/All_WhishList"
const App = () => {
  const location = useLocation();
    
  const hideNavbarRoutes = ["/dashboard","/change_password","/create_Property","/agent-contacts","/dealers","/my-properties","/sellers","/agents_contact","/admin-dashboard","/admin-dashboard-allproperties","/admin-dashboard-myproperties","/admin-dashboard-addproperty","/admin-dashboard-allusers","/admin-dashboard-allbuyers","/admin-dashboard-buyerdetail","/admin-dashboard-allsellers","/admin-dashboard-addmember","/admin-dashboard-allmembers","/admin-dashboard-allcontacts","/admin-dashboard-allreviews","/admin-dashboard-featuredcities","/admin-dashboard-addfeaturedcity","/admin-dashboard-addservice","/admin-dashboard-allservices","/admin-dashboard-allwhishlist"];
  const dynamicRoutePatterns = [
    /^\/buyer-detail\/.+$/,
    /^\/update-property\/.+$/,
    /^\/admin-dashboard-buyerdetail\/.+$/,
    /^\/admin\/dashboard\/update_side\/.+$/,
    /^\/admin\/dashboard\/update_desert\/.+$/,
    /^\/admin\/dashboard\/update_order\/.+$/,
    /^\/admin\/dashboard\/singleuser\/.+$/,
  ];
  const shouldShowNavbar = !(
    hideNavbarRoutes.includes(location.pathname) ||
    dynamicRoutePatterns.some((pattern) => pattern.test(location.pathname))
  );
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Adjust duration and other options if needed
  }, []);

  // useEffect(()=>{
  //   document.addEventListener("contextmenu",handleContextMenu);
  //   return () => document.removeEventListener("contextmenu", handleContextMenu);
  // })
  
  // const handleContextMenu = (e) => {
  //   e.preventDefault();
  //   alert("Right click disabled");
  // };
  
  return (
    <div>
      <Scroll/>
      {shouldShowNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/properties" element={<Properties/>}></Route>
        <Route path="/featured-properties" element={<Featured_Properties/>}></Route>
        <Route path="/detail/:id" element={<Property_detail/>}></Route>
        <Route path="/services" element={<Services/>}></Route>
        <Route path="/team" element={<Team/>}></Route>
        <Route path="/agents" element={<Agents/>}></Route>
        <Route path="/agent-detail/:id" element={<Agent_Detail/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/otp_verify" element={<OTPVerify/>}></Route>
        <Route path="/become-agent" element={<Agent_SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgot" element={<Forgot/>}></Route>
        <Route path="/whishlist" element={<WhishList/>}></Route>
        <Route path="/create-review" element={<CreateReview/>}></Route>
        <Route path="/reset-password/:token" element={<Reset/>}></Route>

        {/* Dashboard */}
        <Route element={<User_Agent/>}>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/change_password" element={<Change_Password/>}></Route>
        <Route path="/create_Property" element={<Create_Property/>}></Route>
        <Route path="/agent-contacts" element={<Property_Buyer_Contacts/>}></Route>
        <Route path="/buyer-detail/:id" element={<Buyer_Contact_Detail/>}></Route>
        <Route path="/dealers" element={<Property_Dealers/>}></Route>
        <Route path="/sellers" element={<Sellers/>}></Route>
        <Route path="/agents_contact" element={<Agent_Contact/>}></Route>
        <Route path="/my-properties" element={<My_Properties/>}></Route>
        <Route path="/update-property/:id" element={<Update_Property/>}></Route>
        </Route>

        {/* admin dashboard */}
        <Route path="/admin-dashboard" element={<Admin_Dashboard/>}></Route>
        <Route path="/admin-dashboard-allproperties" element={<Admin_All_Properties/>}></Route>
        <Route path="/admin-dashboard-myproperties" element={<Admin_My_Properties/>}></Route>
        <Route path="/admin-dashboard-addproperty" element={<Admin_Add_Property/>}></Route>
        <Route path="/admin-dashboard-allusers" element={<Admin_All_Users/>}></Route>
        <Route path="/admin-dashboard-allbuyers" element={<Admin_Property_Buyer_Contacts/>}></Route>
        <Route path="/admin-dashboard-allsellers" element={<Admin_Property_Seller_Contacts/>}></Route>
        <Route path="/admin-dashboard-buyerdetail/:id" element={<Admin_Buyer_Detail/>}></Route>
        <Route path="/admin-dashboard-addmember" element={<Add_Team_Member/>}></Route>
        <Route path="/admin-dashboard-allmembers" element={<All_Team_Member/>}></Route>
        <Route path="/admin-dashboard-allcontacts" element={<All_Contacts/>}></Route>
        <Route path="/admin-dashboard-allreviews" element={<All_Reviews/>}></Route>
        <Route path="/admin-dashboard-featuredcities" element={<All_FeaturedCities/>}></Route>
        <Route path="/admin-dashboard-addfeaturedcity" element={<Add_Featured_Cities/>}></Route>
        <Route path="/admin-dashboard-allservices" element={<All_Services/>}></Route>
        <Route path="/admin-dashboard-addservice" element={<Add_Service/>}></Route>
        <Route path="/admin-dashboard-allwhishlist" element={<All_WhishList/>}></Route>
      </Routes>
      {shouldShowNavbar && <Footer/>}
      <ToastContainer autoClose={1500} />
    </div>
  )
}

export default App