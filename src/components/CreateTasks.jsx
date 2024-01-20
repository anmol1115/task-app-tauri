import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import '../App.css'

import { invoke } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'

function CreateTask() {
  const [taskName, setTaskName] = useState("")
  const [taskDesc, setTaskDesc] = useState("")
  const [taskStatus, setTaskStatus] = useState("pending")

  function handleSubmit() {
    invoke('create_task', {"taskName": taskName, "taskDesc": taskDesc, "taskStatus": taskStatus})
    invoke('get_projects').then((updated_data) => {
      localStorage.setItem("updated_data", updated_data)
    })
    appWindow.close()
  }

  return (
    <div className='create-task'>
      <div className='create-task-input-section'>
        <div>
          <small>Task Name</small>
          <input value={taskName} onChange={(e) => {setTaskName(e.target.value)}} type="text"></input>
        </div>
        <div>
          <small>Task Description</small>
          <input value={taskDesc} onChange={(e) => {setTaskDesc(e.target.value)}} type="text"></input>
        </div>
        <div>
          <small>Task Status</small>
          <select value={taskStatus} onChange={e => {setTaskStatus(e.target.value)}}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreateTask />
  </React.StrictMode>,
)