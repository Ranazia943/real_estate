import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const User_Agent = () => {
  const {user} = useSelector((state)=>state.User);
  
  return user ? <Outlet/> : <Navigate to="/login"/>
}

export default User_Agent