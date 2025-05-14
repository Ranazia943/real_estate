import { BathtubOutlined, BedOutlined, ControlPointOutlined, DisabledByDefault, FavoriteBorder, LocationOnOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Fetch_Features_Property } from "../../redux/action/propertyAction";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { Create_WhishItem } from "../../redux/action/whishAction";
import Spinnerr from "../Spinnerr";



const Featured_listing = () => {
    const {features_properties,feat_p_loading} = useSelector((state)=>state.Property);
    const {createwhishloading} = useSelector((state)=>state.Whish);
    const dispatch = useDispatch();
    const [itemid, setItemid] = useState()

    useEffect(()=>{
        dispatch(Fetch_Features_Property())
    },[dispatch])

    const handleCreate = (item)=>{
        setItemid(item._id)
        const whishitem = {
            propertyid: item._id,
            title: item.title,
            beds: item.rooms,
            baths: item.bathrooms,
            category: item.category,
            image: item.images[0],
            location: item.location.address,
            size: item.size,
            price: item.price
        }
        dispatch(Create_WhishItem(whishitem))
    }
        
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     initialSlide: 0,
        
    //     responsive: [
    //       {
    //         breakpoint: 1440,
    //         settings: {
    //           slidesToShow: 4,
    //           slidesToScroll: 1,
    //           infinite: true,
    //           dots: true
    //         }
    //       },
    //       {
    //         breakpoint: 1280,
    //         settings: {
    //           slidesToShow: 3,
    //           slidesToScroll: 1,
    //           infinite: true,
    //           dots: true
    //         }
    //       },
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 1,
    //           infinite: true,
    //           dots: true
    //         }
    //       },
    //       {
    //         breakpoint: 650,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1,
    //           initialSlide: 1
    //         }
    //       },
          
    //     ]
    //   };
  return (
    
    <div>
        <div className="wrapper my-20">
            <div className="header text-center">
            <h2 className=" px-4 py-1 bg-[#F5DFDC] inline-block rounded-full text-[#FF5A3C]">Properties</h2>
            <h2 className=" text-3xl md:text-4xl lg:text-5xl mt-4 font-[800]">Featured Properties</h2>
            </div>
           {feat_p_loading ? (<Loader/>):(
             <div className="card-wrapper mx-4 mt-10">
             <div className=" cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                 {features_properties?.slice(0,3).map((prop,index)=>{
                     return(
                         <div data-aos="fade-down"  data-aos-delay={`${index*100}`} data-aos-duration="1000" key={index} className="card group overflow-hidden border-gray-200 border">
                    <Link to={`/detail/${prop._id}`}>
                    <div className="img relative before:absolute before:h-16 before:w-full before:bottom-0 before:bg-gradient-to-b before:from-[rgba(0,0,0,0)] before:to-[rgba(0,0,0,0.8)] before:z-20 overflow-hidden">
                     <img src={prop?.images[0]} className=" w-full group-hover:scale-105 duration-300" alt="" />
                     <div className="absolute bottom-2 z-40 left-[50%] w-[80%] translate-x-[-50%]">
                         <p className=" text-white"><LocationOnOutlined/> {prop.location.address}</p>
                     </div>
                     </div>
                    </Link>

                     <div className=" p-4">
                     <h2 className=' text-xl font-[700] font-sans text-[#ff5a3c]'>${`${prop.price} ${prop.category==="rent"? <span className=' font-[400] text-base'>/Month</span>:""}`}</h2>
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
                                 <span className=" p-1 bg-gray-200" onClick={()=>handleCreate(prop)}>{(createwhishloading && itemid===prop._id) ? (<Spinnerr/>):(<FavoriteBorder sx={{color:"black"}}/>)}</span>
                                 <span className=" p-1 bg-gray-200"><ControlPointOutlined sx={{color:"black"}}/></span>
                             </div>
                         </div>
                     </div>
                 </div>
                     )
                 })}
             </div>
            {features_properties?.length>3 && (
              <div className=" text-center my-8">
             <Link to="/featured-properties">
             <Button variant="contained">see More</Button>
             </Link>
          </div>
            )}
         </div>
           )}
        </div>
    </div>
  )
}

export default Featured_listing