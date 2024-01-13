import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import '../App.css'

function CreateProject() {
  return (
    <div className='create-project'>
      <div className='create-project-input-section'>
        <small>Project Name:</small>
        <input type="text"></input>
      </div>
      <button>Create</button>
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreateProject />
  </React.StrictMode>,
)