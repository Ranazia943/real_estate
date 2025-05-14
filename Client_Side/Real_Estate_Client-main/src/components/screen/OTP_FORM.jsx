import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otpVerifyy, ResendEmail } from "../../redux/action/userAction";
// import { otpVerifyy } from "../redux/action/User_Action";

const OTPVerify = () => {
    const {actionloading,resendloading,user} = useSelector((state)=>state.User)
    useEffect(()=>{
        if(user){
             navigate("/")
        }
     })
    const email = JSON.parse(localStorage.getItem("email"));
    // States for each OTP input field
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [value3, setValue3] = useState();
    const [value4, setValue4] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [timer, setTimer] = useState(60);

    // Refs to each input element
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    // // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const code = `${value1}${value2}${value3}${value4}`;
        dispatch(otpVerifyy(code,navigate))
    };
    const resendhandle = ()=>{
        dispatch(ResendEmail(email,setTimer))
    }

    // Handle input change for each OTP field
    const handleChange = (setter, nextInputRef) => (e) => {
        setter(e.target.value);
        // Move focus to next input if current input is filled
        if (e.target.value && nextInputRef) {
            nextInputRef.current.focus();
        }
    };

    // Handle keydown for backspace (to focus the previous input)
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs[index - 1].current.focus(); // Focus previous input if current is empty
        }
    };
    useEffect(()=>{
        if(timer > 0){
           const time = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(time);
        }
    })

    return (
        <div className="flex justify-center items-center min-h-[90vh]">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold mb-1">Email Verification OTP</h1>
                    <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
                </header>
                <form id="otp-form" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-3">
                        <input
                            type="text"
                            name="value1"
                            value={value1}
                            onChange={handleChange(setValue1, inputRefs[1], inputRefs[0])}
                            onKeyDown={(e) => handleKeyDown(0, e)} // Check if backspace is pressed
                            ref={inputRefs[0]}
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            pattern="\d*"
                            maxLength={1}
                        />
                        <input
                            type="text"
                            name="value2"
                            value={value2}
                            onChange={handleChange(setValue2, inputRefs[2], inputRefs[0])}
                            onKeyDown={(e) => handleKeyDown(1, e)}
                            ref={inputRefs[1]}
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            maxLength={1}
                        />
                        <input
                            type="text"
                            name="value3"
                            value={value3}
                            onChange={handleChange(setValue3, inputRefs[3], inputRefs[1])}
                            onKeyDown={(e) => handleKeyDown(2, e)}
                            ref={inputRefs[2]}
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            maxLength={1}
                        />
                        <input
                            type="text"
                            name="value4"
                            value={value4}
                            onChange={handleChange(setValue4, inputRefs[4], inputRefs[2])}
                            onKeyDown={(e) => handleKeyDown(3, e)}
                            ref={inputRefs[3]}
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            maxLength={1}
                        />
                    </div>
                    <div className="max-w-[260px] mx-auto mt-4">
                        <p className=" text-end">{timer>0 ? timer : (<div onClick={resendhandle} className=" underline cursor-pointer hover:text-cyan-400">{resendloading ? (
    <>
      resend email
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        fill="#000"
        className="ml-2 inline text-black animate-spin"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          data-original="#000000"
        />
      </svg>
    </>
  ) : (
    "resend email"
  )}</div>)}</p>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                        >
                           {actionloading ? "Loading..." : " Verify Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPVerify;