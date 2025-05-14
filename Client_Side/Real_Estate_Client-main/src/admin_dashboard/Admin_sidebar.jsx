/* eslint-disable react/prop-types */
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleDollarSign, Fence, HandCoins, Settings, User } from 'lucide-react';
import { LogoutOutlined, Reviews } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/action/userAction';



const Admin_Side_Bar = ({ side,loading }) => {
    const [isactive, setIsactive] = useState(0)
    const [isopentoggle, setIsopentoggle] = useState(false)
    const isopen = (ind)=>{
        setIsactive(ind)
        setIsopentoggle(!isopentoggle)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(LogoutUser(navigate))
    }
  return (
    <div>
        <div id="sidebar-wrapper" className={`${side ? "open":""} bg-black`}>
            <div className="sidebar hover:overflow-y-auto h-full scrollbar-hide scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-700">
            <ul className=" px-2 py-6 text-white">
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===0 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(0)}>
                  <Link to='/admin-dashboard'>
                  <div className=" flex justify-center space-x-2">
                        <DashboardIcon/> <p className=" cursor-pointer">DashBoard</p>
                    </div>
                  </Link>
                </li>
                    <li className=" my-4">
                    <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===1 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(1)}>
                    <div className=" flex justify-center  space-x-2">
                         <Fence/> <p className=" cursor-pointer">Properties</p>
                     </div>
                     <div className="arrow">
                         {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                         
                         <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===1 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                     </div>
                    </div>
                     <div className={`submenu-wrapper ${isactive===1 && isopentoggle===true ? "colaps":"colapsd"}`}>
                         <ul className="submenu text-start pl-8 border-l-2 mt-2">
                         <li className="my-2"><Link to="/admin-dashboard-allproperties">All Properties</Link></li>
                         <li className="my-2"><Link to="/admin-dashboard-myproperties">My Properties</Link></li>
                         <li className="my-2"><Link to="/admin-dashboard-addproperty">Add Property</Link></li>
                         </ul>
                     </div>
                 </li>
                    <li className=" my-4">
                    <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===2 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(2)}>
                    <div className=" flex justify-center  space-x-2">
                         <User/> <p className=" cursor-pointer">Users</p>
                     </div>
                     <div className="arrow">
                         {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                         
                         <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===2 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                     </div>
                    </div>
                     <div className={`submenu-wrapper ${isactive===2 && isopentoggle===true ? "colaps":"colapsd"}`}>
                         <ul className="submenu text-start pl-8 border-l-2 mt-2">
                         <li className="my-2"><Link to="/admin-dashboard-allusers">All Users</Link></li>
                         </ul>
                     </div>
                 </li>
                    <li className=" my-4">
                    <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===7 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(7)}>
                    <div className=" flex justify-center  space-x-2">
                         <User/> <p className=" cursor-pointer">Team</p>
                     </div>
                     <div className="arrow">
                         {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                         
                         <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===7 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                     </div>
                    </div>
                     <div className={`submenu-wrapper ${isactive===7 && isopentoggle===true ? "colaps":"colapsd"}`}>
                         <ul className="submenu text-start pl-8 border-l-2 mt-2">
                         <li className="my-2"><Link to="/admin-dashboard-addmember">Add Member</Link></li>
                         <li className="my-2"><Link to="/admin-dashboard-allmembers">All Members</Link></li>
                         </ul>
                     </div>
                 </li>
                {/* agent side */}
                    <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===3 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(3)}>
                  <Link to='/admin-dashboard-allbuyers'>
                  <div className=" flex justify-center space-x-2">
                        <CircleDollarSign/> <p className=" cursor-pointer">Buyer Contact</p>
                    </div>
                  </Link>
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===4 ? "activ" : ""}`} onClick={()=>isopen(4)}>
                  <Link to='/admin-dashboard-allsellers'>
                  <div className=" flex justify-center space-x-2">
                        <HandCoins/> <p className=" cursor-pointer">Seller Contact</p>
                    </div>
                  </Link>
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===11 ? "activ" : ""}`} onClick={()=>isopen(11)}>
                  <Link to='/admin-dashboard-allwhishlist'>
                  <div className=" flex justify-center space-x-2">
                        <HandCoins/> <p className=" cursor-pointer">Whish Lists</p>
                    </div>
                  </Link>
                </li>
                {/* agent side */}

                {/* user side */}
               
                {/* user side */}
                <li className=" my-4">
                   <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===5 ? "text-blue-400" : "text-white"}`} onClick={()=>isopen(5)}>
                   <div className=" flex justify-center  space-x-2">
                        <Settings/> <p className=" cursor-pointer">Setting</p>
                    </div>
                    <div className="arrow">
                        {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                        
                        <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===5 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                    </div>
                   </div>
                    <div className={`submenu-wrapper ${isactive===5 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/change_password">Change Password</Link></li>
                        </ul>
                    </div>
                </li>
                <li className=" my-4">
                   <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===9 ? "text-blue-400" : "text-white"}`} onClick={()=>isopen(9)}>
                   <div className=" flex justify-center  space-x-2">
                        <Settings/> <p className=" cursor-pointer">Cities</p>
                    </div>
                    <div className="arrow">
                        {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                        
                        <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===9 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                    </div>
                   </div>
                    <div className={`submenu-wrapper ${isactive===9 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin-dashboard-featuredcities">Featured Cities</Link></li>
                        <li className="my-2"><Link to="/admin-dashboard-addfeaturedcity">Add City</Link></li>
                        </ul>
                    </div>
                </li>
                <li className=" my-4">
                   <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===10 ? "text-blue-400" : "text-white"}`} onClick={()=>isopen(10)}>
                   <div className=" flex justify-center  space-x-2">
                        <Settings/> <p className=" cursor-pointer">Services</p>
                    </div>
                    <div className="arrow">
                        {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                        
                        <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===10 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                    </div>
                   </div>
                    <div className={`submenu-wrapper ${isactive===10 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin-dashboard-allservices">All Services</Link></li>
                        <li className="my-2"><Link to="/admin-dashboard-addservice">Add Service</Link></li>
                        </ul>
                    </div>
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===8 ? "activ" : ""}`} onClick={()=>isopen(4)}>
                  <Link to='/admin-dashboard-allcontacts'>
                  <div className=" flex justify-center space-x-2">
                        <HandCoins/> <p className=" cursor-pointer">Contacts</p>
                    </div>
                  </Link>
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===6 ? "activ" : ""}`} onClick={()=>isopen(6)}>
                  <Link to='/admin-dashboard-allreviews'>
                  <div className=" flex items-center space-x-2">
                        <p><Reviews/></p> <p className=" cursor-pointer">Customer reviews</p>
                    </div>
                        </Link>
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===6 ? "activ" : ""}`} onClick={()=>isopen(6)}>
                  <div className=" flex justify-center space-x-2" onClick={logout}>
                        <LogoutOutlined/> <p className=" cursor-pointer">{loading ? (
                            <>
                            Logout
                            <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        fill="#fff"
        className="ml-2 inline animate-spin"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          data-original="#000000"
        />
      </svg>
                            </>
                        ):"Logout"}</p>
                    </div>
                </li>

            </ul>
            </div>
        </div>
    </div>
  )
}

export default Admin_Side_Bar