// import { AttachMoney } from '@mui/icons-material';
import Side_Bar from './Side_Bar';
import { useState } from 'react';
import Dash_Nav from './Dash_Nav';
import { useSelector } from 'react-redux';
import Agent_Dash from './Agent_Dash';
import User_Dash from './User_Dash';

const Dashboard = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);

  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">
        
      
       <div className="mt-2 text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-2xl font-extrabold bg-black inline-block px-16 rounded-full text-white py-4">Hi! {user?.role}</h2>
       </div>
       {/* <div className="wrapper mt-6">
       <div className="card-wrapper md:flex items-center">
          <div className="side-left md:w-[70%]">

          <div className="card-dash-1-wrapper max-[450px]:flex-col  max-[450px]:m-2  flex items-center">
            
                <div className="card-dash-1 hover:shadow-2xl border relative w-[100%] rounded-lg shadow-lg p-2 m-2" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="https://res.cloudinary.com/dvshyja15/image/upload/v1734626616/sale-arrow_hthajd.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Total Users</p>
                   <p>2</p>
                   </div>
                   <div>
                   <i className="fa-regular fa-circle-user p-2 bg-gray-200 rounded-md"></i>
                   </div>
                  </div>

                 <div className=" flex justify-between items-center mt-16">
                 <div className=" flex gap-2">
                  <p className="px-2 py-1 text-xs bg-gray-500 text-white rounded-sm">96%</p>
                  <span>Last Month</span>
                  </div>
                  <div>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                 </div>
                </div>

                <div className="card-dash-2 hover:shadow-2xl border relative w-[100%] p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="https://res.cloudinary.com/dvshyja15/image/upload/v1734626616/sale-arrow_hthajd.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Completed Orders</p>
                   <p>2</p>
                   </div>
                   <div>
                   <i className="fa-solid fa-cart-shopping p-2 bg-gray-200 rounded-md"></i>
                   </div>
                  </div>

                 <div className=" flex justify-between items-center mt-16">
                 <div className=" flex gap-2">
                  <p className="px-2 py-1 rounded-sm text-xs bg-gray-500 text-white">96%</p>
                  <span>Last Month</span>
                  </div>
                  <div>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                 </div>
                </div>
            </div>

          <div className="card-dash-1-wrapper max-[450px]:flex-col  max-[450px]:m-2 flex items-center">
          <div className="card-dash-3 hover:shadow-2xl rounded-lg shadow-xl border relative w-[100%] p-2 m-2"
          data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000"
          >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="https://res.cloudinary.com/dvshyja15/image/upload/v1734626616/sale-arrow_hthajd.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Total Carts</p>
                   <p>2</p>
                   </div>
                   <div>
                   <i className="fa-solid fa-bag-shopping p-2 bg-gray-200 rounded-md"></i>
                   </div>
                  </div>

                 <div className=" flex justify-between items-center mt-16">
                 <div className=" flex ">
                  <p className="px-2 py-1 text-xs bg-gray-500 text-white">96%</p>
                  <span>Last Month</span>
                  </div>
                  <div>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                 </div>
                </div>
                <div className="card-dash-4 hover:shadow-2xl border relative w-[100%] rounded-lg shadow-xl p-2 m-2"
                data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="https://res.cloudinary.com/dvshyja15/image/upload/v1734626616/sale-arrow_hthajd.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Total Favourite</p>
                   <p>2</p>
                   </div>
                   <div>
                   <i className="fa-regular fa-star p-2 bg-gray-200 rounded-md"></i>
                   </div>
                  </div>

                 <div className=" flex justify-between items-center mt-16">
                 <div className=" flex ">
                  <p className="px-2 py-1 text-xs bg-gray-500 text-white">96%</p>
                  <span>Last Month</span>
                  </div>
                  <div>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                 </div>
                </div>
            </div>

          </div>

          <div className="side-right h-full m-2 md:w-[340px] ">
           <div className="right-side-wrapper h-[310px]">
           <div className="card-dash-5 hover:shadow-2xl shadow-xl rounded-xl border flex flex-col content-around relative w-[100%] h-full p-2"
           data-aos="zoom-in"  data-aos-easing="linear" data-aos-duration="1200"
           >
                <div className="img absolute top-14 mix-blend-screen left-4 max-[400px]:w-[250px] w-[300px] h-[200px]">
                <img src="https://res.cloudinary.com/dvshyja15/image/upload/v1734626616/sale-arrow_hthajd.png" width='100%'  alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Total Sales</p>
                   <p>$600</p>
                   </div>
                   <div>
                   <AttachMoney/>
                   </div>
                  </div>
                  
                </div>
           </div>
          </div>
        </div>
       </div> */}
     
   {user?.role==="agent" && (
    <Agent_Dash user={user}/>
   )}
   {user?.role==="user" && (
    <User_Dash user={user}/>
   )}
        </div>
    </div>
   </div>
   
  )
}

export default Dashboard