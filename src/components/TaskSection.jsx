import React, { useState, useEffect } from 'react'
import Tasks from './Tasks'

import { invoke } from '@tauri-apps/api'

function TaskSection(props) {
  let {tasks, setData} = props
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
          <button onClick={() => { invoke("new_task_window") }}>+</button>
        </div>
        <div className='task-wrapper'>
          <Tasks title={'Pending Tasks'} tasks={pendingTasks} setData={setData}/>
          <div className='vertical-separator'></div>
          <Tasks title={'Completed Tasks'} tasks={completedTasks} setData={setData}/>
        </div>
    </div>
  )
}

export default TaskSection