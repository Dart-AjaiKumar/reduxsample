import React, { useState } from 'react'
import {  addtaskstoserver } from '../slice/TaskSlice'
import { useDispatch } from 'react-redux'

const Addtask = () => {

    const dispatch = useDispatch()
    const [title,setTitle] = useState('')
    const [taskbody,setTaskBody] = useState('')

    const handlesubmit =(e) =>{
        e.preventDefault()
        dispatch(addtaskstoserver({title,taskbody}))
        setTaskBody('')
        setTitle('')
    }
  return (
    <div>
        <form onSubmit={(e) =>handlesubmit(e)}>
            <label htmlFor='title'></label>
            <input
                type = "text"
                placeholder='Enter Title'
                required
                value ={title}
                onChange={(e)=>setTitle(e.target.value)}
                
            ></input><br/>
            <label htmlFor='Task Body'></label>
            <input
                type = "text"
                placeholder='Enter Task'
                value ={taskbody}
                onChange={(e) => setTaskBody(e.target.value)}
                required
            ></input><br/>
            <button type='submit'>Add Task</button>
        </form>
      
    </div>
  )
}

export default Addtask
