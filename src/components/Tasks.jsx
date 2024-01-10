import React from 'react'

function Tasks(props) {
  let {title} = props
  return (
    <div className='width-full'>
      <div className='task-wrapper-title'>{title}</div>
    </div>
  )
}

export default Tasks