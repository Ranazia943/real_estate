// import { AttachMoney } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Button } from '@mui/material';
import { setTeamLoading } from '../redux/slice/teamSlice';
import { Create_Team_member } from '../redux/action/teamAction';
import { useNavigate } from 'react-router-dom';

const Add_Team_Member = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {teamloading} = useSelector((state)=>state.Team);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [team, setTeam] = useState({
        name:"",
        email:"",
        linkedin_link:"",
        facebooklink:"",
        twitterlink:"",
    });
    const [image, setImage] = useState("");
    const [previmage, setPrevimage] = useState("");
    const handlechange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
        setPrevimage(URL.createObjectURL(file));
    }

        const uploadimage = async()=>{
            const data = new FormData();
            data.append("file",image);
            data.append("upload_preset", "real_estate_profile");
            dispatch(setTeamLoading())
            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dvshyja15/image/upload', {
                  method: 'POST',
                  body: data,
                });
                const url = await response.json();
                return url.secure_url;
              } catch (error) {
                console.log(error);
              } finally {
                dispatch(setTeamLoading(false))
              }
        }
        const handlesubmit = async(e)=>{
            e.preventDefault();
            if(image){
            const url = await uploadimage();
            team.image = url;
        }
        dispatch(Create_Team_member(team,navigate));
        }
  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">      
      <h2 className="text-center my-6 font-[800] text-3xl font-sans">Add Member</h2>  
      <div className="wrapper mx-2">
        <form action="" className="formm max-w-4xl mx-auto space-y-4" onSubmit={handlesubmit}>
            {previmage && (
                <img src={previmage} className=' w-12 h-12 rounded-full object-cover m-auto my-4' alt=''/>
            )}
        <div>
        <input
          type="text"
          name="name"
          value={team.name}
          onChange={(e)=>setTeam({...team, name:e.target.value})}
          placeholder="Enter Member name"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="email"
          value={team.email}
          onChange={(e)=>setTeam({...team, email:e.target.value})}
          placeholder="Enter Member Email"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="linkedin_link"
          value={team.linkedin_link}
          onChange={(e)=>setTeam({...team, linkedin_link:e.target.value})}
          placeholder="Enter linked in profile link !optional"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="facebooklink"
          value={team.facebooklink}
          onChange={(e)=>setTeam({...team, facebooklink:e.target.value})}
          placeholder="Enter Facebook profile link !optional"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          name="twitterlink"
          value={team.twitterlink}
          onChange={(e)=>setTeam({...team, twitterlink:e.target.value})}
          placeholder="Enter Twitter profile link !optional"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
      <input type="file"
       onChange={handlechange}
        className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
           <div className="mt-4">
        <Button type='submit' variant='contained' sx={{background:"#1e2939",width:"100%"}}>
            
  {teamloading ? (
    <>
      Submit
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
    "Submit"
  )}
        </Button>
      </div>
        </form>
      </div>
        </div>
    </div>
   </div>
   
  )
}

export default Add_Team_Member