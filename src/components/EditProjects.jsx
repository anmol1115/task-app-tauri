import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import '../index.css';
import '../App.css';

import { invoke } from '@tauri-apps/api'

function EditProject() {
  function handleSubmit() {
    invoke('update_project', {"projectName": name})
    invoke('get_projects').then((updated_data) => {
      localStorage.setItem("updated_data", updated_data)
    })
  }

  const [name, setName] = useState("")
  return (
    <div className="create-project">
      <div className="create-project-input-section">
        <small>New Project Name:</small>
        <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
      </div>
      <button onClick={handleSubmit}>Edit</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <EditProject />
    </React.StrictMode>,
  )