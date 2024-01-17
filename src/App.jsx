import React, { useState, useEffect } from 'react'
import ProjectSection from './components/ProjectSection'
import TaskSection from './components/taskSection'
import NoProject from './components/NoProject'

import { invoke } from '@tauri-apps/api'

import './App.css'

function App() {
  const [data, setData] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    invoke('get_projects').then((response) => {
      response = JSON.parse(response)
      setData(response)
    })
  }, [])

  useEffect(() => {
    setProjects(data.map(element => [element._id, element.name]))
  
  }, [data])
  

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
      <ProjectSection projects={projects} setSelectedProject={setSelectedProject} setData={setData}/>
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