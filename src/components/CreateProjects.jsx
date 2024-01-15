import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import '../App.css'

import { invoke } from '@tauri-apps/api'

function CreateProject() {
  const [projectName, setProjectName] = useState("")

  function handleSubmit() {
    invoke('create_project', {"projectName": projectName})
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