import React, { useState, useEffect } from 'react'
import ProjectSection from './components/ProjectSection'
import TaskSection from './components/taskSection'
import NoProject from './components/NoProject'
import data from './dummyData'

import './App.css'

function App() {
  const [projects, setProjects] = useState(data.map(element => [element._id, element.name]))
  const [tasks, setTasks] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (selectedProject) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === selectedProject) {
          setTasks(data[i].tasks.slice())
          break
        }
      }
    }

  }, [selectedProject])
  
  return (
    <div className='main-container'>
      <ProjectSection projects={projects} setSelectedProject={setSelectedProject}/>
      <div className='vertical-separator'></div>
      {
        !(tasks === null) ?
        <TaskSection tasks={tasks}/> :
        <NoProject projects={projects} setSelectedProject={setSelectedProject}/>
      }
    </div>
  )
}

export default App