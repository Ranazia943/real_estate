import { Bed, CalendarMonth, Chat,House, MobileFriendlyRounded, Person, Place, Shower } from '@mui/icons-material'
import { Button, Rating } from '@mui/material'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Create_Ratingg, Fetch_Properties, Fetch_Property } from '../redux/action/propertyAction';
import Loader from './Loader';
import Starr from './Starr';
import { CreatePropertyContact } from '../redux/action/propertyContactAction';
import { toast } from 'react-toastify';



const Property_detail = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
        // initialSlide: 0,
    }
    const {id} = useParams();
    const {property,properties,propertyloading,createloading} = useSelector((state)=>state.Property);
    const {pccreateloading} = useSelector((state)=>state.PropertyContact);
    const {user} = useSelector((state)=>state.User);
    const dispatch = useDispatch();
    const [related, setRelated] = useState([]);

    useEffect(()=>{
      dispatch(Fetch_Property(id))
      dispatch(Fetch_Properties())
    },[dispatch,id])

    useEffect(()=>{
      const relate = properties?.filter((item)=>item?.location?.address === property?.location?.address && item._id !== property._id);
      setRelated(relate)
    },[properties,property])
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [contactmessage, setContactmessage] = useState("");

    const handlecontact = (e) => {
      e.preventDefault();
      if(!user){
        navigate("/login")
        toast.error("Please Login First");
        return
      }
      const data = {
        name,
        phone,
        contactmessage
      }
      dispatch(CreatePropertyContact(id,data))
    }


    const submitrating = (e) => {
      e.preventDefault();
      const ratingg = {
        rating,
        message
      }
      dispatch(Create_Ratingg(id,ratingg));
    };


    
  return (
    <div>
   {propertyloading ? (<Loader/>):(
      <div>
      <div className="header relative h-[300px] bg-[url(https://tunatheme.com/tf/html/quarter-preview/quarter/img/bg/14.jpg)] bg-cover bg-no-repeat bg-center">
                   <div className=" text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
                     <h2 className=" md:text-3xl text-2xl lg:text-4xl mb-6 font-[800] text-black font-sans">Property Detail</h2>
                     <div className="">
                       <span><House sx={{color:"#ff5a3c",fontSize:"30px"}}/></span>
                       <span className=" text-black font-[600] font-sans text-lg">Home {">"} </span>
                       <span className=" font-[600] text-black font-sans text-lg">Detail</span>
                     </div>
                   </div>
                 </div>
 
                 <div className="detail-wrapper max-w-[1200px] mx-auto">
                     <div className="sub-wrapper">
                         <div className="images slider-slick w-full mt-10 mb-20 text-black">
                             <Slider {...settings}>
                                 {property?.images.map((a)=>{
                                     return (
                                         <div key={a} className="image-wrapper w-full">
                                             <img src={a} alt="image" className=' w-full h-autos md:h-[500px] object-cover'/>
                                         </div>
                                     )
                                 })}
                             </Slider>
                             {/* <h2>images</h2> */}
                         </div>
                         <div className="grid-layout flex max-[850px]:flex-col gap-2 mx-4 mt-20 mb-10">
                             <div className="sec-1 w-full min-[850px]:w-[70%]">
                               <div className="wrapper">
                                 <div className=' grid sm:grid-cols-4 grid-cols-2 gap-4 md:gap-8'>
                                   {property?.featured===true && <p className=' px-4 py-1 font-[400] bg-[#ff5a3c] text-white inline-block'>Featured</p>}
                                   <p className=' px-4 py-1 font-[400] bg-yellow-500 text-white inline-block'>For {property?.category}</p>
                                   <p className='text-font-[300] text-sm text-gray-500'><CalendarMonth sx={{color:"#ff5a3c"}}/> {property?.posteddate}</p>
                                   <p className='text-font-[300] text-sm text-gray-500'><Chat sx={{color:"#ff5a3c"}}/> {property?.reviews?.length} Comments</p>
                                 </div>
                                 <h2 className=' text-4xl font-[700] font-sans mt-8'>{property?.title}</h2>
                                  <p className=' font-[350] text-sm my-6 text-gray-600'><Place sx={{marginRight:"6px",color:"#ff5a3c"}}/> {property?.location?.address}</p>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#ff5a3c] font-sans mt-8'>Description</h2>
                                 <div className=' mt-6 property_detail'>
                                   <div dangerouslySetInnerHTML={{__html:property?.property_detail}}>
                                     
                                   </div>
                                 </div>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#ff5a3c] font-sans mt-8'>Property Detail</h2>
                                 <div className=' p-8 border sm:flex  items-start bg-[#F2F6F7] mt-6'>
                                   <div className=' space-y-4 w-full my-4 sm:w-1/2 sm:flex flex-col'>
                                     <p className='w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Property ID: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.propertyid}</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Home Area: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.size} ft</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Rooms: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.rooms}</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Baths: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.bathrooms}</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Property Status: <span className='font-[400] ml-10 text-lg text-black text-start'>For {property?.category}</span></p>
                                   </div>
                                   <div className=' space-y-4 w-full my-4 sm:w-1/2 sm:flex flex-col'>
                                     <p className='w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Build year: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.years_of_build}</span></p>
                                   </div>
                                 </div>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#ff5a3c] font-sans mt-8'>Location</h2>
                                 <div className="location mt-6">
                               <iframe src={property?.google_map_link} width="100%" height={500} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                 </div>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#ff5a3c] font-sans mt-8'>Customer reviews</h2>
                                 <div className="stars mt-4 flex items-center gap-4"> 
                                   <span><Starr stars={property?.rating}/></span><span className=' text-yellow-400 text-sm font-[400] font-sans'>({property?.reviews?.length} reviews)</span>
                                 </div>
                                 <div className="reviews-wrapper mt-16">
                                   <div className="sub-wrapper space-y-4">
                                    {property?.reviews?.length===0 ? (
                                      <h2 className=' text-center my-8 text-2xl font-[800]'>No Reviews yet</h2>
                                    ):property?.reviews?.map((r,index)=>{
                                     return(
                                       <div key={index} className="person flex max-sm:flex-col gap-2 md:gap-4 p-2 md:p-4">
                                       <div className="img w-[100px] sm:w-[150px]">
                                         <img src={r.profile} className=' sm:min-w-24 sm:min-h-24 h-24 w-24 rounded-full object-cover m-auto' alt="" />
                                       </div>
                                       <div>
                                         <div className=' flex mb-2 justify-between items-center'>
                                           <div className=' space-y-1 md:space-y-2'>
                                             <h2 className=' text-xl font-[700]'>{r.name}</h2>
                                             <Starr stars={r.rating}/>
                                           </div>
                                           <div>
                                             <span className=' px-3 md:px-6 border rounded-full border-gray-200 py-2 hover:bg-[#ff5a3c] duration-300 cursor-pointer transition-all text-gray-500 max-sm:text-sm hover:text-white'>{r.date.slice(0,10)}</span>
                                           </div>
                                         </div>
                                         <p className=' font-[350] font-sans'>{r.message}</p>
                                       </div>
                                     </div>
                                     )
                                    })}
                                   </div>
                                 </div>
                                 <div className="comments-wrapperr mt-12">
                                   <div className="sub-wrapper bg-[#F2F6F7] p-4 md:p-8">
                                     <h2 className=' text-2xl font-[800] font-sans'>Add Reviews</h2>
                                   
                                     <form className="formm mt-8 space-y-6" onSubmit={submitrating}>
                                     <div className=' mt-4 flex justify-start gap-4 items-center'>
                                     <h2 className=' text-xl font-[700] font-sans'>Your Rating : </h2>
                                     <span className=' mt-3'><Rating sx={{fontSize:"20px"}} value={rating} onChange={(event) => setRating(event.target.value)}/></span>
                                     </div>
                                       <div className="style">
                                         <textarea name="" id="" value={message} onChange={(e)=>setMessage(e.target.value)} className=' min-h-[100px] w-full bg-white p-4 focus:border-gray-200 outline-none focus:border-2' placeholder=' Type Here...'></textarea>
                                       </div>
                                       <div className=" mt-8 space-x-2 flex items-center">
                                 <input type="checkbox" name="" id="" />
                                 <label htmlFor="" className=" text-gray-500 font-[350] font-sans">Save my name, email, and website in this browser for the next time I comment.</label>
                             </div>
                             <button type='submit' className=" px-6 py-2 z-50 before:duration-300 overflow-hidden after:duration-300 transition-all after:-z-10 before:-z-10 hover:before:right-[-100%] hover:after:left-0  text-white relative before:bg-[#ff5a3c] before:absolute before:top-0 before:bottom-0 before:right-0 after:absolute after:top-0 after:bottom-0 after:left-[-100%] after:w-full after:h-full after:bg-black before:w-full before:h-full mt-6">
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
  ) : (
    "Submit"
  )}</button>
                                     </form>
                                   </div>
                                 </div>
 
                                 {related?.length>0 ? (<>
                                  <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#ff5a3c] font-sans mt-8'>Related Propertyies</h2>
                                 <div className="relative-wrapper mt-8">
                                   <div className="cards grid max-[550px]:grid-cols-1 grid-cols-2 gap-4">
                                   {related?.map((item,index)=>{
                                    return(
                                      <div key={index} className="card group shadow-md ">
                             <div className="img overflow-hidden">
                                 <img src={item.images[0]} className=' w-full group-hover:scale-110 duration-300 transition-all' alt="" />
                             </div>
                             <div className=' p-2 lg:p-6'>
                                 <p className=' text-xl font-[300] text-[#ff5a3c]'>For {item.category}</p>
                                 <Link href={`/detail/${item._id}`}>
                                 <h2 className='text-lg lg:text-2xl font-[700] mt-2 line-clamp-1 hover:text-[#ff5a3c] cursor-pointer'>{item.title}</h2>
                                 </Link>
                                 <p className=' font-[350] text-sm my-4 text-gray-600'><Place sx={{marginRight:"6px",color:"#ff5a3c"}}/> {item.location.address}</p>
                                 <p className=' space-x-4 font-[350] text-lg font-sans'><span className=' text-gray-600'>{item.rooms} <Bed sx={{color:"#ff5a3c"}}/></span><span className=' text-gray-600'>{item.bathrooms} <Shower sx={{color:"#ff5a3c"}}/></span><span className=' text-gray-600'>{item.size} Squared ft</span></p>
                                 <hr className=' my-6'/>
                                 <h2 className=' text-xl font-[700] font-sans text-[#ff5a3c]'>${`${item.price} ${item.category==="rent"? <span className=' font-[400] text-base'>/Month</span>:""}`}</h2>
                             </div>
                         </div>
                                    )
                                   })}
                                   </div>
                                 </div>
                                 </>):(<h2 className=' text-xl font-black font-sans text-center my-4'>No Related Property Yet</h2>)}
                               </div>
                             </div>
                             <div className="sec-2 w-full min-[850px]:w-[30%]">
                               <div className="wrapper sticky top-0">
                                 <div className="profile border border-gray-200 shadow-sm px-2 lg:px-4 py-10">
                                   <img src={property?.property_poster?.profile} className=' w-28 h-28 rounded-full object-cover m-auto' alt="" />
                                   <h2 className=' text-xl lg:text-2xl text-center font-[700] font-sans my-4'>{property?.property_poster?.name}</h2>
                                   <div>
                                     <p className=' text-[16px] text-center font-sans font-[350] text-gray-500'>{property?.property_poster?.email}</p>
                                     {/* <p className=' text-[16px] text-center font-sans font-[300] text-gray-500 mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis distinctio, odio, eligendi suscipit reprehenderit atque.</p>
                                     <div className=' mt-6 flex justify-center gap-2'>
                                       <FacebookOutlined sx={{color:"gray","&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in"}}/>
                                       <Twitter sx={{color:"gray","&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in"}}/>
                                       <YouTube sx={{color:"gray","&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in"}}/>
                                       <LinkedIn sx={{color:"gray","&:hover":{color:"#ff5a3c"},transition:"0.2s ease-in"}}/>
                                     </div> */}
                                   </div>
                                 </div>
                                
                                 <div className="formm shadow-sm border border-gray-200 p-4 mt-4">
                                  <form action="" onSubmit={handlecontact}>
                                  <h2 className=' text-lg font-[700] text-center'>For purchase property contact for agent</h2>
                                  <div className=" relative w-full">
                                      <div className="input w-full relative my-4">
                                      <input type="text" name='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Your Name" className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                      <span className=" absolute top-[50%] -translate-y-[50%] right-2"><Person sx={{color:"#ff5a3c"}}/></span>
                                    </div>
                                    <div className="input w-full relative my-4">
                                      <input type="text" name='phone' onChange={(e)=>setPhone(parseInt(e.target.value))} value={phone}  placeholder="Enter Phone number" className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                      <span className=" absolute top-[50%] -translate-y-[50%] right-2"><MobileFriendlyRounded sx={{color:"#ff5a3c"}}/></span>
                                    </div>
                                    <textarea name='contactmessage' onChange={(e)=>setContactmessage(e.target.value)} value={contactmessage}  className=" w-full h-20 border-2 p-4 border-gray-100 outline-none" placeholder="Enter Message "></textarea>                              
                                    </div>
                                  <Button type='submit' variant="contained" sx={{background:"#ff5a3c"}}>
                                  {pccreateloading ? (
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
                                  </form>
                                 </div>
                                 <div className="categories-rated shadow-sm border border-gray-200 mt-6 p-4 lg:p-6">
                                   <h2 className=' text-xl font-[700] border-l-2 border-[#ff5a3c] pl-2'>Top Categories</h2>
                                   <div className=' space-y-2 mt-4'>
                                     <div className=' flex justify-between items-center'>
                                       <span className=' cursor-pointer hover:text-[#ff5a3c] duration-300 font-[350] text-gray-500 text-sm'>Aparments</span>
                                       <span>(20)</span>
                                     </div>
                                     <div className=' flex justify-between items-center'>
                                       <span className=' cursor-pointer hover:text-[#ff5a3c] duration-300 font-[350] text-gray-500 text-sm'>Studio</span>
                                       <span>(20)</span>
                                     </div>
                                     <div className=' flex justify-between items-center'>
                                       <span className=' cursor-pointer hover:text-[#ff5a3c] duration-300 font-[350] text-gray-500 text-sm'>Office</span>
                                       <span>(20)</span>
                                     </div>
                                     <div className=' flex justify-between items-center'>
                                       <span className=' cursor-pointer hover:text-[#ff5a3c] duration-300 font-[350] text-gray-500 text-sm'>Luxury villas</span>
                                       <span>(20)</span>
                                     </div>
                                     <div className=' flex justify-between items-center'>
                                       <span className=' cursor-pointer hover:text-[#ff5a3c] duration-300 font-[350] text-gray-500 text-sm'>Duplex House</span>
                                       <span>(20)</span>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                         </div>
                     </div>
                 </div>
      </div>
   )}
    </div>
  )
}

export default Property_detail