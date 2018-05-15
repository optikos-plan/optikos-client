import React from 'react'
import Navbar from '../Navbar'
import TaskNode from '../task-diagram'

const SingleProject = props => {
  const { projects, routeProps } = props
  const projectId = routeProps.match.params.id

  const project = projects.filter(singProject => singProject.id === projectId)[0]

  console.log('Props: ', props)

  return (
    <div id="singleProject">
      <Navbar />
      <div className="testFlex">
        <TaskNode tasks={project.tasks} />
      </div>
    </div>
  )
}

export default SingleProject
