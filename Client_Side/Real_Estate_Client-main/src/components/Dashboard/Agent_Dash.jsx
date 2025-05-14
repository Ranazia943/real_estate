/* eslint-disable react/prop-types */

import { FacebookOutlined, LinkedIn, Twitter } from "@mui/icons-material"
import { ShoppingCart, Package, Users, Archive, Edit } from "lucide-react"
import { Link } from "react-router-dom"
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Update_Profile } from "../../redux/action/userAction";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { setUpdateLoading } from "../../redux/slice/userSlice";
const Agent_Dash = ({user}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {updateloading} = useSelector((state)=>state.User);
    const dispatch = useDispatch();
    const [updatedata, setUpdatedata] = useState({
        name:"", 
        email:"", 
        address:"", 
        phone:"", 
        role:"",
        agent_type:"",
        facebook_link:"",
        twitter_link:"",
        linkedin_link:"",
        agent_experience:"",
        yourself:""
    })
    const [profile, setProfile] = useState("")
    useEffect(()=>{
        setUpdatedata({
            name:user?.name,
            email:user?.email,
            address:user?.address,
            phone:user?.phone,
            role:user?.role,
            agent_type:user?.agent_type,
            facebook_link:user?.facebook_link,
            twitter_link:user?.twitter_link,
            linkedin_link:user?.linkedin_link,
            agent_experience:user?.agent_experience,
            yourself:user?.yourself
        })
        setProfile(user?.profile)
    },[user?.address, user?.agent_experience, user?.agent_type, user?.email, user?.facebook_link, user?.linkedin_link, user?.name, user?.phone, user?.role, user?.twitter_link, user?.yourself, user?.profile])

    const handlechange = (e) => {
        const file = e.target.files[0];
        setProfile(file);
    }

    const uploadProfile = async () => {
        dispatch(setUpdateLoading())
        const formData = new FormData();
        formData.append('file', profile);
        formData.append('upload_preset', 'real_estate_profile');
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dvshyja15/image/upload', {
            method: 'POST',
            body: formData,
          });
          const url = await response.json();
          return setProfile(url.secure_url);
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(setUpdateLoading(false))
      }
    }

    const handleupdate = async (e) => {
        e.preventDefault();
        if(profile !== user?.profile){
            await uploadProfile();            
        }
        updatedata.profile = profile;
        dispatch(Update_Profile(updatedata, close))
    }
  return (
    <div>
         <Modal opened={opened} onClose={close} title="Update Profile" centered>
            <form action="" className=' space-y-4' onSubmit={handleupdate}>
                <img src={profile} className=" w-12 h-12 rounded-full object-cover m-auto my-4" alt="" />
            <input type="text" placeholder="Enter Name" value={updatedata.name} onChange={(e)=>setUpdatedata({...updatedata,name:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="email" placeholder="Enter Email" value={updatedata.email} onChange={(e)=>setUpdatedata({...updatedata,email:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Address" value={updatedata.address} onChange={(e)=>setUpdatedata({...updatedata,address:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" value={updatedata.phone} onChange={(e)=>setUpdatedata({...updatedata,phone:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" value={updatedata.yourself} onChange={(e)=>setUpdatedata({...updatedata,yourself:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" value={updatedata.agent_experience} onChange={(e)=>setUpdatedata({...updatedata,agent_experience:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" value={updatedata.facebook_link} onChange={(e)=>setUpdatedata({...updatedata,facebook_link:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" value={updatedata.twitter_link} onChange={(e)=>setUpdatedata({...updatedata,twitter_link:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" value={updatedata.linkedin_link} onChange={(e)=>setUpdatedata({...updatedata,linkedin_link:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
         <input type="file" onChange={handlechange}
        className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
        <div className=' mt-2'>
            <Button variant='contained' type='submit'>
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
                    "update"
                  )}
            </Button>
        </div>
            </form>
      </Modal>
          <div className="wrapper">
      <div className="div">
      <div className="w-full p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Items Sales Card */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-background p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-full bg-blue-100/50">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600">12% ↗</span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold">{user?.finance?.completedProperties}</h2>
            <p className="text-sm text-muted-foreground">Completed Properties</p>
          </div>
        </div>

        {/* New Orders Card */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-background p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-full bg-red-100/50">
              <Package className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">6% ↗</span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold">2</h2>
            <p className="text-sm text-muted-foreground">New Orders</p>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-background p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-full bg-amber-100/50">
              <Archive className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600">72% ↗</span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold">7459</h2>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </div>
        </div>

        {/* New Visitors Card */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-background p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-full bg-green-100/50">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600">150% ↗</span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold">5186</h2>
            <p className="text-sm text-muted-foreground">New Visitor</p>
          </div>
        </div>
      </div>
    </div>
      </div>

      <div className="detaal m-2 sm:m-4 md:m-10 border border-gray-200 bg-white shadow-lg p-4 rounded-md relative">
      <div className="absolute top-4 right-4">
                <Edit onClick={open}/>
            </div>
        <h2 className=" text-center my-6 font-[800] text-2xl">Agent Detail</h2>
        <div className=" space-y-6">
        <input type="text" value={user?.name} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" value={user?.email} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" value={user?.role} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" value={user?.agent_type} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" value={user?.address} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" value={user?.phone} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" value={user?.isverified===true ? "Verified":"unVerified"} disabled
        className={`px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 ${user?.isverified===true ? "text-green-500":"text-red-500"} border-blue-500 rounded`} />
       <div>
        <label className="text-lg font-[800]">Yourself</label>
       <textarea type="text" value={user?.yourself} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none min-h-40 border-b-2 border-blue-500 rounded" />
       </div>
        <div>
        <label className="text-lg font-[800]">Experience</label>
        <textarea type="text" value={user?.agent_experience} disabled
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none min-h-40 border-b-2 border-blue-500 rounded" />
        </div>
        <div className="social-media text-center">
            <h2 className=" text-xl font-[800] mb-4">Social Media</h2>
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
        </div>
      </div>
     </div>
    </div>
  )
}

export default Agent_Dash