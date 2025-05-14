// import { AttachMoney } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Admin_Update_Users, Fetch_All_Users } from '../redux/action/adminAction';
import Loader from '../components/Loader';
import { User_Delete } from '../redux/action/userAction';
import Spinnerr from '../components/Spinnerr';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Admin_All_Users = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {userloading,allusers,userdelloading,updateloading} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    const [itemid, setItemid] = useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = (id,role) => {
        setOpen(true);
        setItemid(id)
        setRole(role)
    };
    const handleClose = () => setOpen(false);
    const [role, setRole] = useState("")


    useEffect(()=>{
      dispatch(Fetch_All_Users());
    },[dispatch])
    const handledelete = (id)=>{
        setItemid(id)
        dispatch(User_Delete(id))
    }
    const handleupdate = ()=>{
        dispatch(Admin_Update_Users(itemid,role,handleClose))
    }

  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update User
          </Typography>
          {/* <form action=""> */}
          <select className='w-full h-10 bg-white border border-gray-200 my-2' value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
          {/* </form> */} <br />
          <Button variant='contained' onClick={handleupdate}>
            
  {updateloading ? (
    <>
      Update
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
  ) : (
    "Update"
  )}
          </Button>
      </Box> 
      </Modal>    
    

        <div className="agents">
        <div className="recent-proerties">
          <div className="wrapper">
            <h2 className="text-center my-6 font-[800] text-3xl font-sans">All Users</h2>
    {userloading ? (<Loader/>):(
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
                   Role
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
               {allusers?.map((item,index)=>{
                 return (
                   <tr key={index} className="">
                 <td className="p-4 text-sm">
                   <div className="flex items-center cursor-pointer w-max">
                     <img src={item.profile} className="w-10 h-10 rounded-full shrink-0 object-cover" />
                     <div className="ml-4">
                       <p className="text-sm text-black">{item.name}</p>
                       <p className="text-xs text-gray-500 mt-0.5">{item.email}</p>
                     </div>
                   </div>
                 </td>
                 <td className="p-4 text-sm uppercase">
                   {item.agent_type ? item.agent_type : "None"}
                 </td>
                 <td className="p-4">
                   {item.address}
                 </td>
                 <td className="p-4 uppercase">
                   {item.role}
                 </td>
                 <td className={`p-4 ${item.isverified===true ? "text-green-500":"text-red-500"}`}>
                    {item.isverified===true ? "Verified" : "Notverified"}
                 </td>
                 <td className="p-4">
                   <button className="mr-4" title="Edit" onClick={()=>handleOpen(item._id,item.role)}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
                       <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
                       <path d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z" data-original="#000000" />
                     </svg>
                   </button>
                     <button title="Delete" onClick={()=>handledelete(item._id)}>
                  {(userdelloading && item._id === itemid) ? (<Spinnerr/>):(
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                       <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" />
                       <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" />
                     </svg>
                  )}
                   </button>
                 </td>
               </tr>
                 )
               })}
             </tbody>
           </table>
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

export default Admin_All_Users