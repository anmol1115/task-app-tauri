import React from 'react'
import {invoke} from '@tauri-apps/api'

function NoProject(props) {
  let {projects, setSelectedProject} = props
  return (
    <div className='no-project'>
        <div className='no-project-title'>
            <small>Select/Create a Project</small>
            <button onClick={()=>{ invoke('new_project_window') }}>+</button>
        </div>
        <div className='project-button-container'>
            {
                projects.map(element => {
                    let [_id, name] = element
                    return <div key={_id} onClick={_=>{setSelectedProject(_id)}}>{name}</div>
                })
            }
        </div>
    </div>
  )
}

export default NoProject