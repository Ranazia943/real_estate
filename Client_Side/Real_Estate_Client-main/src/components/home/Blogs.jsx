import { CalendarMonthOutlined, LightOutlined, PersonOutline } from "@mui/icons-material"

const Blogs = () => {
  return (
    <div>
        <div className="wrapper mt-10">
        <div className="header text-center">
            <h2 className="text-[#d4ca68] relative before:w-[50px] before:absolute before:left-[-120%] before:h-[2.5px] before:bg-[#d4ca68] inline-block before:top-[50%] before:-translate-y-[50%] after:w-[50px] after:absolute after:right-[-120%] after:h-[2.5px] after:bg-[#d4ca68] after:top-[50%] after:-translate-y-[50%] text-lg font-[400]">
              Blogs
            </h2>
            <h2 className="text-4xl font-[800] mt-4">Our Latest News</h2>
          </div>
          <div className="wrapper-cards mx-4 my-20">
            <div className="cards max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3">
                <div className="card group shadow-lg  mx-auto">
                    <div className="img overflow-hidden">
                        <img src="https://tunatheme.com/tf/html/quarter-preview/quarter/img/blog/1.jpg" className=" w-full h-[250px] object-cover group-hover:scale-105 duration-300 transition-all" alt="" />
                    </div>
                    <div className=" p-4">
                        <div className=" flex justify-start items-center gap-10">
                            <div className=" flex justify-center items-center gap-2">
                                <span><PersonOutline sx={{color:"#FF5A3C"}}/></span>
                                <span className=" text-gray-600 font-sans font-[350] ml-2">By Admin</span>
                            </div>
                            <div>
                                <span><LightOutlined sx={{color:"#FF5A3C"}}/></span>
                                <span className=" text-gray-600 font-sans font-[350] ml-2">Decorate</span>
                            </div>
                        </div>
                        <h2 className=" text-2xl font-[700] font-sans my-4">10 Brilliant Way To Decorate Your Home</h2>
                        <hr />
                        <div className=" mt-4 mb-2 flex justify-between items-center ">
                            <div className=" flex items-end gap-2">
                                <span><CalendarMonthOutlined sx={{color:"#FF5A3C"}}/></span>
                                <span className=" font-[350] font-sans text-gray-600">Jan 6, 2025</span>
                            </div>
                            <p className=" text-[#ff5a3c] text-lg font-[400] font-sans cursor-pointer">Read More</p>
                        </div>
                    </div>
                </div>
                <div className="card group shadow-lg  mx-auto">
                    <div className="img overflow-hidden">
                        <img src="https://tunatheme.com/tf/html/quarter-preview/quarter/img/blog/2.jpg" className=" w-full h-[250px] object-cover group-hover:scale-105 duration-300 transition-all" alt="" />
                    </div>
                    <div className=" p-4">
                        <div className=" flex justify-start items-center gap-10">
                            <div className=" flex justify-center items-center gap-2">
                                <span><PersonOutline sx={{color:"#FF5A3C"}}/></span>
                                <span className=" text-gray-600 font-sans font-[350] ml-2">By Admin</span>
                            </div>
                            <div>
                                <span><LightOutlined sx={{color:"#FF5A3C"}}/></span>
                                <span className=" text-gray-600 font-sans font-[350] ml-2">Interior</span>
                            </div>
                        </div>
                        <h2 className=" text-2xl font-[700] font-sans my-4">The Most Inspiring Interior Design of 2025</h2>
                        <hr />
                        <div className=" mt-4 mb-2 flex justify-between items-center ">
                            <div className=" flex items-end gap-2">
                                <span><CalendarMonthOutlined sx={{color:"#FF5A3C"}}/></span>
                                <span className=" font-[350] font-sans text-gray-600">Jan 4, 2025</span>
                            </div>
                            <p className=" text-[#ff5a3c] text-lg font-[400] font-sans cursor-pointer">Read More</p>
                        </div>
                    </div>
                </div>
                <div className="card group shadow-lg  mx-auto">
                    <div className="img overflow-hidden">
                        <img src="https://tunatheme.com/tf/html/quarter-preview/quarter/img/blog/3.jpg" className=" w-full h-[250px] object-cover group-hover:scale-105 duration-300 transition-all" alt="" />
                    </div>
                    <div className=" p-4">
                        <div className=" flex justify-start items-center gap-10">
                            <div className=" flex justify-center items-center gap-2">
                                <span><PersonOutline sx={{color:"#FF5A3C"}}/></span>
                                <span className=" text-gray-600 font-sans font-[350] ml-2">By Admin</span>
                            </div>
                            <div>
                                <span><LightOutlined sx={{color:"#FF5A3C"}}/></span>
                                <span className=" text-gray-600 font-sans font-[350] ml-2">Estate</span>
                            </div>
                        </div>
                        <h2 className=" text-2xl font-[700] font-sans my-4">Recent Commercial Real Estate Transations</h2>
                        <hr />
                        <div className=" mt-4 mb-2 flex justify-between items-center ">
                            <div className=" flex items-end gap-2">
                                <span><CalendarMonthOutlined sx={{color:"#FF5A3C"}}/></span>
                                <span className=" font-[350] font-sans text-gray-600">Jan 2, 2025</span>
                            </div>
                            <p className=" text-[#ff5a3c] text-lg font-[400] font-sans cursor-pointer">Read More</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          

        </div>
    </div>
  )
}

export default Blogs