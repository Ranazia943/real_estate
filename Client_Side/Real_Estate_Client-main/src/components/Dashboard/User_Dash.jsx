/* eslint-disable react/prop-types */
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Update_Profile } from '../../redux/action/userAction';

const User_Dash = ({user}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {updateloading} = useSelector((state)=>state.User);
    const dispatch = useDispatch();
    const [updatedata, setUpdatedata] = useState({
        name:"",
        email:"",
        address:"",
        phone:"",
        role:"",
    })
    const [profile, setProfile] = useState("");
    useEffect(()=>{
        setUpdatedata({
            name:user?.name,
            email:user?.email,
            address:user?.address,
            phone:user?.phone,
            role:user?.role,
       })
        setProfile(user?.profile);
    },[user?.address, user?.email, user?.isverified, user?.name, user?.phone, user?.role,user?.profile])
    const handleupdate = (e)=>{
        e.preventDefault();
        updatedata.profile = profile;
        dispatch(Update_Profile(updatedata,close))
    }
  return (
    <div>
          <Modal opened={opened} onClose={close} title="Update Profile" centered>
            <form action="" className=' space-y-4' onSubmit={handleupdate}>
            <input type="text" placeholder="Enter Name" value={updatedata?.name} onChange={(e)=>setUpdatedata({...updatedata,name:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="email" placeholder="Enter Email" value={updatedata?.email} onChange={(e)=>setUpdatedata({...updatedata,email:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Address" value={updatedata?.address} onChange={(e)=>setUpdatedata({...updatedata,address:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" value={updatedata?.phone} onChange={(e)=>setUpdatedata({...updatedata,phone:e.target.value})}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
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
        <div className="m-2 sm:m-4 md:m-10 relative border border-gray-200 rounded-md md:p-4 p-2 shadow-md">
            <div className="absolute top-4 right-4">
                <Edit onClick={open}/>
            </div>
            <h2 className=" text-2xl font-[800] text-center my-6">User Detail</h2>
        <div className=" space-y-4">
        <input type="text" placeholder="Enter Name" disabled value={user?.name}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Email" disabled value={user?.email}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Role" disabled value={user?.role}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Address" disabled value={user?.address}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
        <input type="text" placeholder="Enter Phone" disabled value={user?.phone}
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
           <input type="text" value={user?.isverified===true ? "Verified":"unVerified"} disabled
        className={`px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 ${user?.isverified===true ? "text-green-500":"text-red-500"} border-blue-500 rounded`} />
        </div>
        </div>
    </div>
  )
}

export default User_Dash