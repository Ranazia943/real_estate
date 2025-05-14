import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Delete_Agent_Property_Contact } from '../../redux/action/propertyContactAction';
import { Button } from '@mui/material';
import { AirlineStops, DeleteForever } from '@mui/icons-material';
import Spinnerr from '../components/Spinnerr';
import { Link } from 'react-router-dom';
import Admin_Side_Bar from './Admin_sidebar';
import { Fetch_All_Buyers } from '../redux/action/adminAction';
import Dash_Nav from '../components/Dashboard/Dash_Nav';

const Admin_Property_Buyer_Contacts = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {allbuyers,buyerloading} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    // const [delid, setDelid] = useState("")

    useEffect(()=>{
        dispatch(Fetch_All_Buyers());
    },[dispatch])
    // const handledelete = (id) => {
    //     setDelid(id);
    //     dispatch(Delete_Agent_Property_Contact(id))
    // }

  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">
        
      
       <div className="mt-2 text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-xl md:text-2xl font-extrabold bg-black inline-block px-16 rounded-full text-white py-4">Property buyer list</h2>
       </div>

       <div className="wrapper">
   {buyerloading ? (<div className='my-4 flex justify-center items-center h-[80vh]'><Spinnerr/></div>) : allbuyers?.length===0 ? (<div>
        <p className=' text-2xl font-[600] flex justify-center items-center h-[80vh]'>No buyers yet</p>
      </div>): (<div className="overflow-x-auto md:m-10 shadow-md rounded-lg border border-gray-200 sm:m-6 m-2 font-[sans-serif]">
  <table className="min-w-full bg-white">
    <thead className="bg-white whitespace-nowrap">
      <tr>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Property
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Agent Info
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Buyer Info
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Link
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="whitespace-nowrap divide-y divide-gray-200">
      {allbuyers?.map((p,index)=>{
        return(
            <tr key={index} className=''>
        <td className="p-4 text-sm">
          <div className="flex items-center cursor-pointer">
           <Link to={`/detail/${p.propertyInfo.propertyid}`}>
           <img src={p.propertyInfo.image} className="w-16 h-16 object-cover rounded-full bg-gray-100" />
           </Link>
            <div className="mx-4">
              <p className="text-sm text-black">{p.propertyInfo.title}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm">
        <div className="flex items-center cursor-pointer">
           <Link to={`/agent-detail/${p.agentInfo.agentid}`}>
            <img src={p.agentInfo.profile} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
            </Link>
            <div className="mx-4">
              <p className="text-sm text-black">{p.agentInfo.name}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm relative">
        {p.actions.cancel===true && (
          <div className=' absolute top-[50%] -translate-y-[50%] -left-4 -translate-x-[50%]'>
          <p className=' text-red-500 border-t border-b border-red-500 py-2'>user Cancel deal</p>
        </div>
      )}
        <div className="flex items-center cursor-pointer">
            <img src={p.userInfo.profile} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
            <div className="mx-4">
              <p className="text-sm text-black">{p.name}</p>
              <p className="text-sm text-black">{p.phone}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm">
          <Link to={`/admin-dashboard-buyerdetail/${p._id}`}>
          <Button variant='contained' sx={{background:"black"}} className=' text-cyan-500 hover:underline cursor-pointer'>Further detail <AirlineStops/></Button>
          </Link>
        </td>
        <td className="p-4 text-sm">
          <Button variant='contained' sx={{background:"red"}}>
            {/* {(delid === p._id && pccreateloading) ? (<Spinnerr/>):(<DeleteForever/>)} */}
            <DeleteForever/>
          </Button>
        </td>
      </tr>
        )
      })}
    </tbody>
  </table>
  {/* <div className="md:flex m-4">
    <p className="text-sm text-gray-500 flex-1">Showind 1 to 5 of 100 entries</p>
    <div className="flex items-center max-md:mt-4">
      <p className="text-sm text-gray-500">Display</p>
      <select className="text-sm text-gray-500 border border-gray-400 rounded h-8 px-1 mx-4 outline-none">
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
      <ul className="flex space-x-1 ml-4">
        <li className="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
            <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" data-original="#000000" />
          </svg>
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
          1
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-8 h-8 rounded">
          2
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
          3
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
          4
        </li>
        <li className="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
            <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" data-original="#000000" />
          </svg>
        </li>
      </ul>
    </div>
  </div> */}
</div>)}

       </div>
        </div>
    </div>
   </div>
   
  )
}

export default Admin_Property_Buyer_Contacts