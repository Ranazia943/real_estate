import { BathtubOutlined, BedOutlined, ControlPointOutlined, DisabledByDefault, FavoriteBorder, LocationOnOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import { Link } from "react-router-dom"
import { Fetch_Features_Property } from "../redux/action/propertyAction"
import { useEffect } from "react"


const Featured_Properties = () => {
    const {features_properties,feat_p_loading} = useSelector((state)=>state.Property)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(Fetch_Features_Property())
    },[dispatch])
  return (
    <div>
        {feat_p_loading ? (<Loader/>):(
             <div className="card-wrapper mx-4 my-10">
             <div className=" cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                 {features_properties?.map((prop,index)=>{
                     return(
                         <div key={index} className="card group overflow-hidden border-gray-200 border">
                    <Link to={`/detail/${prop._id}`}>
                    <div className="img relative before:absolute before:h-16 before:w-full before:bottom-0 before:bg-gradient-to-b before:from-[rgba(0,0,0,0)] before:to-[rgba(0,0,0,0.8)] before:z-20 overflow-hidden">
                     <img src={prop?.images[0]} className=" w-full group-hover:scale-105 duration-300" alt="" />
                     <div className="absolute bottom-2 z-40 left-[50%] w-[80%] translate-x-[-50%]">
                         <p className=" text-white"><LocationOnOutlined/> {prop.location.address}</p>
                     </div>
                     </div>
                    </Link>

                     <div className=" p-4">
                         <h2 className=" text-[#FF5A3C]"><span className=" text-lg font-[600]">$10,000/</span><span className="text-sm font-[300]">Month</span></h2>
                         <h2 className=" text-xl font-[600] text-black my-3 line-clamp-1 font-sans">{prop.title}</h2>
                         <p className=" text-gray-500 font-[300] text-[16px] line-clamp-1 font-sans mt-2">{prop.description}</p>
                         <div className=" mt-6 grid grid-cols-3 pb-4">
                             <div className=" sec-1 border-r-2 text-black">
                                 <p className=" flex items-center">{prop.rooms} <span className=" ml-2"><BedOutlined sx={{color:"#6b7280"}}/></span></p>
                                 <p className=" text-sm font-[300] text-[#6b7280] font-sans">Bedrooms</p>
                             </div>
                             <div className=" sec-1 border-r-2 pl-2 text-black">
                                 <p className=" flex items-center">{prop.bathrooms} <span className=" ml-2"><BathtubOutlined sx={{color:"#6b7280"}}/></span></p>
                                 <p className=" text-sm font-[300] text-[#6b7280] font-sans">Bathrooms</p>
                             </div>
                             <div className=" sec-1 pl-2 text-black">
                                 <p className=" flex items-center">{prop.size} <span className=" ml-2"><DisabledByDefault sx={{color:"#6b7280"}}/></span></p>
                                 <p className=" text-sm font-[300] text-[#6b7280] font-sans">square Fit</p>
                             </div>
                         </div>
                         <hr />
                         <div className=" flex justify-between items-center mx-2 mt-4">
                             <div className="profile flex justify-center gap-2 items-center">
                                 <img src={prop.property_poster.profile} className=" w-10 h-10 rounded-full object-cover" alt="" />
                                 <div>
                                     <p className=" text-sm font-[600] text-gray-400 font-sans">{prop.property_poster.name}</p>
                                     <p className=" text-xs text-gray-400 font-sans">{prop.property_poster.email}</p>
                                 </div>
                             </div>
                             <div className="icons flex items-center gap-2">
                                 <span className=" p-1 bg-gray-200"><FavoriteBorder sx={{color:"black"}}/></span>
                                 <span className=" p-1 bg-gray-200"><ControlPointOutlined sx={{color:"black"}}/></span>
                             </div>
                         </div>
                     </div>
                 </div>
                     )
                 })}
             </div>
         </div>
        )}
    </div>
  )
}

export default Featured_Properties