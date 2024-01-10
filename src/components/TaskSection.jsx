import React from 'react'
import Tasks from './Tasks'

function TaskSection() {
  return (
    <div className='task-container'>
        <div className='task-title'>
          <small>Tasks</small>
          <button>+</button>
        </div>
        <div className='task-wrapper'>
          <Tasks title={'Pending Tasks'}/>
          <div className='vertical-separator'></div>
          <Tasks title={'Completed Tasks'}/>
        </div>
    </div>
  )
}

export default TaskSection