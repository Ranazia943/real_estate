// import { AttachMoney } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import Loader from '../components/Loader';
import Spinnerr from '../components/Spinnerr';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Delete_Team_Member, Fetch_Team_Members, Update_Team_Member } from '../redux/action/teamAction';
import { FacebookOutlined, LinkedIn, Twitter } from '@mui/icons-material';
import { setUpdateloading } from '../redux/slice/teamSlice';
import { toast } from 'react-toastify';

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


const All_Team_Member = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {teamloading,teams,updateloading,teamdelloading} = useSelector((state)=>state.Team);
    const dispatch = useDispatch();
    const [itemid, setItemid] = useState("")
    const [team, setTeam] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = (id,tteam) => {
        setOpen(true);
        setItemid(id)
        setTeam(tteam)
    };
    const handleClose = () => setOpen(false);
    const [member, setMember] = useState({
        name: "",
        email: "",
        facebooklink: "",
        linkedin_link: "",
        twitterlink: ""
    })
    const [image, setImage] = useState("")
    const [previmage, setPrevimage] = useState("")
    const handlechange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
        setPrevimage(URL.createObjectURL(file));
    }
    const uploadimage = async()=>{
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset", "real_estate_profile");
        dispatch(setUpdateloading())
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dvshyja15/image/upload', {
              method: 'POST',
              body: data,
            });
            const result = await response.json();
            return result.secure_url;
        } catch (error) {
           toast.error(error)
        } finally{
            dispatch(setUpdateloading(false));
        }
    }

    const handledelete = (id)=>{
        setItemid(id)
        dispatch(Delete_Team_Member(id))
    }
    const handleupdate = async(e)=>{
        e.preventDefault()
        if(team.image !== image){
            const url = await uploadimage();
        member.image = url;
        dispatch(Update_Team_Member(itemid,member,handleClose))
    }
    member.image = image;
    dispatch(Update_Team_Member(itemid,member,handleClose))
    }
    useEffect(()=>{
        setMember({
            name: team?.name,
            email: team?.email,
            facebooklink: team?.facebooklink,
            linkedin_link: team?.linkedin_link,
            twitterlink: team?.twitterlink,
        })
        setImage(team?.image)
    },[team])
    useEffect(()=>{
      dispatch(Fetch_Team_Members());
    },[dispatch])

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
          <form action="" className="formm max-w-4xl mx-auto space-y-4" onSubmit={handleupdate}>
            <img src={previmage ? previmage : image} className=' w-12 h-12 rounded-full object-cover m-auto my-4' alt=''/>
        <div>
        <input
          type="text"
          name="name"
          value={member.name}
          onChange={(e)=>setMember({...member, name:e.target.value})}
          placeholder="Enter Member name"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="email"
          value={member.email}
          onChange={(e)=>setMember({...member, email:e.target.value})}
          placeholder="Enter Member Email"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="linkedin_link"
          value={member.linkedin_link}
          onChange={(e)=>setMember({...member, linkedin_link:e.target.value})}
          placeholder="Enter linked in profile link !optional"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="facebooklink"
          value={member.facebooklink}
          onChange={(e)=>setMember({...member, facebooklink:e.target.value})}
          placeholder="Enter Facebook profile link !optional"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="twitterlink"
          value={member.twitterlink}
          onChange={(e)=>setMember({...member, twitterlink:e.target.value})}
          placeholder="Enter Twitter profile link !optional"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
      <input type="file"
       onChange={handlechange}
        className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
         
          <Button variant='contained' sx={{background:"#1e2939"}} onClick={handleupdate}>
            
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
        </form>
          {/* </form> */} <br />
      </Box> 
      </Modal>    
    

        <div className="agents">
        <div className="recent-proerties">
          <div className="wrapper">
            <h2 className="text-center my-6 font-[800] text-3xl font-sans">All Users</h2>
    {teamloading ? (<Loader/>):(
           <div className="font-[sans-serif] overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
           <table className="min-w-full bg-white">
             <thead className="whitespace-nowrap">
               <tr>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Profile
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   creator
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Social Media
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Actions
                 </th>
               </tr>
             </thead>
             <tbody className="whitespace-nowrap">
               {teams?.length>0 && teams?.map((item,index)=>{
                 return (
                   <tr key={index} className="">
                 <td className="p-4 text-sm">
                   <div className="flex items-center cursor-pointer w-max">
                     <img src={item.image} className="w-12 h-12 rounded-full shrink-0 object-cover" />
                     <div className="ml-4">
                       <p className="text-sm text-black">{item.name}</p>
                       <p className="text-xs text-gray-500 mt-0.5">{item.email}</p>
                     </div>
                   </div>
                 </td>
                 <td className="p-4 text-sm">
                   <div className="flex items-center cursor-pointer w-max">
                     <img src={item.poster.profile} className="w-12 h-12 rounded-full shrink-0 object-cover" />
                     <div className="ml-4">
                       <p className="text-sm text-black">{item.poster.name}</p>
                       <p className="text-xs text-gray-500 mt-0.5">{item.poster.email}</p>
                     </div>
                   </div>
                 </td>
                 <td className="p-4 text-sm uppercase">
                    <div className=" flex items-center gap-4 justify-start mt-4">
                        <span><FacebookOutlined sx={{"&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in-out"}}/></span>
                        <span><Twitter sx={{"&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in-out"}}/></span>
                        <span><LinkedIn sx={{"&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in-out"}}/></span>
                    </div>
                 </td>
                 <td className="p-4">
                   <button className="mr-4" title="Edit" onClick={()=>handleOpen(item._id,item)}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
                       <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
                       <path d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z" data-original="#000000" />
                     </svg>
                   </button>
                     <button title="Delete" onClick={()=>handledelete(item._id)}>
                  {(teamdelloading && item._id === itemid) ? (<Spinnerr/>):(
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

export default All_Team_Member