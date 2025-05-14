import { Cancel, FacebookOutlined, FilterList, LaunchOutlined, LinkedIn, Twitter } from "@mui/icons-material"
import { Rating } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Fetch_Agents } from "../redux/action/userAction"
import { Link } from "react-router-dom"
import Loader from "./Loader"


const categories = [
    "rental","dual","commercial","individual"
]
const Agents = () => {
    const {agents,agentloading} = useSelector((state)=>state.User);
    const dispatch = useDispatch();
    const [agent_type, setAgent_Type] = useState("");

    const clearfilter = ()=>{
        setAgent_Type("");
    }

    useEffect(()=>{
        dispatch(Fetch_Agents(agent_type));
    },[dispatch,agent_type])
  return (
    <div>
        <div className="wrapper">
        <div className="grid-layout-wrapper min-h-screen max-w-6xl mx-auto p-2 my-20">
        <div className=' w-[200px] relative mb-6 flex justify-center items-center gap-2'>
                    <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <FilterList/>
                    </div>
                    <select name="" id="" value={agent_type} onChange={(e)=>setAgent_Type(e.target.value)} className='border outline-none bg-white border-gray-200 rounded-md h-12 w-full pl-6'>
                        <option>Sort category</option>
                        {categories.map((a)=>{
                            return (
                                <option key={a} value={a}>{a}</option>
                            )
                        })}
                    </select>
                    {agent_type && (
                        <div>
                        <Cancel onClick={clearfilter}/>
                    </div>
                    )}
                </div>
                <div className="sec-2 w-full">
                  {agentloading ? (<Loader/>): agents?.length===0 ? (<div className=" flex justify-center items-center h-[40vh]">
                  <h2 className="text-2xl font-[800] font-sans">No agents found</h2>
                  </div>):(
                      <div className="wrapper">
                      <div className="cards max-sm:w-[300px] m-auto grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                        {agents?.map((agent,index)=>{
                          return(
                              <div key={index} className="card px-10 border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 p-2 rounded-md md:p-4 relative duration-300 group">
                                <div className="absolute bottom-2 bg-transparent right-2 group-hover:shadow-md group-hover:scale-125">
                                    <Link to={`/agent-detail/${agent._id}`}>
                                    <LaunchOutlined sx={{":hover":{transition:"all 0.2s ease-in-out"},cursor:"pointer"}}/>
                                    </Link>
                                </div>
                              <div className="profile flex justify-center gap-2 items-center">
                                  <img src={agent.profile} className=" w-28 h-28 rounded-full object-cover" alt="" />
                                  <div>
                                      <p className=" text-sm font-[400] font-sans text-gray-600">{agent.name}</p>
                                      <p className=" uppercase text-sm font-[400] font-sans text-gray-600">{agent.agent_type}</p>
                                  </div>
                              </div>
                              <div className="content text-center mt-4">
                                  <h2 className=" text-2xl font-sans font-[700]">Social Media</h2>
                                  <div className="space-x-4">
                                   <Link>
                                   <FacebookOutlined sx={{":hover":{color:"blue",transition:"all 0.2s ease"}}}/>
                                   </Link>
                                   <Link>
                                   <Twitter sx={{":hover":{color:"blue",transition:"all 0.2s ease"}}}/>
                                   </Link>
                                   <Link>
                                   <LinkedIn sx={{":hover":{color:"blue",transition:"all 0.2s ease"}}}/>
                                   </Link>
                                   </div>
                              </div>
                              <div className="rating flex justify-center gap-2 mt-4 items-center">
                                <Rating value={4} readOnly/>
                              </div>
                          </div>
                          )
                        })}
                      </div>
                  </div>
                  )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Agents