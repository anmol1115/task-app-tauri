import React from 'react'
import Task from './Task'

function Tasks(props) {
  let {title, tasks} = props
  return (
    <div className='width-full'>
      <div className='task-wrapper-title'>{title}</div>
      <div className='task-wrapper-content'>
        {
          tasks.map(ele => {
            return <Task key={ele._id} name={ele.name} desc={ele.description}/>
          })
        }
      </div>
    </div>
  )
}

export default Tasks