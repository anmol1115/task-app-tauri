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
    invoke('unselect_project')
    invoke('unselect_task')
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

  useEffect(() => {
    if (selectedProject) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === selectedProject) {
          setTasks(data[i].tasks.slice())
          break
        }
      }
    }

  }, [selectedProject, data])
  
  return (
    <div className='main-container'>
      <ProjectSection projects={projects} setSelectedProject={setSelectedProject} setData={setData} setTasks={setTasks}/>
      <div className='vertical-separator'></div>
      {
        !(tasks === null) ?
        <TaskSection tasks={tasks} setData={setData}/> :
        <NoProject projects={projects} setSelectedProject={setSelectedProject}/>
      }
    </div>
  )
}

export default App