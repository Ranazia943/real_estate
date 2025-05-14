import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    teams:[],
    teamloading:false,
    loading:false,
    teamdelloading:false,
    updateloading:false,
    error:null
}

const teamSlice = createSlice({
    name:"Team",
    initialState,
    reducers:{
        setTeams:(state,action)=>{
            state.loading=false
            state.error=null
            state.teams=action.payload
        },
        setCreateMember:(state,action)=>{
            state.teamloading=false
            state.error=null
            const exist = state.teams.find((item)=>item._id === action.payload._id)
            if(exist){
                state.teams = state.teams.map((item)=>item._id === action.payload._id?action.payload:item)
            }else{
                state.teams.push(action.payload)
            }
        },
        setUpdateMember:(state,action)=>{
            state.updateloading=false
            state.error=null
            state.teams = state.teams.map((item)=>item._id === action.payload._id ? action.payload :item)
        },
        setDeleteMember:(state,action)=>{
            state.teamdelloading=false
            state.error=null
            state.teams=state.teams.filter(pb=>pb._id!==action.payload._id)
        },
        setTeamLoading:(state,action)=>{
            if(action.payload===undefined){
                state.teamloading=true
            }else{
                state.teamloading=action.payload
            }
        },
        setUpdateloading:(state,action)=>{
            if(action.payload===undefined){
                state.updateloading=true
            }else{
                state.updateloading=action.payload
            }
        },
        setDeleteloading:(state,action)=>{
            if(action.payload===undefined){
                state.teamdelloading=true
            }else{
                state.teamdelloading=action.payload
            }
        },
        setLoading:(state)=>{
            state.loading=true
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const { setTeams,setDeleteloading, setTeamLoading, setError,setCreateMember, setLoading,setUpdateloading,setDeleteMember,setUpdateMember } = teamSlice.actions

export default teamSlice.reducer;