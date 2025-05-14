import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Fetch_All_WhishLists } from '../redux/action/adminAction';
import Loader from '../components/Loader';
import { Info } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';

const Fade = React.forwardRef(function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true);
        }
      },
    });
  
    return (
      // @ts-expect-error https://github.com/pmndrs/react-spring/issues/2341
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const All_WhishList = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const dispatch = useDispatch();
    const {allwhishlists,whishloadingg} = useSelector((state)=>state.Admin)
    const [whishlists, setWhishlists] = useState([])
    const [itemid, setItemid] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setItemid(id)
    }
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        dispatch(Fetch_All_WhishLists())
    },[dispatch])
    useEffect(()=>{
        const filt = allwhishlists?.filter((whishlist) => whishlist.propertyid === itemid)
        setWhishlists(filt)
    },[allwhishlists,itemid])
  return (
   <div>
    <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
             
            <h2>{whishlists?.length} {whishlists?.length>1 ? "users like same property":"Only One"}</h2>
            <div className=' my-4'>
                <p className=' font-[300] font-sans'>Property id</p>
                <Link to={`/detail/${whishlists[0]?.propertyid}`}><span className=' cursor-pointer text-cyan-500 hover:underline'>{whishlists[0]?.propertyid}</span></Link>
            </div>
            <div>
           {whishlists?.map((item)=>{
            return(
                <div key={item._id} className="flex my-2 items-center cursor-pointer w-max">
                <img src={item.poster.profile} className="w-12 h-12 rounded-full shrink-0 object-cover" />
                <div className="ml-4">
                  <p className="text-sm text-black">{item.poster.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.poster.email}</p>
                </div>
              </div>
            )
           })}
            </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">  
       <div className=' w-full'>
       <h2 className="text-center my-6 font-[800] text-3xl font-sans">All Whish Lists</h2>
        {whishloadingg ? (<Loader/>):(
    <div>
           <div className="font-[sans-serif] overflow-hidden overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
        
        <table className="w-full bg-white">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Creater
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Image
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Title
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Square FT
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Location
              </th>
              <th className="p-4 text-center text-sm font-semibold text-black">
                See Detail
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {allwhishlists?.map((item,index)=>{
              return (
                <tr key={index} className="">
              <td className="p-4 text-sm">
                <div className="flex items-center cursor-pointer w-max">
                  <img src={item.poster.profile} className="w-10 h-10 rounded-full shrink-0 object-cover" />
                  <div className="ml-4">
                    <p className="text-sm text-black">{item.poster.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.poster.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-sm uppercase">
                 <img src={item.image} className=' w-12 h-12 object-cover rounded-full' alt="" />
              </td>
              <td className="p-4 text-sm uppercase">
                {item.title}
              </td>
              <td className="p-4">
                {item.size}
              </td>
              <td className={`p-4`}>
                 {item.location}
              </td>
              <td className="p-4 text-center" onClick={()=>handleOpen(item.propertyid)}>
                <Info/>
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
     )}
       </div>
        </div>
    </div>
   </div>
   
  )
}

export default All_WhishList