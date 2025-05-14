import axios from "axios"
import { setAdmin_User_Update, setAdminUpdateLoading, setAllBuyers, setAllProperties, setAllPropertyLoading, setAllSellers, setAllUsers, setAllWhishLists, setbuyerloading, setError, setsellerloading, setuserloading, setWhishLoadingg } from "../slice/adminSlice";
import { toast } from "react-toastify";

export const Fetch_All_Users = ()=>async(dispatch)=>{
    dispatch(setuserloading())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/user/allusers",{
            withCredentials:true
        });
        dispatch(setAllUsers(data.users));
    } catch (error) {
        dispatch(setError(
            error.response?.data?.message || error.response?.data?.error
        ))
    }
}
export const Fetch_All_Properties_Admin = ()=>async(dispatch)=>{
    dispatch(setAllPropertyLoading())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/property/admin-properties",{
            withCredentials:true
        });
        dispatch(setAllProperties(data.properties));
    } catch (error) {
        dispatch(setError(
            error.response?.data?.message || error.response?.data?.error
        ))
    }
}
export const Fetch_All_Buyers = ()=>async(dispatch)=>{
    dispatch(setbuyerloading())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/p_contact/allbuyers",{
            withCredentials:true
        });
        dispatch(setAllBuyers(data.buyers));
    } catch (error) {
        dispatch(setError(
            error.response?.data?.message || error.response?.data?.error
        ))
    }
}
export const Fetch_All_Sellers = ()=>async(dispatch)=>{
    dispatch(setsellerloading())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/seller/allsellers",{
            withCredentials:true
        });
        dispatch(setAllSellers(data.sellers));
    } catch (error) {
        dispatch(setError(
            error.response?.data?.message || error.response?.data?.error
        ))
    }
}
export const Fetch_All_WhishLists = ()=>async(dispatch)=>{
    dispatch(setWhishLoadingg())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/whish/whishlists",{
            withCredentials:true
        });
        dispatch(setAllWhishLists(data.whishLists));
    } catch (error) {
        dispatch(setError(
            error.response?.data?.message || error.response?.data?.error
        ))
    }
}
export const Admin_Update_Users = (id,role,close)=>async(dispatch)=>{
    dispatch(setAdminUpdateLoading())
    try {
        const {data} = await axios.put(`https://real-estate-server-two-olive.vercel.app/user/updateuser/${id}`,{role},{
            withCredentials:true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(setAdmin_User_Update(data.user));
        toast(data.message)
        setTimeout(() => {
            close()
        }, 100);
    } catch (error) {
        dispatch(setError(
            error.response?.data?.message || error.response?.data?.error
        ))
        toast.error(error.response?.data?.message || error.response?.data?.error)
    } finally{
        dispatch(setAdminUpdateLoading(false))
    }
}