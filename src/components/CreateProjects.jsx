import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import '../App.css'

import { invoke } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'

function CreateProject() {
  const [projectName, setProjectName] = useState("")

  function handleSubmit() {
    invoke('create_project', {"projectName": projectName})
    invoke('get_projects').then((updated_data) => {
      localStorage.setItem("updated_data", updated_data)
    })
    appWindow.close()
  }

  return (
    <div className='create-project'>
      <div className='create-project-input-section'>
        <small>Project Name:</small>
        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)}></input>
      </div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreateProject />
  </React.StrictMode>,
)