import React from 'react'

function Project(props) {
  const {name, id, setSelectedProject} = props
  return (
    <div className='project' onClick={_ => {setSelectedProject(id)}}>{name}</div>
  )
}

export default Project