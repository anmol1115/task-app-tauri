import React, { useState, useEffect } from 'react'
import Tasks from './Tasks'

function TaskSection(props) {
  let {tasks} = props
  const [completedTasks, setCompletedTasks] = useState([])
  const [pendingTasks, setPendingTasks] = useState([])

  useEffect(() => {
    let tempCompletedTasks = []
    let tempPendingTasks = []
    for(let i=0; i<tasks.length; i++) {
      if (tasks[i].status == "pending") {
        tempPendingTasks.push(tasks[i])
      } else {
        tempCompletedTasks.push(tasks[i])
      }
    }

    setCompletedTasks(tempCompletedTasks)
    setPendingTasks(tempPendingTasks)

  }, [tasks])
  

  return (
    <div className='task-container'>
        <div className='task-title'>
          <small>Tasks</small>
          <button>+</button>
        </div>
        <div className='task-wrapper'>
          <Tasks title={'Pending Tasks'} tasks={pendingTasks}/>
          <div className='vertical-separator'></div>
          <Tasks title={'Completed Tasks'} tasks={completedTasks}/>
        </div>
    </div>
  )
}

export default TaskSection