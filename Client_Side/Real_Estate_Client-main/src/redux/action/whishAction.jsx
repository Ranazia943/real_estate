
import axios from "axios"
import { setCreateWhishItem, setCreateWhishLoading, setDeleteWhishItem, setDeleteWhishLoading, setWhishList, setWhishLoading } from "../slice/whishSlice";
import { toast } from "react-toastify";

export const Create_WhishItem = (item)=>async(dispatch)=>{
    dispatch(setCreateWhishLoading())
    try {
        const {data} = await axios.post("https://real-estate-server-two-olive.vercel.app/whish/create",item,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setCreateWhishItem(data.whishItem));
        toast(data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setCreateWhishLoading(false))
    }
}
export const My_WhishhItems = ()=>async(dispatch)=>{
    dispatch(setWhishLoading())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/whish/mylists",{
            withCredentials:true
        });
        dispatch(setWhishList(data.whishLists));
    } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
    }
}
export const Delete_WhishItem = (id)=>async(dispatch)=>{
    dispatch(setDeleteWhishLoading())
    try {
        const {data} = await axios.delete(`https://real-estate-server-two-olive.vercel.app/whish/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeleteWhishItem(data.whishItem));
        toast(data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setDeleteWhishLoading(false))
    }
}
