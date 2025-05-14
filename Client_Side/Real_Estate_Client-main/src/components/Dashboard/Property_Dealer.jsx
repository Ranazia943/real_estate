// import { AttachMoney } from '@mui/icons-material';
import Side_Bar from './Side_Bar';
import { useEffect, useState } from 'react';
import Dash_Nav from './Dash_Nav';
import { useDispatch, useSelector } from 'react-redux';
import Spinnerr from '../Spinnerr';
import { Link } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@mui/material';
import { AirlineStops, Delete, NotInterested } from '@mui/icons-material';
import { Cancel_Toggle, Delete_User_Property_Contact, Property_Dealerss } from '../../redux/action/propertyContactAction';

const Property_Dealers = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {property_dealers,contactloading,pccreateloading,cancelloading} = useSelector((state)=>state.PropertyContact);
    const dispatch = useDispatch();
    const [itemid, setItemid] = useState();

    useEffect(()=>{
      dispatch(Property_Dealerss())
    },[dispatch])
    const handledelete = (id) => {
      setItemid(id);
       dispatch(Delete_User_Property_Contact(id))
    }
    const handlecancel = (id) => {
      setItemid(id);
       dispatch(Cancel_Toggle(id));
    }
  
  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">
        
      
       <div className="mt-2 text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-2xl font-extrabold bg-black inline-block px-16 rounded-full text-white py-4">Seller Contacts</h2>
       </div>
       <div className="wrapper">
   {contactloading ? (<div className='my-4 flex justify-center items-center h-[80vh]'><Spinnerr/></div>) : property_dealers?.length===0 ? (<div>
        <p className=' text-2xl font-[600] flex justify-center items-center h-[80vh]'>No Contact yet</p>
      </div>): (<div className="overflow-x-auto md:m-10 sm:m-6 m-2 font-[sans-serif]">
  <table className="min-w-full bg-white">
    <thead className="bg-gray-100 whitespace-nowrap">
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
      {property_dealers?.map((p,index)=>{
        return(
            <tr key={index} className=' border border-gray-200'>
        <td className="p-4 text-sm relative">
        {/* {p.actions.complete===true && (
          <div className=' absolute bottom-0 -translate-y-[50%] right-4'>
          <p className=' text-red-500 border-t border-b border-red-500 py-2'>{(p.actions.complete===true&& p.userInfo.userid===user._id) }</p>
        </div>
      )} */}
          <div className="flex items-center cursor-pointer">
            <img src={p.propertyInfo.image} className="w-16 h-16 p-1.5 object-cover bg-gray-100" />
            <div className="mx-4">
              <p className="text-sm text-black">{p.propertyInfo.title}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm">
        <div className="flex items-center cursor-pointer relative">
        {p.actions.complete===true ? (
          <div className=' absolute top-[50%] -translate-y-[50%] -rotate-45 -left-4 -translate-x-[50%]'>
          <p className=' text-green-500 border-t border-b border-green-500 py-2'>Completed</p>
        </div>
      ):p.actions.rejected===true ? (
        <div className=' absolute top-[50%] -translate-y-[50%] -rotate-45 -left-4 -translate-x-[50%]'>
          <p className=' text-red-500 border-t border-b border-red-500 py-2'>Property Solded</p>
        </div>
      ):""}
            <img src={p.agentInfo.profile} className="w-16 h-16 p-1.5 object-cover bg-gray-100" />
            <div className="mx-4">
              <p className="text-sm text-black">{p.agentInfo.name}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm relative">
      {p.actions.cancel===true && (
          <div className=' absolute top-[50%] -translate-y-[50%] -left-4 -translate-x-[50%]'>
          <p className=' text-red-500 border-t border-b border-red-500 py-2'>Cancel Property</p>
        </div>
      )}
        <div className="flex items-center cursor-pointer">
            <img src={p.userInfo.profile} className="w-16 h-16 p-1.5 object-cover bg-gray-100" />
            <div className="mx-4">
              <p className="text-sm text-black">{p.name}</p>
              <p className="text-sm text-black">{p.phone}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm">
          <Link to={`/buyer-detail/${p._id}`}>
          <Button variant='contained' sx={{background:"black"}} className=' text-cyan-500 hover:underline cursor-pointer'>detail <AirlineStops/></Button>
          </Link>
        </td>
        <td className="p-4 text-sm">
        <Tooltip title="Delete">
  <IconButton onClick={()=>handledelete(p._id)}>
    {(pccreateloading && itemid===p._id) ? (<Spinnerr/>):(<Delete sx={{color:"red"}}/>)}
  </IconButton>
</Tooltip>
      {(p.actions.cancel===false && p.actions.complete === false && p.actions.rejected===false) && (  
       <>
        <Tooltip title="Cancel">
  <IconButton onClick={()=>handlecancel(p._id)}>
    {(cancelloading && itemid === p._id) ? (<Spinnerr/>):(<NotInterested />)}
  </IconButton>
</Tooltip>
       </>
)}
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

export default Property_Dealers