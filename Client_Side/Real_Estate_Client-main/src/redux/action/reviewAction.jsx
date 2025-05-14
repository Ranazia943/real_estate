import axios from "axios";
import { setCreateReview, setCreateReviewloading, setDeleteReview, setDeleteReviewLoading, setReviewLoading, setReviews, setUpdateReview, setUpdateReviewLoading } from "../slice/reviewSlice";
import { toast } from "react-toastify";

export const Create_Review = (revieww)=>async(dispatch)=>{
    dispatch(setCreateReviewloading())
    try {
        const {data} = await axios.post("https://real-estate-server-two-olive.vercel.app/review/create",revieww,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch(setCreateReview(data.review));
        toast(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
    } finally {
        dispatch(setCreateReviewloading(false))
    }
}

export const Fetch_Reviews = ()=>async(dispatch)=>{
    dispatch(setReviewLoading())
    try {
        const {data} = await axios.get("https://real-estate-server-two-olive.vercel.app/review/reviews",{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch(setReviews(data.reviews));
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
        dispatch(error?.response?.data?.message || error.response?.data?.error)
    }
}

export const Update_Review = (id, revieww,close)=>async(dispatch)=>{
    dispatch(setUpdateReviewLoading())
    try {
        const {data} = await axios.put(`https://real-estate-server-two-olive.vercel.app/review/update/${id}`,revieww,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setUpdateReview(data.review));
        toast(data.message);
        setTimeout(() => {
            close()
        }, 200);
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setUpdateReviewLoading(false))
    }
}
export const Delete_Review = (id)=>async(dispatch)=>{
    dispatch(setDeleteReviewLoading())
    try {
        const {data} = await axios.delete(`https://real-estate-server-two-olive.vercel.app/review/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeleteReview(data.review));
        toast(data.message);
        close()
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setDeleteReviewLoading(false))
    }
}