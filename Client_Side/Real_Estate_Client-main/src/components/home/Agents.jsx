
import { HouseOutlined } from "@mui/icons-material"

const Agents = () => {
  return (
    <div>
        <div className="wrapper mt-20">
        <div className="header text-center">
            <h2 className="text-[#d4ca68] relative before:w-[50px] before:absolute before:left-[-100%] before:h-[2.5px] before:bg-[#d4ca68] inline-block before:top-[50%] before:-translate-y-[50%] after:w-[50px] after:absolute after:right-[-100%] after:h-[2.5px] after:bg-[#d4ca68] after:top-[50%] after:-translate-y-[50%] text-lg font-[400]">
              Agents
            </h2>
            <h2 className="text-4xl font-[800] mt-4">Our Agents</h2>
          </div>
       <div className="font-sans mt-20 p-4 mx-auto max-w-[1280px]">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    <div className="bg-white flex group flex-col overflow-hidden cursor-pointer transition-all">
      <div className="w-full overflow-hidden">
        <img src="https://preview.colorlib.com/theme/findstate/images/team-1.jpg" alt="Product 1" className="w-full group-hover:scale-105 duration-300 object-cover object-top aspect-[230/307]" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h5 className="text-base sm:text-xl font-sans font-[600] text-gray-800 line-clamp-2">Ben Ford</h5>
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <span><HouseOutlined sx={{color:"#d4ca68",fontSize:"30px"}}/></span>
            <span className=" text-[#d4ca68] font-[400] text-lg font-sans">43 Properties</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white flex group flex-col overflow-hidden cursor-pointer transition-all">
      <div className="w-full overflow-hidden">
        <img src="https://preview.colorlib.com/theme/findstate/images/team-2.jpg" alt="Product 2" className="w-full group-hover:scale-105 duration-300 object-cover object-top aspect-[230/307]" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
      <div className="flex-1">
          <h5 className="text-base sm:text-xl font-sans font-[600] text-gray-800 line-clamp-2">John Cooper</h5>
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <span><HouseOutlined sx={{color:"#d4ca68",fontSize:"30px"}}/></span>
            <span className=" text-[#d4ca68] font-[400] text-lg font-sans">28 Properties</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white flex group flex-col overflow-hidden cursor-pointer transition-all">
      <div className="w-full overflow-hidden">
        <img src="https://preview.colorlib.com/theme/findstate/images/team-3.jpg" alt="Product 3" className="w-full group-hover:scale-105 duration-300 object-cover object-top aspect-[230/307]" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
      <div className="flex-1">
          <h5 className="text-base sm:text-xl font-sans font-[600] text-gray-800 line-clamp-2">Janice Clinton</h5>
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <span><HouseOutlined sx={{color:"#d4ca68",fontSize:"30px"}}/></span>
            <span className=" text-[#d4ca68] font-[400] text-lg font-sans">30 Properties</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white flex group flex-col overflow-hidden cursor-pointer transition-all">
      <div className="w-full overflow-hidden">
        <img src="https://preview.colorlib.com/theme/findstate/images/team-4.jpg" alt="Product 3" className="w-full group-hover:scale-105 duration-300 object-cover object-top aspect-[230/307]" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
      <div className="flex-1">
          <h5 className="text-base sm:text-xl font-sans font-[600] text-gray-800 line-clamp-2">Eunice Henceford</h5>
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <span><HouseOutlined sx={{color:"#d4ca68",fontSize:"30px"}}/></span>
            <span className=" text-[#d4ca68] font-[400] text-lg font-sans">25 Properties</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    </div>
  )
}

export default Agents