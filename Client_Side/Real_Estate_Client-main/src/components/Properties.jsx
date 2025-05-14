import { AutoAwesomeMosaic, Bed, FilterList, House, Place, Shower } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Fetch_Properties } from '../redux/action/propertyAction'
import { useEffect, useState } from 'react'
import Loader from './Loader'
import { Button } from '@mui/material'


const property_types = [
    "Single House",
    "Family House",
    "Apartment",
    "Office Villa",
    "Luxury House",
    "Studio",
    "Condo",
    "Townhouse",
    "Duplex",
    "Penthouse",
    "Loft",
    "Farmhouse",
    "Cottage",
    "Bungalow",
    "Mansion",
    "Villa",
    "Mobile Home",
    "Row House",
    "Commercial Space",
    "Industrial Unit"
];



const amenties = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Garden",
    "Balcony",
    "Elevator",
    "Security System",
    "Playground",
    "Clubhouse",
    "WiFi",
    "Air Conditioning",
    "Heating",
    "Fireplace",
    "Laundry Room",
    "Furnished",
    "Pet Friendly",
    "Smart Home Features",
    "Tennis Court",
    "Basketball Court",
    "Sauna",
    "Jacuzzi",
    "Rooftop Access",
    "BBQ Area",
    "Wheelchair Accessible",
    "Gated Community",
    "Backup Generator",
    "Conference Room",
    "Lounge Area",
    "Concierge Service",
    "Bike Storage",
    "CCTV Surveillance",
    "Private Yard",
    "Dishwasher",
    "Covered Parking",
    "High-Speed Internet",
    "Children’s Pool",
    "Walking Trails",
    "Business Center",
    "Recreational Room",
    "24/7 Water Supply",
    "Power Backup",
    "Spa",
    "Yoga Studio",
    "Game Room",
    "Co-Working Space",
    "Restaurant",
    "Shopping Area",
    "Medical Center",
    "Library",
    "Guest Parking"
  ];
  
