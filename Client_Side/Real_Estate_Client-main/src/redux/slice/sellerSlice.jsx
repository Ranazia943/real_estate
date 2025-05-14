import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sellers:[],
    seller:null,
    sellerloading:false,
    error: null,
    createloading:false,
    toggleloading:false,
}

const sellerSlice = createSlice({
    name:"Seller",
    initialState,
    reducers:{
        setCreateSeller:(state,action)=>{
            state.createloading = false
            state.error = null
            const exist = state.sellers.find((item)=>item._id === action.payload._id);
            if(exist){
                state.sellers = state.sellers.map((item)=>item._id === action.payload._id?action.payload:item)
            }else{
                state.sellers.push(action.payload)
            }
        },
        setSellers:(state,action)=>{
            state.sellerloading = false
            state.error=null
            state.sellers=action.payload
        },
        setCreateLoader:(state,action)=>{
            if(action.payload == undefined){
                state.createloading = true
            }else{
                state.createloading = action.payload
            }
        },
        setToggleloading:(state,action)=>{
            if(action.payload == undefined){
                state.toggleloading = true
            }else{
                state.toggleloading = action.payload
            }
        },
        CancelToggle:(state,action)=>{
            state.toggleloading = false
            state.error=null
            const exist = state.sellers.find((item)=>item._id === action.payload._id);
            if(exist){
                state.sellers = state.sellers.map((item)=>item._id === action.payload._id?{...item, actions: {...item.actions, cancel:!item.actions.cancel }}:item)
            }
        },
        setDeleteContact:(state,action)=>{
            state.createloading = false
            state.error=null
            state.sellers=state.sellers.filter(pb=>pb._id !== action.payload._id)
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setSellerLoading: (state)=>{
            state.sellerloading = true
        }
    }
})


export const { setCreateSeller, setCreateLoader,setSellerLoading,setSellers,setError,setDeleteContact,setToggleloading,CancelToggle } = sellerSlice.actions;

export default sellerSlice.reducer;