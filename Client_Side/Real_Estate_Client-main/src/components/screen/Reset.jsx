import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { Reset_Password } from "../../redux/action/userAction";
import { useEffect, useState } from "react";

const Reset = () => {
    const {token} = useParams();
    const [newPassword, setNewPassword] = useState("");
    const {updateloading,user} = useSelector((state)=>state.User);
    const navigate = useNavigate();
     useEffect(()=>{
           if(user){
                navigate("/")
           }
        })
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(Reset_Password(newPassword, token));
  
    }
    return (
      <div className=" flex justify-center items-center min-h-screen bg-[url('/images/forgot1.jpg')]">
      <div className=" mx-2 w-full">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 font-[sans-serif] text-[#333] mt-4 border border-white shadow-md p-4 md:p-8 rounded-lg backdrop-blur-2xl">
          <h2 className=" text-2xl font-[800] text-center">Reset Password</h2>
    <input type="password" name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter Password" className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all" />
    <button type="submit" className="!mt-2 px-6 py-2.5 text-sm bg-[#333] hover:bg-[#222] text-white rounded-sm">
    {updateloading ? (
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
    ):"Submit"}
    </button>
  </form>
      </div>
  
      </div>
    )
  }
  
  export default Reset