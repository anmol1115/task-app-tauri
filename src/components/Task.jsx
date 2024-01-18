import React from 'react'
import { MdEdit, MdDeleteOutline } from "react-icons/md";

import { invoke } from '@tauri-apps/api'

function Task(props) {
  function handleDelete() {
    invoke('delete_task', {'taskId': id})
    invoke('get_projects').then((response) => {
      response = JSON.parse(response)
      setData(response)
    }) 
  }

  let {id, name, desc, setData} = props
  return (
    <>
      <div className='task'>
        <small>{name}</small>
        <small className='task-desc'>{desc}</small>
        <div className='task-buttons'>
          <MdEdit />
          <MdDeleteOutline onClick={handleDelete}/>
        </div>
      </div>
    </>
  )
}

export default Task