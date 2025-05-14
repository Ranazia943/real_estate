/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { CancelToggle, setCreateLoader, setCreateSeller, setDeleteContact, setError, setSellerLoading, setSellers, setToggleloading } from "../slice/sellerSlice";
import { toast } from "react-toastify";

export const CreateSellerContact = (id,dataa)=>async(dispatch)=>{
    dispatch(setCreateLoader())
    try {
        const {data} = await axios.post(`https://real-estate-server-two-olive.vercel.app/seller/create/${id}`,dataa,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setCreateSeller(data.sellercontact));
        toast(data.message)
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)   
    } finally {
        dispatch(setCreateLoader(false))
    }
}

export const AgentSellersContacts = ()=>async(dispatch)=>{
    dispatch(setSellerLoading())
    try {
        const {data} = await axios.get(`https://real-estate-server-two-olive.vercel.app/seller/a_sellers`,{
            withCredentials:true
        });
        dispatch(setSellers(data.sellerContacts));
    } catch (error) {
    dispatch(setError(error.response?.data?.message || error?.response?.data?.error))
    }
}
export const UserSellersContacts = ()=>async(dispatch)=>{
    dispatch(setSellerLoading())
    try {
        const {data} = await axios.get(`https://real-estate-server-two-olive.vercel.app/seller/u_sellers`,{
            withCredentials:true
        });
        dispatch(setSellers(data.sellerContacts));
    } catch (error) {
    dispatch(setError(error.response?.data?.message || error?.response?.data?.error))
    }
}

export const DeleteSellerContact = (id)=>async(dispatch)=>{
    dispatch(setCreateLoader())
    try {
        const {data} = await axios.delete(`https://real-estate-server-two-olive.vercel.app/seller/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeleteContact(data.sellerContact));
        toast.success(data.message)
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)   
    } finally {
        dispatch(setCreateLoader(false))
    }
}
export const Toggle_Cancel = (id)=>async(dispatch)=>{
    dispatch(setToggleloading())
    try {
        const {data} = await axios.get(`https://real-estate-server-two-olive.vercel.app/seller/cancel/${id}`,{
            withCredentials:true
        });
        dispatch(CancelToggle(data.seller));
        toast.success(data.message)
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)   
    } finally {
        dispatch(setToggleloading(false))
    }
}