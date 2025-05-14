import HomeIcon from '@mui/icons-material/Home';


const Hero_Section = () => {
  return (
  <div>
      <div className=' bg-[url(https://timandjulieharris.com/wp-content/uploads/2019/12/luxury.jpg)] bg-cover bg-no-repeat bg-center before:bg-black before:inset-0 relative before:opacity-40 min-h-screen before:z-10 before:absolute'>
        <div className=' absolute top-[55%] w-[300px] md:w-[550px] z-[40] left-[50%] translate-x-[-50%] translate-y-[-55%]'>
            <div className=' text-center'>
            <p className=' text-base font-[600] text-white'><HomeIcon/>Real Estate Agency</p>
            <h2 className=' md:text-6xl text-3xl font-[800] mt-4 text-white'>Find Your Dream House By Us</h2>
            <p className=' text-white text-lg font-[500] mt-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, explicabo! Rerum magnam modi.</p>
            <button className=' px-6 py-4 mt-4 bg-red-600 text-white hover:text-black hover:bg-white duration-300 text-xl font-[300]'>Make an Enquiry</button>
            </div>
        </div>
        {/* <div className=' max-md:hidden absolute shadow-lg -bottom-[16%] -translate-y-[16%] left-[50%] -translate-x-[50%] z-50 min-h-[150px] flex justify-center items-center w-[80%] m-auto my-4 bg-white border'>
          <div className=' grid w-full px-6 py-4 gap-4 grid-cols-1 md:grid-cols-4'>
            <select value={ame} onChange={(e)=>setAme(e.target.value)} className=' border h-14 bg-white font-[600] shadow-sm outline-none w-full'>
              <option value="">Amenity</option>
              {amenties.map((city,index)=>{
                return <option key={index} value={city}>{city}</option>
              })}
            </select>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className=' border h-14 bg-white font-[600] shadow-sm outline-none w-full'>
              <option value="">Property Status</option>
              {categories.map((city,index)=>{
                return <option key={index} value={city}>{city}</option>
              })}
            </select>
            <select value={type} onChange={(e)=>setType(e.target.value)} className=' border h-14 bg-white font-[600] shadow-sm outline-none w-full'>
              <option value="">Property Type</option>
              {property_types.map((city,index)=>{
                return <option key={index} value={city}>{city}</option>
              })}
            </select>
            <button onClick={handlesubmit} className=' px-6 py-4 bg-red-500 text-white w-[200px] m-auto hover:bg-white duration-300 hover:text-black hover:border hover:shadow-sm font-[600]'>Find Now</button>
          </div>
        </div> */}
    </div>
        {/* <div className=' md:hidden min-h-[150px] flex justify-center items-center w-[80%] m-auto my-4 bg-white border'>
          <div className=' grid w-full px-6 py-4 gap-4 grid-cols-1 md:grid-cols-4'>
            <select className=' border h-14 bg-white font-[600] shadow-sm outline-none w-full'>
              <option value="">Choose Area</option>
            </select>
            <select className=' border h-14 bg-white font-[600] shadow-sm outline-none w-full'>
              <option value="">Property Status</option>
            </select>
            <select className=' border h-14 bg-white font-[600] shadow-sm outline-none w-full'>
              <option value="">Property Type</option>
            </select>
            <button className=' px-6 py-4 bg-red-500 text-white w-[200px] m-auto hover:bg-white duration-300 hover:text-black hover:border hover:shadow-sm font-[600]'>Find Now</button>
          </div>
        </div> */}
  </div>
  )
}

export default Hero_Section