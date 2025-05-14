import { FacebookOutlined, House, LinkedIn, Twitter } from "@mui/icons-material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Fetch_Team_Members } from "../redux/action/teamAction";
import Loader from "./Loader";

const Team = () => {
    const dispatch = useDispatch();
    const {teams,loading} = useSelector((state)=>state.Team);

    useEffect(()=>{
        dispatch(Fetch_Team_Members());
    },[dispatch])
  return (
    <div>
       {loading ? (<Loader/>):(
         <div className="wrapper">
         <div className="header relative h-[300px] bg-[url(https://tunatheme.com/tf/html/quarter-preview/quarter/img/bg/14.jpg)] bg-cover bg-no-repeat bg-center">
                   <div className=" text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
                     <h2 className=" md:text-3xl text-2xl lg:text-4xl mb-6 font-[800] text-black font-sans">Our Agents</h2>
                     <div className="">
                       <span><House sx={{color:"#ff5a3c",fontSize:"30px",marginBottom:"6px"}}/></span>
                       <span className=" text-black font-[600] font-sans text-lg">Home {">"} </span>
                       <span className=" font-[600] text-black font-sans text-lg">Team</span>
                     </div>
                   </div>
                 </div>
 
                 <div className="agents-wrapper mx-2 md:mx-4 my-20">
                     <div className="cards grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 grid max-w-6xl mx-auto">
                        {teams?.map((item,index)=>{
                         return(
                             <div key={index} className="max-[650px]:w-[350px] mx-auto max-[400px]:w-full card border hover:shadow-md duration-300">
                             <div className="img">
                                 <img src={item.image} className=" w-full" alt="" />
                             </div>
                             <div className=" text-center my-6">
                                 <h2 className=" text-xl font-[800]">{item.name}</h2>
                                 <div className=" flex items-center gap-4 justify-center mt-4">
                                     <span><FacebookOutlined sx={{"&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in-out"}}/></span>
                                     <span><Twitter sx={{"&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in-out"}}/></span>
                                     <span><LinkedIn sx={{"&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in-out"}}/></span>
                                 </div>
                             </div>
                         </div>
                         )
                        })}
                     </div>
                 </div>
 
         </div>
       )}
     </div>
  )
}

export default Team