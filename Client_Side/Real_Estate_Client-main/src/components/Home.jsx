import Agents from "./home/Agents"
import Blogs from "./home/Blogs"
import Featured_listing from "./home/Featured_listing"
import Hero_Section from "./home/Hero_Section"
import Property_By_Location from "./home/Property_by_location"
import Services from "./home/Services"
import Testimonial from "./home/Testimonial"

const Home = () => {
  return (
    <div>
        <Hero_Section/>
        <div className="mt-20 md:mt-28">
          <Services/>
        </div>
        <div className="">
          <Property_By_Location/>
        </div>
        <div className="">
          <Featured_listing/>
        </div>
        <div className="">
          <Testimonial/>
        </div>
        <div className="">
          <Agents/>
        </div>
        <div className="">
          <Blogs/>
        </div>
    </div>
  )
}

export default Home