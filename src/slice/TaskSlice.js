import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";


const BASE_URL = 'http://localhost:3500/tasks'

const initialState={
    tasklist:[],
    selectedtask:{},
    isLoading:false,
    error:''
}

    export const gettasksfromserver = createAsyncThunk(
        "tasks/gettaskFromserver",
        async() =>{
            try{
                const response= await axios.get(BASE_URL)
                return response.data         
            }catch(err){
                console.log(err.message)
            }
        }
    )

//POST

export const addtaskstoserver = createAsyncThunk(
    "tasks/addtaskstoserver",
    async(task,) =>{
        try{
            const response= await axios.post(BASE_URL,task);
            return response.data
            
        }catch(err){
            console.log(err.message)
        }

    }
)

//UPDATE


export const updatetaskstoserver = createAsyncThunk(
    "tasks/updatetaskstoserver",
    async(task,) =>{
        try{
            const response= await axios.put(BASE_URL+'/'+ task.id,task);
            return response.data
            
        }catch(err){
            console.log(err.message)
        }
    }
)

//DELETE

export const deletetaskstoserver = createAsyncThunk(
    "tasks/deletetaskstoserver",
    async(task,) =>{
        try{
            const response= await axios.delete(BASE_URL+'/'+ task.id,task);
            return response.data
            
        }catch(err){
            console.log(err.message)
        }
    }
)


const taskslice = createSlice({
    name:'taskslice',
    initialState,
    reducers:{
        removeFromList:(state,action)=>{
            state.tasklist = state.tasklist.filter((task) => task.id !== action.payload.id)
        },
        setSelectedTask:(state,action) => {
            state.selectedtask =action.payload
        }
    },

    extraReducers:(builder) =>{
        builder

        //GET
            .addCase(gettasksfromserver.pending,(state)=>{
                state.isLoading = true

            })
            .addCase(gettasksfromserver.fulfilled,(state,action)=>{
                state.isLoading = false
                state.error =''
                state.tasklist = action.payload 
            })
            .addCase(gettasksfromserver.rejected,(state,action)=>{
                state.isLoading = false
                state.error =action.payload.error
                state.tasklist = [] 
            })
        
        //ADD

            .addCase(addtaskstoserver.pending,(state) => {
                state.isLoading = true
            })
            .addCase(addtaskstoserver.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasklist.push(action.payload)
            })
            .addCase(addtaskstoserver.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
        
        //UPDATE

            .addCase(updatetaskstoserver.pending,(state) => {
                state.isLoading = true
            })
            .addCase(updatetaskstoserver.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasklist=state.tasklist.map((task) => task.id === action.payload.id ? action.payload:task)
            })
            .addCase(updatetaskstoserver.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })


         //DELETE

            .addCase(deletetaskstoserver.pending,(state) => {
                state.isLoading = true
            })
            .addCase(deletetaskstoserver.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(deletetaskstoserver.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })


    }

})

export const {addTasktoList,removeFromList,updateTaskinList,setSelectedTask} = taskslice.actions

export default taskslice.reducer