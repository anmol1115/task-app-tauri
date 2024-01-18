import React, {useEffect} from 'react'
import Project from './project'

import { invoke } from '@tauri-apps/api'

function ProjectSection(props) {
  function handleSubmit() {
    invoke('new_project_window')
  }

  let {projects, setSelectedProject, setData, setTasks} = props
  return (
    <div className='project-container'>
        <div className='project-title'>
            <small>Projects</small>
            <button onClick={handleSubmit}>+</button>
        </div>
        <div className='project-list'>
          {
            projects.map((project) => {
              let [_id, name] = project
              return <Project key={_id} name={name} id={_id} setSelectedProject={setSelectedProject} setData={setData} setTasks={setTasks}></Project>
            })
          }
        </div>
    </div>
  )
}

export default ProjectSection