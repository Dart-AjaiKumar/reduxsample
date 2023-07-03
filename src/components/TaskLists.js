import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletetaskstoserver, gettasksfromserver, setSelectedTask } from '../slice/TaskSlice'
import Update from './Update'
import { removeFromList } from '../slice/TaskSlice'

const TaskLists = () => {

    const {tasklist} = useSelector((state) => state.tasks)
    const [updatemodal,setUpdateModal] = useState('false')
    const dispatch = useDispatch()

    const ModelPop =(task)=>{
        setUpdateModal(!updatemodal)
        dispatch(setSelectedTask(task))
    }
    useEffect(()=>{
      dispatch(gettasksfromserver())
    },[dispatch])


    const DeleteTask =(task)=>{
        console.log("deleted")
        dispatch(deletetaskstoserver(task))
        .unwrap()
        .then(()=>{
          dispatch(removeFromList(task))
        }) 
    };

  return (
    <>
       <table align='center'className='table'>
        <thead>
            <tr>
                <th>No</th>
                <th>title</th>
                <th>body</th>
                <th>action</th>
            </tr>
        </thead>
        <tbody>
        { 
            tasklist && tasklist.map((task) =>{
                return (
                     <tr key ={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.taskbody}</td>
                        <td>
                        <button onClick={() => ModelPop(task)}>Update</button>
                        <button onClick={() => DeleteTask(task)}>Delete</button>
                        </td>
                    </tr>
                )
            } ) 
            
        } 
        </tbody>
      </table>
      <Update 
        updatemodal={updatemodal}
        setUpdateModal={setUpdateModal}
        ModelPop={ModelPop}
      />
    </>
  )
}

export default TaskLists
