import React from 'react'

import { invoke } from '@tauri-apps/api'

function Project(props) {
  function handleClick(id) {
    invoke('select_project', {"projectId": id})
    setSelectedProject(id)
  }
  const {name, id, setSelectedProject} = props
  
  return (
    <div className='project' onClick={_ => {handleClick(id)}}>{name}</div>
  )
}

export default Project