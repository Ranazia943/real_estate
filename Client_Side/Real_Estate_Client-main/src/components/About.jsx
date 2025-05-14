
import { HighlightOutlined, House, NightShelterOutlined, SecurityOutlined } from "@mui/icons-material"
import Services from "./home/Services"
import Agents from "./home/Agents"
import Blogs from "./home/Blogs"

const About = () => {
  return (
    <div className="main-wrapper min-h-screen">
      <div className="wrapper">
        <div className="header relative h-[400px] bg-[url(https://www.lek.com/sites/default/files/hero-images/insights/2030-Portfolio-Companies-return.jpg)] bg-cover bg-no-repeat bg-center before:bg-black before:inset-0 before:opacity-40 before:z-10 before:absolute">
          <div className=" w-[200px] text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
            <h2 className=" text-4xl mb-6 font-[800] text-white font-sans">About Us</h2>
            <div className=" flex justify-start items-center gap-2">
              <span><House sx={{color:"#ff5a3c",fontSize:"30px"}}/></span>
              <span className=" text-white font-[600] font-sans text-lg">Home {">"} </span>
              <span className=" font-[600] text-white font-sans text-lg">About Us</span>
            </div>
          </div>
        </div>

        <div className="about-section mx-4">
          <div className="wrapper max-md:w-[95%] max-w-6xl my-20 flex max-md:flex-col justify-center items-center gap-6 mx-auto">
            <div className="img w-full md:w-[50%]">
              <img src="https://tunatheme.com/tf/html/quarter-preview/quarter/img/others/13.png" className=" w-full" alt="" />
            </div>
            <div className="content w-full md:w-[50%]">
            <h2 className=" px-4 py-1 bg-[#F5DFDC] inline-block rounded-full text-[#FF5A3C]">About Us</h2>
            <h2 className=" text-3xl md:text-4xl lg:text-5xl mt-4 font-[800] font-sans">The Leading Real Estate Rental Marketplace.</h2>
            <p className=" text-gray-600 mt-6 text-base font-[350] font-sans ">Over 39,000 people work for us in more than 70 countries all over the This breadth of global coverage, combined with specialist services</p>
            <div className=" my-6">
              <div className="sec-1 flex justify-between items-center">
                <div className=" flex items-center gap-1 md:gap-2">
                  <span className="  h-10 w-10 flex justify-center items-center rounded-full bg-[#F5DFDC]"><House sx={{fontSize:"24px",color:"#ff5a3c"}}/></span>
                  <span className=" font-sans font-[350] text-base lg:text-lg text-gray-600">Smart Home Design</span>
                </div>
                <div className=" flex items-center gap-1 md:gap-2">
                  <span className="  h-10 w-10 flex justify-center items-center rounded-full bg-[#F5DFDC]"><NightShelterOutlined sx={{fontSize:"24px",color:"#ff5a3c"}}/></span>
                  <span className=" font-sans font-[350] text-base lg:text-lg text-gray-600">Beautiful Scene Around</span>
                </div>
              </div>

              <div className="sec-2 flex justify-between items-center mt-4">
              <div className=" flex items-center gap-1 md:gap-2">
                  <span className="  h-10 w-10 flex justify-center items-center rounded-full bg-[#F5DFDC]"><HighlightOutlined sx={{fontSize:"24px",color:"#ff5a3c"}}/></span>
                  <span className=" font-sans font-[350] text-base lg:text-lg text-gray-600">Exceptional Lifestyle</span>
                </div>
                <div className=" flex items-center gap-1 md:gap-2">
                  <span className="  h-10 w-10 flex justify-center items-center rounded-full bg-[#F5DFDC]"><SecurityOutlined sx={{fontSize:"24px",color:"#ff5a3c"}}/></span>
                  <span className=" font-sans font-[350] text-base lg:text-lg text-gray-600">Complete 24/7 Security</span>
                </div>
              </div>
            </div>
            <div className=" min-h-[100px] bg-[#FFF2F0] px-10 py-4 border-l-4 border-[#ff5a3c] w-full flex justify-center items-center">
              <p className=" font-[350] font-sans text-lg text-gray-600">Enimad minim veniam quis nostrud exercitation llamco laboris. Lorem ipsum dolor sit amet</p>
            </div>
            <button className=" px-6 py-4 z-50 before:duration-300 overflow-hidden after:duration-300 transition-all after:-z-10 before:-z-10 hover:before:right-[-100%] hover:after:left-0  text-white relative before:bg-[#ff5a3c] before:absolute before:top-0 before:bottom-0 before:right-0 after:absolute after:top-0 after:bottom-0 after:left-[-100%] after:w-full after:h-full after:bg-black before:w-full before:h-full mt-6">Our Services</button>
            </div>
          </div>
        </div>

        <div className=" bg-[#F2F6F7] py-20">
          <Services/>
        </div>

        <div className=" my-10">
          <Agents/>
        </div>
        <div className=" mt-20">
          <Blogs/>
        </div>
      </div>
    </div>
  )
}

export default About