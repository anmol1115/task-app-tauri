import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import '../App.css'

import { invoke } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'

function EditTask() {
  const [taskName, setTaskName] = useState(null)
  const [taskDesc, setTaskDesc] = useState(null)

  function handleSubmit() {
    invoke('update_task', {"taskName": taskName, "taskDesc": taskDesc})
    invoke('get_projects').then((updated_data) => {
      localStorage.setItem("updated_data", updated_data)
    })
    appWindow.close();
  }

  return(
    <div className='create-task'>
      <div className='create-task-input-section'>
        <div>
          <small>New Task Name</small>
          <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)}/>
        </div>
        <div>
          <small>New Task Description</small>
          <input type="text" value={taskDesc} onChange={e => setTaskDesc(e.target.value)}/>
        </div>
      </div>
      <button onClick={handleSubmit}>Edit</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <EditTask />
    </React.StrictMode>,
  )