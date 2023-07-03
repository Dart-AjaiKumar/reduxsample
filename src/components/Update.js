import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatetaskstoserver } from '../slice/TaskSlice'

const Update = ({updatemodal,setUpdateModal,ModelPop}) => {

    const [title,setTitle] = useState('')
    const [taskbody,setTaskBody] = useState('')
    const [id,setId] = useState('')
    const {selectedtask} = useSelector((state) => state.tasks)
    const dispatch = useDispatch()

    const Cancel =()=>{
        setUpdateModal(!updatemodal)
    }
    const UpdateTask =()=>{
        console.log("updated")
        setUpdateModal(!updatemodal)
        dispatch(updatetaskstoserver({id,title,taskbody}))
    }
useEffect(()=>{
    if(Object.keys(selectedtask).length !== 0) {
    setTitle(selectedtask.title)
    setTaskBody(selectedtask.taskbody)
    setId(selectedtask.id)
    }
},[selectedtask]);

  return (
    <div>
       {!updatemodal && ( 
      
      <div className="modal">
        <div className="overlay"></div>
        <div className="model-content">
            <h3>Update Task</h3>
            <input
                    type = "text"
                    placeholder='Enter Title'
                    value ={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required
                ></input><br/>
                <label htmlFor='Task Body'></label>
                <input
                    type = "text"
                    placeholder='Enter Task'
                    value ={taskbody}
                    onChange={(e) => setTaskBody(e.target.value)}
                    required
                ></input><br/><br/>
                <button onClick={()=> Cancel()}>Cancel</button>
                <button onClick={() => UpdateTask()}>Update Data</button>
                
            </div>
      </div>
        )}
    </div>
  )
}

export default Update

