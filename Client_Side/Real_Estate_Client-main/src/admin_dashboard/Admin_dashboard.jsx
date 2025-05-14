// import { AttachMoney } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Fetch_All_Buyers, Fetch_All_Properties_Admin, Fetch_All_Sellers, Fetch_All_Users, Fetch_All_WhishLists } from '../redux/action/adminAction';
import Spinnerr from '../components/Spinnerr';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetch_Contacts } from '../redux/action/contactAction';

const Admin_Dashboard = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {userloading,allusers,allbuyers,buyerloading,sellerloading,allsellers,allwhishlists,whishloadingg,allproperties,p_loading} = useSelector((state)=>state.Admin);
    const {contacts,contactloading} = useSelector((state)=>state.Contact);
    const dispatch = useDispatch();
    const [agents, setAgents] = useState([])


    useEffect(()=>{
      dispatch(Fetch_All_Users());
      dispatch(Fetch_All_Properties_Admin());
      dispatch(Fetch_All_Buyers());
      dispatch(Fetch_All_WhishLists());
      dispatch(fetch_Contacts());
      dispatch(Fetch_All_Sellers());
    },[dispatch])

    useEffect(()=>{
      const agentts = allusers?.filter((item)=>item.role === "agent")
      setAgents(agentts)
    },[allusers])

  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">        
      <div className="card-wrapper md:flex items-center">
          <div className="side-left w-full">
          <div className="card-dash-1-wrapper  grid max-[450px]:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-1">            
                <div className="card-dash-4 hover:shadow-2xl border relative rounded-lg shadow-lg p-2 m-2" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Total Users</p>
                   {userloading ? (<Spinnerr/>):(
                    <p>{allusers?.length}</p>
                   )}
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

                <div className="card-dash-4 hover:shadow-2xl border relative  p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Buyers</p>
                   {buyerloading ? (<Spinnerr/>):(
                    <p>{allbuyers?.length}</p>
                   )}
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
                <div className="card-dash-4 hover:shadow-2xl border relative  p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Sellers</p>
                   {sellerloading ? (<Spinnerr/>):(
                    <p>{allsellers?.length}</p>
                   )}
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
                <div className="card-dash-4 hover:shadow-2xl border relative  p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Properties</p>
                   {p_loading ? (<Spinnerr/>):(
                    <p>{allproperties?.length}</p>
                   )}
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
                <div className="card-dash-4 hover:shadow-2xl border relative  p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Whish Lists</p>
                   {whishloadingg ? (<Spinnerr/>):(
                    <p>{allwhishlists?.length}</p>
                   )}
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
                <div className="card-dash-4 hover:shadow-2xl border relative  p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Contacts</p>
                   {contactloading ? (<Spinnerr/>):(
                    <p>{contacts?.length}</p>
                   )}
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


          </div>
        </div>

        <div className="recent-proerties">
          <div className="wrapper">
            <h2 className="text-center my-10 font-[800] text-3xl font-sans">Recent Posting</h2>
       <div className="font-[sans-serif] overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
  <table className="min-w-full bg-white">
    <thead className="whitespace-nowrap">
      <tr>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Property
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Creator
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2" viewBox="0 0 401.998 401.998">
            <path d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" data-original="#000000" />
          </svg>
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Type
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2" viewBox="0 0 401.998 401.998">
            <path d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" data-original="#000000" />
          </svg>
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Size
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="whitespace-nowrap">
      {allproperties?.slice(0,6).map((item,index)=>{
        return (
          <tr key={index} className="">
        <td className="p-4 text-sm">
          <div className="flex items-center cursor-pointer w-max">
            <img src={item.images[0]} className="w-12 h-12 rounded-full shrink-0" />
            <div className="ml-4">
              <p className="text-sm text-black">{item.property_type}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.location.address}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm">
          <div className="flex items-center cursor-pointer w-max">
            <img src={item.property_poster.profile} className="w-9 h-9 rounded-full shrink-0" />
            <div className="ml-4">
              <p className="text-sm text-black">{item.property_poster.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.property_poster.email}</p>
            </div>
          </div>
        </td>
        <td className="p-4">
          {item.property_type}
        </td>
        <td className="p-4">
            sqft {item.size}
        </td>
        <td className="p-4">
          <button className="mr-4" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
              <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
              <path d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z" data-original="#000000" />
            </svg>
          </button>
          <button title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
              <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" />
              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" />
            </svg>
          </button>
        </td>
      </tr>
        )
      })}
    </tbody>
  </table>
</div>
 {allproperties?.length>6 && (
   <div className=' text-center my-4'>
   <Link to="/admin-dashboard-allproperties"> <Button variant='contained'>See All</Button></Link>
  </div>
 )}

          </div>
        </div>

        <div className="agents">
        <div className="recent-proerties">
          <div className="wrapper">
            <h2 className="text-center my-10 font-[800] text-3xl font-sans">Agents</h2>
       <div className="font-[sans-serif] overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
  <table className="min-w-full bg-white">
    <thead className="whitespace-nowrap">
      <tr>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Profile
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Type
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Address
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          isVerified
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="whitespace-nowrap">
      {agents?.slice(0,4).map((item,index)=>{
        return (
          <tr key={index} className="">
        <td className="p-4 text-sm">
          <div className="flex items-center cursor-pointer w-max">
            <img src={item.profile} className="w-10 h-10 rounded-full shrink-0 object-cover" />
            <div className="ml-4">
              <p className="text-sm text-black">{item.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.address}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm uppercase">
          {item.agent_type}
        </td>
        <td className="p-4">
          {item.address}
        </td>
        <td className={`p-4 ${item.isverified===true ? "text-green-500":"text-red-500"}`}>
           {item.isverified===true ? "Verified" : "Notverified"}
        </td>
        <td className="p-4">
          <button className="mr-4" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
              <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
              <path d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z" data-original="#000000" />
            </svg>
          </button>
          <button title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
              <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" />
              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" />
            </svg>
          </button>
        </td>
      </tr>
        )
      })}
    </tbody>
  </table>
</div>
{allusers?.filter((item)=>item.role==="agent").length>4 && (
   <div className=' text-center my-4'>
   <Link to="/admin-dashboard-allusers"> <Button variant='contained'>See All</Button></Link>
  </div>
 )}
          </div>
        </div>
        </div>
      
        </div>
    </div>
   </div>
   
  )
}

export default Admin_Dashboard