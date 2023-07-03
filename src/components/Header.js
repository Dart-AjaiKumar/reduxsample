import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {

    const {tasklist,error} = useSelector((state) => state.tasks)
   return (
    <div>
      <h1>Task Management</h1>
      <h3>{`Currently ${tasklist.length} Task(s) Pending`}</h3>
      {
        (error !== '')?<h3>{error}</h3> : null
      }
    </div>
  )
}

export default Header
