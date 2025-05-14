/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Mini_Nav from './Mini_Nav';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard, ExitToApp, Person } from '@mui/icons-material';
import { LogoutUser } from '../redux/action/userAction';
import FavoriteIcon from '@mui/icons-material/Favorite';


const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Properties',
    href: '/properties',
  },
  {
    title: 'Agents',
    href: '/agents',
  },
  {
    title: 'Team',
    href: '/team',
  },
  {
    title: 'About',
    href: '/about',
  },
  { title: 'Contact', href: '/contact' },
]

const DropdownMenu = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

const MobileMenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        {item.dropdownItems ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
          >
            {item.title}
            <svg
              className={`ml-2 h-5 w-5 inline-block transform transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <Link
            to={item.href}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
          >
            {item.title}
          </Link>
        )}
      </div>
      <AnimatePresence>
        {isOpen && item.dropdownItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pl-4">
              {item.dropdownItems.map((dropdownItem, index) => (
                <Link
                  key={index}
                  href={dropdownItem.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                >
                  {dropdownItem.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MobileMenu = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="min-[850px]:hidden overflow-hidden"
    >
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
        {items.map((item, index) => (
          <MobileMenuItem key={index} item={item} />
        ))}
      </div>
    </motion.div>
  )
}

const Navbar= () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index)
  }
  const {user,actionloading} = useSelector((state)=>state.User)
  const [drop, setDrop] = useState(false);
  const [navbar, setNavbar] = useState(false)
  const pathName = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handledrop = () => setDrop(!drop);
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setrouter.Pathname(window.location.router.pathname);
  //   }
  // }, []);
  const logout = ()=>{
    dispatch(LogoutUser(navigate))
  }
  useEffect(() => {
    const showStyle = () => {
      if (window.scrollY >= 140) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    

    window.addEventListener("scroll", showStyle);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", showStyle);
    };
  }, []);

  return (
    <nav className={` ${navbar ? " shadow-md bg-black z-[100]":""} ${pathName.pathname === "/"? " fixed top-0":"bg-black"} w-full z-50`}>
      <Mini_Nav/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex gap-2 items-center">
           <Link to="/">
           <span><LocationCityIcon sx={{fontSize:"40px",color:"white"}}/></span>
           </Link>
           <span className={` leading-[18px] text-white font-[500]`}>Dream <br /> Houses</span>
          </div>
          <div className="hidden min-[850px]:flex min-[850px]:items-center min-[850px]:ml-6 min-[850px]:space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdownItems ? (
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                    aria-haspopup="true"
                  >
                    {item.title}
                    <svg
                      className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                        openDropdownIndex === index ? 'rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`inline-flex text-base items-center px-1 z-10 font-[500] pt-1 border-b-2 border-transparent leading-5 ${pathName==="/"?"text-white":"text-white"} before:absolute relative overflow-hidden before:z-50 before:bottom-0 hover:-translate-y-1 hover:before:left-0 before:duration-300 before:w-full before:h-0.5 before:left-[-100%] before:bg-[#ff5a3c] focus:outline-none focus:border-[#ff5a3c] hover:text-[#ff5a3c] transition duration-150 ease-in-out`}
                  >
                    {item.title}
                  </Link>
                )}
                <AnimatePresence>
                  {openDropdownIndex === index && item.dropdownItems && (
                    <DropdownMenu items={item.dropdownItems} />
                  )}
                </AnimatePresence>
              </div>
            ))}
            {/* <ProfileDropdown /> */}
            <div>
            {user?.isverified===true ? (
              <div className=' relative'>
                  <img src={ (user?.profile==="Profile" || user?.profile==="")? "https://avatars.mds.yandex.net/i?id=e1e984c8dfbafa0fbc6fc1b4a191a9d903249a02-7762396-images-thumbs&n=13": user?.profile } className=" w-10 h-10 rounded-full object-cover" alt="" onClick={handledrop}/>
                <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={drop ? { opacity: 1, scale: 1,x:-120,y:-10 } : { opacity: 0, scale: 0.95,x:-120,y:-40 }}
                transition={{ duration: 0.2 }}
                className={`z-50 bg-white absolute top-12 w-[180px] min-h-[100px] flex justify-start items-center border rounded-lg shadow-lg ${
                    drop ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            >
                <ul className="flex flex-col space-y-2 p-2">
                  {user?.role==="admin"?( <li onClick={handledrop} className="cursor-pointer hover:text-indigo-600"><Dashboard sx={{marginRight:"2px",fontSize:"25px"}}/><Link to="/admin-dashboard">Admin Dashboard</Link></li>):(
                      <li onClick={handledrop} className="cursor-pointer hover:text-indigo-600"><Person sx={{marginRight:"2px",fontSize:"25px"}}/><Link to="/dashboard">Dashboard</Link></li>
                  )}
                  {user?.role==="user" && (
                    <li onClick={handledrop} className="cursor-pointer hover:text-indigo-600"><FavoriteIcon sx={{marginRight:"2px",fontSize:"25px"}}/><Link to="/whishlist">Whish List</Link></li>
                  )}
                    <li className="cursor-pointer hover:text-indigo-600" onClick={logout}><ExitToApp sx={{marginRight:"2px",fontSize:"25px"}}/>{actionloading ? "loading...":"Logout"}</li>
                </ul>
            </motion.div>
              </div>
            ):(
              <Link to="/login">
              <button className='px-4 sm:px-6 py-2 text-white font-bold rounded-full bg-blue-600'>Sign In</button>
              </Link>
            )}
          </div>
          </div>
          
          <div className="min-[850px]:hidden flex items-center">
          <div>
            {user?.isverified===true ? (
             <div className=' relative'>
                 <img src={ (user?.profile==="Profile" || user?.profile==="")? "https://avatars.mds.yandex.net/i?id=e1e984c8dfbafa0fbc6fc1b4a191a9d903249a02-7762396-images-thumbs&n=13": user?.profile } className=" w-10 h-10 rounded-full object-cover" alt="" onClick={handledrop}/>
               <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={drop ? { opacity: 1, scale: 1,x:-120,y:-10 } : { opacity: 0, scale: 0.95,x:-120,y:-40 }}
                transition={{ duration: 0.2 }}
                className={`z-50 bg-white absolute top-12 w-[180px] min-h-[100px] flex justify-start items-center border rounded-lg shadow-lg ${
                    drop ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            >
                <ul className="flex flex-col space-y-2 p-2">
                  {user?.role==="admin"?( <li onClick={handledrop} className="cursor-pointer hover:text-indigo-600"><Dashboard sx={{marginRight:"2px",fontSize:"25px"}}/><Link to="/admin-dashboard">Admin Dashboard</Link></li>):(
                      <li onClick={handledrop} className="cursor-pointer hover:text-indigo-600"><Person sx={{marginRight:"2px",fontSize:"25px"}}/><Link to="/dashboard">Dashboard</Link></li>
                  )}
                    <li className="cursor-pointer hover:text-indigo-600" onClick={logout}><ExitToApp sx={{marginRight:"2px",fontSize:"25px"}}/>{actionloading ? "loading...":"Logout"}</li>
                </ul>
            </motion.div>
             </div>
            ):(
              <Link to="/login">
              <button className='px-4 sm:px-6 py-2 text-white font-bold rounded-full bg-blue-600'>Sign In</button>
              </Link>
            )}
          </div>
            {/* <ProfileDropdown /> */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ml-2"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu items={navItems} />}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

