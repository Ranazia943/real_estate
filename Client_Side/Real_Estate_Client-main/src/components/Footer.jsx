import { LocationCity } from "@mui/icons-material"

const Footer = () => {
  return (
    <div>
       <footer className="bg-black py-10 sm:px-10 px-6 font-[sans-serif] tracking-wide">
  <div className="max-w-screen-xl mx-auto">
    <div className="max-w-xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-white">Newsletter</h3>
      <p className="text-sm mt-4 text-white">Subscribe to our newsletter and stay up to date with the latest news,
        updates, and exclusive offers. Get valuable insights. Join our community today!</p>
      <div className="bg-gray-100 flex px-2 py-1.5 rounded-full text-left mt-8">
        <input type="email" placeholder="Enter your email" className="w-full outline-none bg-transparent text-sm pl-4" />
        <button type="button" className="bg-gray-700 hover:bg-gray-800 text-white text-sm rounded-full px-4 py-2 ml-4 transition-all tracking-wide">Submit</button>
      </div>
    </div>
    <hr className="my-12" />
    <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <h4 className="text-xl font-bold mb-6 text-white flex items-end gap-2"><span><LocationCity sx={{fontSize:"30px"}}/></span>Dream Houses</h4>
        <p className="text-white mb-2 text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida,
          mi eu pulvinar cursus, sem elit interdum mauris.</p>
      </div>
      <div>
        <h4 className="text-base font-bold mb-6 text-white">Company</h4>
        <ul className="space-y-3">
          <li><a href="javascript:void(0)" className="text-white text-sm">About</a></li>
          <li><a href="javascript:void(0)" className="text-white text-sm">Blogs</a></li>
          <li><a href="javascript:void(0)" className="text-white text-sm">All Listings</a></li>
          <li><a href="javascript:void(0)" className="text-white text-sm">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-base font-bold mb-6 text-white">Services</h4>
        <ul className="space-y-3">
          <li><a href="javascript:void(0)" className="text-white text-sm">Buying House</a>
          </li>
          <li><a href="javascript:void(0)" className="text-white text-sm">Sell House</a>
          </li>
          <li><a href="javascript:void(0)" className="text-white text-sm">Rented Houses</a>
          </li>
          <li><a href="javascript:void(0)" className="text-white text-sm">ETC</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-base font-bold mb-6 text-white">About Us</h4>
        <ul className="space-y-3">
          <li><a href="javascript:void(0)" className="text-white text-sm">Our Story</a>
          </li>
          <li><a href="javascript:void(0)" className="text-white text-sm">Mission and
              Values</a></li>
          <li><a href="javascript:void(0)" className="text-white text-sm">Team</a></li>
          <li><a href="javascript:void(0)" className="text-white text-sm">Testimonials</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer