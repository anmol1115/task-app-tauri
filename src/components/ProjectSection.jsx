import React, {useEffect} from 'react'
import Project from './project'

import { invoke } from '@tauri-apps/api'

function ProjectSection(props) {
  function handleSubmit() {
    invoke('new_project_window')
  }

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key == "updated_data") {
        let updated_data = JSON.parse(localStorage.getItem("updated_data"))
        setData(updated_data)
      }
    }

    window.addEventListener("storage", handleStorageChange)
  
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])
  

  let {projects, setSelectedProject, setData} = props
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
              return <Project key={_id} name={name} id={_id} setSelectedProject={setSelectedProject}></Project>
            })
          }
        </div>
    </div>
  )
}

export default ProjectSection