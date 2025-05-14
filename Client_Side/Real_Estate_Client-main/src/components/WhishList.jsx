import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Delete_WhishItem, My_WhishhItems } from "../redux/action/whishAction";
import { Link } from "react-router-dom";
import { BathtubOutlined, BedOutlined, Delete, DisabledByDefault, LocationOnOutlined } from "@mui/icons-material";
import Loader from "./Loader";
import Spinnerr from "./Spinnerr";

const WhishList = () => {
    const {whishloading,my_whishlist,whishdelloading} = useSelector((state)=>state.Whish);
    const dispatch = useDispatch();
    const [itemid ,setItemid] = useState("");

    const handledelete = (id)=>{
        setItemid(id);
        dispatch(Delete_WhishItem(id))
    }


    useEffect(()=>{
        dispatch(My_WhishhItems())
    },[dispatch])
  return (
    <div>
        <div className="wrapper">
      {whishloading ? (<Loader/>): my_whishlist?.length===0 ? (<div className=" flex justify-center items-center h-[80vh]">
        <p className=' text-center text-xl font-[800]'>No Properties found.</p>
      </div>):(
          <div className=" cards grid grid-cols-1 my-20 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {my_whishlist?.map((prop,index)=>{
              return(
                  <div data-aos="fade-down"  data-aos-delay={`${index*100}`} data-aos-duration="1000" key={index} className="card group overflow-hidden border-gray-200 border relative">
                    <div className=" absolute top-2 right-2 z-50 cursor-pointer">
                        <span onClick={()=>handledelete(prop._id)}>{(whishdelloading && itemid===prop._id) ? (<Spinnerr/>):(<Delete/>)}</span>
                    </div>
             <Link to={`/detail/${prop.propertyid}`}>
             <div className="img relative before:absolute before:h-16 before:w-full before:bottom-0 before:bg-gradient-to-b before:from-[rgba(0,0,0,0)] before:to-[rgba(0,0,0,0.8)] before:z-20 overflow-hidden">
              <img src={prop.image} className=" w-full group-hover:scale-105 duration-300" alt="" />
              <div className="absolute bottom-2 z-40 left-[50%] w-[80%] translate-x-[-50%]">
                  <p className=" text-white"><LocationOnOutlined/> {prop.location}</p>
              </div>
              </div>
             </Link>

              <div className=" p-4">
              <h2 className=' text-xl font-[700] font-sans text-[#ff5a3c]'>${`${prop.price} ${prop.category==="rent"? <span className=' font-[400] text-base'>/Month</span>:""}`}</h2>
                  <h2 className=" text-xl font-[600] text-black my-3 line-clamp-1 font-sans">{prop.title}</h2>
                  <p className=" text-gray-500 font-[300] text-[16px] line-clamp-1 font-sans mt-2">{prop.description}</p>
                  <div className=" mt-6 grid grid-cols-3 pb-4">
                      <div className=" sec-1 border-r-2 text-black">
                          <p className=" flex items-center">{prop.beds} <span className=" ml-2"><BedOutlined sx={{color:"#6b7280"}}/></span></p>
                          <p className=" text-sm font-[300] text-[#6b7280] font-sans">Bedrooms</p>
                      </div>
                      <div className=" sec-1 border-r-2 pl-2 text-black">
                          <p className=" flex items-center">{prop.baths} <span className=" ml-2"><BathtubOutlined sx={{color:"#6b7280"}}/></span></p>
                          <p className=" text-sm font-[300] text-[#6b7280] font-sans">Bathrooms</p>
                      </div>
                      <div className=" sec-1 pl-2 text-black">
                          <p className=" flex items-center">{prop.size} <span className=" ml-2"><DisabledByDefault sx={{color:"#6b7280"}}/></span></p>
                          <p className=" text-sm font-[300] text-[#6b7280] font-sans">square Fit</p>
                      </div>
                  </div>
              </div>
          </div>
              )
          })}
      </div>
      )}
        </div>
    </div>
  )
}

export default WhishList