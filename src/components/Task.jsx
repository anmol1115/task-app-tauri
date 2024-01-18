import React from 'react'
import { MdEdit, MdDeleteOutline, MdCheck, MdCancel } from "react-icons/md";

import { invoke } from '@tauri-apps/api'

function Task(props) {
  function handleDelete() {
    invoke('delete_task', {'taskId': id})
    invoke('get_projects').then((response) => {
      response = JSON.parse(response)
      setData(response)
    }) 
  }

  function handleCompleted() {
    invoke('mark_as_completed', {'taskId': id})
    invoke('get_projects').then((response) => {
      response = JSON.parse(response)
      setData(response)
    })
  }

  function handlePending() {
    invoke('mark_as_pending', {'taskId': id})
    invoke('get_projects').then((response) => {
      response = JSON.parse(response)
      setData(response)
    })
  }

  let {id, name, desc, setData, section} = props
  return (
    <>
      <div className='task'>
        <small>{name}</small>
        <small className='task-desc'>{desc}</small>
        <div className='task-buttons'>
          {
            section==="Pending Tasks"?
            <MdCheck onClick={handleCompleted}/>:
            <MdCancel onClick={handlePending}/>
          }
          <MdEdit />
          <MdDeleteOutline onClick={handleDelete}/>
        </div>
      </div>
    </>
  )
}

export default Task