// import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "../screen/login.css"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { LoginUser } from "../../redux/action/userAction"

const Login = () => {
    const [userData, setUserData] = useState({
        email:"",
        password: ""
    })
    const {actionloading,user} = useSelector((state)=>state.User)
    useEffect(()=>{
        if(user) navigate("/")
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlelogin = (e) => {
        e.preventDefault();
        dispatch(LoginUser(userData, navigate));
    }
  return (
    <div className=" bg-[#171717] py-20">
<div className="carddd w-[400px] mx-auto">
  <div className="card2">
    <form className="form" onSubmit={handlelogin}>
      <p id="heading">Login</p>
      <div className="field">
        <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="input-icon">
          <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
        </svg>
        <input type="email" name="email" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} className="input-field" placeholder="Email" autoComplete="off" />
      </div>
      <div className="field">
        <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="input-icon">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        </svg>
        <input type="password" name="password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} className="input-field" placeholder="Password" />
      </div>
      <div>
      <div className=" text-end mt-4 text-white">
    <p>If have an no account <Link to="/register" className="underline hover:text-cyan-400">Register</Link></p>
  </div>
      </div>
      <div className="btn">
        <button type="submit" className="button1 w-full">
        {actionloading ? (
            <>
            Login
            <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        fill="#fff"
        className="ml-2 inline animate-spin"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          data-original="#000000"
        />
      </svg>
            </>
        ):"Login"}
        </button>
      </div>
      <Link to="/forgot"><button className="button3 w-full">Forgot Password</button></Link>
    </form>
  </div>
</div>





    </div>
  )
}

export default Login