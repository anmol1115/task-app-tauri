import React from 'react'

function Task(props) {
  let {name, desc} = props
  return (
    <div className='task'>
      <small>{name}</small>
      <small className='task-desc'>{desc}</small>
    </div>
  )
}

export default Task