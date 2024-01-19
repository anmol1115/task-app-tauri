import React from 'react'
import { MdEdit, MdDeleteOutline } from "react-icons/md";

import { invoke } from '@tauri-apps/api'

function Project(props) {
  function handleClick(id) {
    invoke('select_project', {"projectId": id})
    setSelectedProject(id)
  }
  
  function handleDelete() {
    invoke('delete_project', {"projectId": id})
    invoke('unselect_project')
    invoke('get_projects').then((response) => {
      response = JSON.parse(response)
      setData(response)
      setTasks(null)
    })
  }

  function handleEdit() {
    invoke('edit_project_window')
  }

  const {name, id, setSelectedProject, setData, setTasks} = props
  
  return (
    <div className='project' onClick={_ => {handleClick(id)}}>
      <div>
        {name}
      </div>
      <div className='project-buttons'>
        <MdEdit onClick={handleEdit}/>
        <MdDeleteOutline onClick={handleDelete}/>
      </div>
    </div>
  )
}

export default Project