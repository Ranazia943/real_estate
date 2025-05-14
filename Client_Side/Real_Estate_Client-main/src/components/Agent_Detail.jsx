import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { Fetch_Agent } from "../redux/action/userAction";
import Loader from "./Loader";
import { CreateSellerContact } from "../redux/action/sellerAction";
import { Button } from "@mui/material";

const Agent_Detail = () => {
    const {id} = useParams();
    const {agent,agentloading} = useSelector((state)=>state.User);
    const {createloading} = useSelector((state)=>state.Seller);
    const dispatch = useDispatch();
    const [seller, setSeller] = useState({
        name:"",
        email:"",
        phone:Number,
        experience:"",
        message:"",
    })
    const handlesubmit = (e)=>{
        e.preventDefault();
        dispatch(CreateSellerContact(agent?._id,seller))
        setSeller({
            name:"",
            email:"",
            phone:"",
            experience:"",
            message:"",
        })
    }

    useEffect(()=>{
        dispatch(Fetch_Agent(id))
    },[dispatch,id])
  return (
    <div>
  {agentloading ? (<Loader/>):(
        <div className="main-wrapper">
        {/* <div className="header relative h-[300px] bg-[url(https://tunatheme.com/tf/html/quarter-preview/quarter/img/bg/14.jpg)] bg-cover bg-no-repeat bg-center">
                    <div className=" w-[250px] text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
                      <h2 className=" text-4xl mb-6 font-[800] text-black font-sans uppercase">{agent?.role}</h2>
                      <div className=" flex justify-start items-center gap-2">
                        <span><House sx={{color:"#ff5a3c",fontSize:"30px"}}/></span>
                        <span className=" text-black font-[600] font-sans text-lg">Home {">"} </span>
                        <span className=" font-[600] text-black font-sans text-lg">Agent detail</span>
                      </div>
                    </div>
                  </div> */}
  
                  <div className="bg-[url('https://image.cnbcfm.com/api/v1/image/107170924-1671814758423-gettyimages-802893644-dsc_6710.jpeg?v=1672329075&w=1920&h=1080')] bg-cover bg-center bg-no-repeat py-10 bg-fixed">
                  <div className="wrapper mx-2 md:mx-4 mt-10 mb-20">
                      <div className="detail max-w-5xl mx-auto p-2 backdrop-blur-3xl pb-10 rounded-lg relative">
                                  <div className={` absolute top-6 right-6 inline-block px-4 py-1 rounded-sm ${agent?.isverified===true ? "bg-green-500 text-white":"bg-red-500 text-white"} font-[600]`}>{agent?.isverified===true ? "Verified":"unVerified"}</div>
                          <div className=" w-full sm:w-[80%] m-auto flex justify-center items-center text-center">
                          <div className="profile mt-8 relative">
                              <div className="img4">
                              <img src={agent?.profile} className="w-[200px] m-auto h-[200px] rounded-full object-cover" alt="" />
                              </div>
                              <div className="content mt-6">
                                  <p className=" font-[800]">{agent?.name}</p>
                                  <p className=" font-[800]">{agent?.email}</p>
                                  <p className=" font-[400] mt-2">{agent?.yourself}</p>
                              </div>
                          </div>
                          </div>
  
                          <div className="content md:mx-14 sm:mx-10 mx-0 lg:mx-20 mt-20">
                              {/* <div className=" space-x-2">
                              <span className=" text-xl font-[700] font-sans mt-4">Agent Type :</span>
                              <span className=" text-gray-700 uppercase font-[400]">{agent?.agent_type}</span>
                              </div> */}
                              <h2 className=" mt-2 md:text-3xl text-2xl lg:text-4xl font-[700] font-sans mb-6">Agent Experience :</h2>
                              <p>{agent?.agent_experience}</p>
                          </div>

                          <div className="explain md:mx-14 sm:mx-10 mx-0 lg:mx-20 mt-4">
                              <h2 className=" mt-4 md:text-3xl text-2xl lg:text-4xl font-[700] font-sans mb-6">Note :</h2>
                              <p>If you are sell your property through agent on this platform then you give all information about property like proerty images, location, amenities, and etc after submit form and then agent will contact locally with you.</p>
                          </div>
                          <h2 className=" text-center text-2xl font-sans font-[700] mt-6">If your interested then apply</h2>
                          <div className="formm mt-10 md:mx-14 sm:mx-10 mx-0 lg:mx-20 p-4 bg-black rounded-md text-white">
                            <h2 className=" text-2xl font-[700] font-sans text-center">Fill this form </h2>
                            <form action="" onSubmit={handlesubmit}>
                                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div className="input w-full relative">
                                    <label className=" text-lg font-[400]">Name</label>
                                    <input type="text" placeholder="Enter Name" value={seller.name} onChange={(e)=>setSeller({...seller,name:e.target.value})} className=" w-full border-2 border-gray-100 outline-none h-14 pl-4" />
                                </div>
                                 <div className="input w-full relative">
                                    <label className=" text-lg font-[400]">Email</label>
                                    <input type="text" value={seller.email} onChange={(e)=>setSeller({...seller,email:e.target.value})} placeholder="Enter contact email" className=" w-full border-2 border-gray-100 outline-none h-14 pl-4" />
                                </div>
                                 <div className="input w-full relative">
                                    <label className=" text-lg font-[400]">Phone</label>
                                    <input type="text" value={seller.phone} onChange={(e)=>setSeller({...seller,phone:e.target.value ? parseInt(e.target.value, 10) : ""})} placeholder="Enter contact Phone number" className=" w-full border-2 border-gray-100 outline-none h-14 pl-4" />
                                </div>
                                 <div className="input w-full relative">
                                    <label className=" text-lg font-[400]">Your Experience</label>
                                    <select name="" value={seller.experience} onChange={(e)=>setSeller({...seller,experience:e.target.value})} className="w-full h-14 border-2 bg-black border-gray-100" id="">
                                        <option value="">Select Experience</option>
                                        <option value="first-time">First-time sell</option>
                                        <option value="have experience">Have experience</option>
                                    </select>
                                </div>
                                </div>
                                <div className=" relative w-full mt-4">
                                    <label className=" text-lg font-[400]">Enter Detail</label>
                                    <textarea value={seller.message} onChange={(e)=>setSeller({...seller,message:e.target.value})} className=" w-full h-32 border-2 p-4 border-gray-100 outline-none" placeholder="Enter Detail of property"></textarea>
                                </div>
                                <div className=" text-center my-4 ">
                                    <Button type="submit" variant="contained" sx={{background:"#F59E0B",color:"white"}}>
                                    {createloading ? (
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
                                    </Button>
                                </div>
                            </form>
                          </div>
                      </div>
                  </div>
                  </div>
        </div>
  )}
    </div>
  )
}

export default Agent_Detail