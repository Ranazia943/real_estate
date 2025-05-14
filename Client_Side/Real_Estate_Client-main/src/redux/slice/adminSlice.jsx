import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allusers:[],
    allbuyers:[],
    allsellers:[],
    allwhishlists:[],
    allproperties:[],
    whishloadingg:false,
    userloading:false,
    buyerloading:false,
    p_loading:false,
    sellerloading:false,
    userdelloading:false,
    updateloading:false,
    error: null,
}

const adminSlice = createSlice({
    name:"Admin",
    initialState,
    reducers:{
        setAllUsers:(state,action)=>{
            state.userloading = false
            state.error=null
            state.allusers=action.payload
        },
        setAllBuyers:(state,action)=>{
            state.buyerloading = false
            state.error=null
            state.allbuyers=action.payload
        },
        setAllProperties:(state,action)=>{
            state.p_loading = false
            state.error=null
            state.allproperties=action.payload
        },
        setAllSellers:(state,action)=>{
            state.sellerloading = false
            state.error=null
            state.allsellers=action.payload
        },
        setDeleteUser:(state,action)=>{
            state.userdelloading = false 
            state.error=null
            state.allusers=state.allusers.filter(user=>user._id!==action.payload._id)
        },
        setAdmin_User_Update:(state,action)=>{
            state.updateloading = false
            state.error=null
            state.allusers = state.allusers.map((item)=>item._id === action.payload._id ? {...item,role:action.payload.role} :item)
        },
        setAllWhishLists:(state, action) => {
            state.whishloadingg = false
            state.error=null
            state.allwhishlists=action.payload
        },
        setuserloading:(state)=>{
            state.userloading = true
        },
        setAllPropertyLoading:(state)=>{
            state.p_loading = true
        },
        setsellerloading:(state)=>{
            state.sellerloading = true
        },
        setbuyerloading:(state)=>{
            state.buyerloading = true
        },
        setWhishLoadingg:(state)=>{
            state.whishloadingg = true
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setDeleteUserLoading:(state,action)=>{
            if(action.payload===undefined){
                state.userdelloading=true
            }else{
                state.userdelloading = action.payload
            }
        },
        setAdminUpdateLoading:(state,action)=>{
            if(action.payload===undefined){
                state.updateloading=true
            }else{
                state.updateloading = action.payload
            }
        }
    }
})

export const { setAllUsers, setuserloading, setError,setAllBuyers,setbuyerloading,setAllSellers,setsellerloading,setDeleteUser,setDeleteUserLoading,setAdminUpdateLoading,setAdmin_User_Update,setAllWhishLists,setWhishLoadingg,setAllProperties,setAllPropertyLoading } = adminSlice.actions;

export default adminSlice.reducer;