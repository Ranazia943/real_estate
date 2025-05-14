import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    my_whishlist:[],
    createwhishloading:false,
    whishdelloading:false,
    whishloading:false,
    error: null
}

const whishSlice = createSlice({
    name:"Whish",
    initialState,
    reducers:{
        setWhishList:(state,action)=>{
            state.whishloading=false
            state.error=null
            state.my_whishlist=action.payload
        },
        setCreateWhishItem:(state,action)=>{
            state.createwhishloading=false
            state.error=null
            state.my_whishlist.push(action.payload)
        },
        setDeleteWhishItem:(state,action)=>{
            state.whishdelloading=false
            state.error=null
            state.my_whishlist=state.my_whishlist.filter((item)=>item._id!==action.payload._id)
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setWhishLoading:(state)=>{
            state.whishloading = true
        },
        setCreateWhishLoading:(state,action)=>{
            if(action.payload===undefined){
                state.createwhishloading=true
            } else{
                state.createwhishloading=action.payload
            }
        },
        setDeleteWhishLoading:(state,action)=>{
            if(action.payload===undefined){
                state.whishdelloading=true
            } else{
                state.whishdelloading=action.payload
            }
        },

    }
})

export const { setWhishList, setCreateWhishItem, setDeleteWhishItem, setError, setWhishLoading, setCreateWhishLoading, setDeleteWhishLoading } = whishSlice.actions

export default whishSlice.reducer;