import axios from "axios"
import { setCreateMember, setDeleteloading, setDeleteMember, setLoading, setTeamLoading, setTeams, setUpdateloading, setUpdateMember } from "../slice/teamSlice";
import { toast } from "react-toastify";

export const Create_Team_member = (deta,navigate)=>async(dispatch)=>{
    dispatch(setTeamLoading())
    try {
        const {data} = await axios.post("https://real-estate-server-two-olive.vercel.app/team/create",deta,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setCreateMember(data.member));
        toast(data.message)
        navigate("/admin-dashboard-allmembers")
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
    } finally {
        dispatch(setTeamLoading(false))
    }
}
export const Fetch_Team_Members = ()=>async(dispatch)=>{
    dispatch(setLoading())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/team/teams",{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setTeams(data.teams));
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
    }
}
export const Update_Team_Member = (id,deta,close)=>async(dispatch)=>{
    dispatch(setUpdateloading())
    try {
        const {data} = await axios.put(`https://real-estate-server-two-olive.vercel.app/team/update/${id}`,deta,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setUpdateMember(data.member));
        close()
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
    } finally{
        dispatch(setUpdateloading(false))
    }
}
export const Delete_Team_Member = (id,)=>async(dispatch)=>{
    dispatch(setDeleteloading())
    try {
        const {data} = await axios.delete(`https://real-estate-server-two-olive.vercel.app/team/delete/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setDeleteMember(data.member));
        toast(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
    } finally{
        dispatch(setDeleteloading(false))
    }
}
