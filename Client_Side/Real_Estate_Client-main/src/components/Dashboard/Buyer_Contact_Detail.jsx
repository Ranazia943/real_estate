// import { AttachMoney } from '@mui/icons-material';
import Side_Bar from './Side_Bar';
import { useEffect, useState } from 'react';
import Dash_Nav from './Dash_Nav';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Fetch_Agent_Contact } from '../../redux/action/propertyContactAction';
import Loader from '../Loader';

const Buyer_Contact_Detail = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {property_buyer,contactloading} = useSelector((state)=>state.PropertyContact);
    const {id} = useParams();
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(Fetch_Agent_Contact(id))
    },[dispatch,id])

  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">
        
      
       <div className="mt-2 text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-2xl font-extrabold bg-black inline-block px-16 rounded-full text-white py-4">Buyer Detail</h2>
       </div>

    {contactloading ? (<Loader/>):(
           <div className="wrapper w-[95%] md:w-[80%] mt-4 mx-auto">
           <div className="property_info relative">
               <div className=' absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]'>
                   <p className=' text-2xl font-[800] text-white text-center'>{property_buyer?.propertyInfo?.title}</p>
               </div>
               <img src={property_buyer?.propertyInfo?.image} className=' aspect-video w-full rounded-2xl' alt="" />
           </div>
           <div className="sub-wrapper max-w-2xl mx-auto mt-10 mb-20">
               <div className="agentInfo border rounded-2xl bg-white hover:shadow-md hover:-translate-y-2 duration-300 transition-all w-full p-4">
               <img src={property_buyer?.userInfo?.profile} className=' w-16 h-16 rounded-full object-cover m-auto my-4' alt="" />
               <div className=' flex items-center justify-between mx-4 gap-4'>
                       <span className='font-[600] text-lg'>name:</span>
                       <span className='font-[400] text-base'>{property_buyer?.userInfo?.name}</span>
                   </div>
                   <div className=' flex items-center justify-between mx-4 gap-4'>
                       <span className='font-[600] text-lg'>email:</span>
                       <span className='font-[400] text-base'>{property_buyer?.userInfo?.email}</span>
                   </div>
                   <div className=' flex items-center justify-between mx-4 gap-4'>
                       <span className='font-[600] text-lg'>phone no:</span>
                       <span className='font-[400] text-base'>{property_buyer?.phone}</span>
                   </div>
                   <div className=' flex items-center justify-between mx-4 gap-4'>
                       <span className='font-[600] text-lg'>Deleted:</span>
                       <span className='font-[400] text-base'>{property_buyer?.deletedby.user===true ? "Yes":"No"}</span>
                   </div>
                   <div className=' flex flex-col mt-4 items-center justify-between mx-4 gap-2'>
                       <span className='font-[600] text-lg underline underline-offset-4'>Message</span>
                       <span className='font-[400] text-base'>{property_buyer?.contactmessage}</span>
                   </div>
               </div>.
           </div>
          </div>
    )}
        </div>
    </div>
   </div>
   
  )
}

export default Buyer_Contact_Detail