import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import '../App.css'

function CreateTask() {
  return (
    <div className='create-task'>
      <div className='create-task-input-section'>
        <div>
          <small>Task Name</small>
          <input type="text"></input>
        </div>
        <div>
          <small>Task Description</small>
          <input type="text"></input>
        </div>
        <div>
          <small>Task Status</small>
          <select>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
      <button>Create</button>
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreateTask />
  </React.StrictMode>,
)