const categories = [
    "sale",
    "rent"
]
const budgets = [
    {
        id:1,
        name:"Low",
        range:"$5000 to $10000"
    },
    {
        id:2,
        name:"Medium",
        range:"$10000 to $20000"
    },
    {
        id:3,
        name:"High",
        range:"Up To $30000"
    }
]
const Properties = () => {
    const {properties,propertyloading} = useSelector((state)=>state.Property);
    const dispatch = useDispatch();
    const [p_type, setP_type] = useState(8);
    const [amet, setAmet] = useState(8);
    // const [amenities, setAmenities] = useState("")
    const [property_type, setProperty_type] = useState("")
    const [category, setCategory] = useState("")
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const ptypeclick = ()=>{
        setP_type((prev)=>prev+8)
    }
    const amenclick = ()=>{
        setAmet((prev)=>prev+8)
    }
    const clearfilter = ()=>{
        setP_type(8)
        setAmet(8)
        setSelectedAmenities([])
        setProperty_type("")
        setCategory("")
        window.scroll({top: 800, behavior: "smooth" });
    }
    const handleAmenityChange = (amenity) => {
        setSelectedAmenities((prevSelected) =>
          prevSelected.includes(amenity)
            ? prevSelected.filter((item) => item !== amenity)
            : [...prevSelected, amenity]
        );
      };

    useEffect(()=>{
            dispatch(Fetch_Properties(selectedAmenities, category, property_type))
    },[selectedAmenities, category, dispatch, property_type])
  return (
    <div>
        <div className="wrapper">
            <div className="header bg-[url(https://dubai-property.investments/uploads/images/2022-03/vv2.jpg)] bg-cover bg-no-repeat h-[80vh] lg:min-h-screen bg-center relative">
            <div className=' absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] text-center '>
                <h2 className=' text-6xl text-black font-[700] font-sans'>Properties</h2>
                <p className=' mt-4 text-xl font-[700] text-black font-sans'><House sx={{color:"white",marginBottom:"8px", fontSize:"30px"}}/>Home {">"} Properties</p>
            </div>
            <div 
        className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b via-gray-50/80 from-white/80 to-transparent"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-white via-gray-50/80 to-transparent"
        aria-hidden="true"
      />
            </div>
            <div className="grid-layout-wrapper max-w-6xl mx-auto max-[900px]:flex-col flex p-2 gap-4 my-20">
                <div className="sec-1 w-full min-[900px]:w-[30%]">
                    <div className="wrapper max-[900px]:hidden border border-gray-400 p-6 sticky top-0">
                       
                    <h2 className=' text-xl font-[700] font-sans'>Category</h2>
                        <div className=' mt-4 space-y-4'>
                            {categories.map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                      <input type="checkbox" value={a} checked={a===category} onChange={(e)=>setCategory(e.target.value)} className="form-checkbox h-[15px] w-[15px] bg-[#ff5a3c]" id={a} name={a} />
                                      <label className="form-label text-black text-[15px] font-[300] ">{a}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <h2 className=' text-xl mt-6 font-[700] font-sans'>Property Type</h2>
                        <div className=' mt-6 space-y-4'>
                            {property_types.slice(0,p_type).map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                        <input type="checkbox" value={a} checked={a===property_type} onChange={(e)=>setProperty_type(e.target.value)}  className="form-checkbox h-[15px] w-[15px] bg-[#ff5a3c]" id={a} name={a} />
                                        <label className="form-label text-black text-[15px] font-[300] " htmlFor={a}>{a}</label>
                                    </div>
                                )
                            })}
                            {p_type<property_types?.length ? <p onClick={ptypeclick} className=' text-cyan-500 hover:underline cursor-pointer'>See more</p>:""}
                        </div>
                        <h2 className=' text-xl font-[700] font-sans mt-6'>Amenities</h2>
                        <div className=' mt-4 space-y-4'>
                            {amenties.slice(0,amet).map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                        <input type="checkbox" value={a} checked={selectedAmenities.includes(a)}
        onChange={() => handleAmenityChange(a)}  className="form-checkbox h-[15px] w-[15px] bg-[#ff5a3c]" id={a} name={a} />
                                        <label className="form-label text-black text-[15px] font-[300] " htmlFor={a}>{a}</label>
                                    </div>
                                )
                            })}
                           {amet<amenties?.length ? <p onClick={amenclick} className=' text-cyan-500 hover:underline cursor-pointer'>See more</p>:""}
                        </div>
                        <div className='mt-4'>
                            <Button variant='contained' onClick={clearfilter}>Clear Filter</Button>
                        </div>
                        {/* <h2 className=' text-xl font-[700] font-sans mt-6'>Amenities</h2>
                        <div className=' mt-4 space-y-4'>
                            {budgets.map((a)=>{
                                return (
                                    <div key={a.id} className=' flex justify-between items-center'>
                                      <div className=' space-x-4'>
                                      <input type="checkbox" className="form-checkbox h-[15px] w-[15px] bg-[#ff5a3c]" id={a.name} name={a.name} />
                                      <label className="form-label text-black text-[15px] font-[300] ">{a.name}</label>
                                      </div>
                                      <div>
                                        <p className=' font-[350] text-sm font-sans'>{a.range}</p>
                                      </div>
                                    </div>
                                )
                            })}
                        </div> */}
                    </div>
                    <div className=' min-[900px]:hidden grid grid-cols-2 min-[750px]:grid-cols-4 gap-2'>
                <div className=' w-full relative'>
                    <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <FilterList/>
                    </div>
                    <select name="" id="" className='border outline-none bg-white h-12 w-full pl-6'>
                        <option>Category</option>
                        {categories.map((a)=>{
                            return (
                                <option key={a}>{a}</option>
                            )
                        })}
                    </select>
                </div>
                <div className=' w-full relative'>
                <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <FilterList/>
                    </div>
                    <select name="" id="" className='border outline-none bg-white h-12 w-full pl-6'>
                        <option>Property Type</option>
                        {property_types.map((a)=>{
                            return (
                                <option key={a}>{a}</option>
                            )
                        })}
                    </select>
                </div>
                <div className=' w-full relative'>
                <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <AutoAwesomeMosaic/>
                    </div>
                    <select name="" id="" className='border outline-none bg-white h-12 w-full pl-6'>
                        <option>Amenities</option>
                        {amenties.map((a)=>{
                            return (
                                <option key={a}>{a}</option>
                            )
                        })}
                    </select>
                </div>
                <div className=' w-full relative'>
                <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <AutoAwesomeMosaic/>
                    </div>
                    <select name="" id="" className='border outline-none bg-white h-12 w-full pl-6'>
                        <option>Budget</option>
                        {budgets.map((a)=>{
                            return (
                                <option key={a.id}>{a.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
                </div>
                <div className="sec-2 w-full min-[900px]:w-[70%]">
               {propertyloading ? (<Loader/>): properties?.length===0 ? (<div className=' flex justify-center items-center h-[80vh]'>
                <p className='text-center text-xl font-[700]'>No Properties found.</p>
               </div>):(
                    <div className="wrapper sticky top-0">
                    <div className="cards grid grid-cols-1 min-[600px]:grid-cols-2 gap-4">
                       {properties?.map((p,index)=>{
                        return (
                            <div key={index} className="card group shadow-md max-[600px]:w-[350px] mx-auto max-[400px]:w-full">
                            <div className="img overflow-hidden">
                                <img src={p.images[0]} className=' w-full h-[250px] object-cover group-hover:scale-110 duration-300 transition-all' alt="" />
                            </div>
                            <div className=' p-4 lg:p-6'>
                                <p className=' text-xl font-[300] text-[#ff5a3c]'>For {p.category}</p>
                                <Link to={`/detail/${p._id}`}>
                                <h2 className='text-xl lg:text-2xl font-[700] mt-2 hover:text-[#ff5a3c] line-clamp-1 cursor-pointer'>{p.title}</h2>
                                </Link>
                                <p className=' font-[350] text-sm my-4 text-gray-600'><Place sx={{marginRight:"6px",color:"#ff5a3c"}}/> {p.location.address}</p>
                                <p className=' space-x-4 font-[350] text-lg font-sans'><span className=' text-gray-600'>{p.rooms} <Bed sx={{color:"#ff5a3c"}}/></span><span className=' text-gray-600'>{p.bathrooms} <Shower sx={{color:"#ff5a3c"}}/></span><span className=' text-gray-600'>{p.size} Squared ft</span></p>
                                <hr className=' my-6'/>
                                <h2 className=' text-xl font-[700] font-sans text-[#ff5a3c]'>${`${p.price} ${p.category==="rent"? <span className=' font-[400] text-base'>/Month</span>:""}`}</h2>
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

export default Properties