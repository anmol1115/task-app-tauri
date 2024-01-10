import React from 'react'
import Project from './project'

function ProjectSection(props) {
  let {projects, setSelectedProject} = props
  return (
    <div className='project-container'>
        <div className='project-title'>
            <small>Projects</small>
            <button>+</button>
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