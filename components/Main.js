import React from 'react'
import { Route } from 'react-router-dom'
import AllProjects from './AllProjects'
import SingleProject from './SingleProject'

const Main = () => {
  return (
    <div id="main">
      <Route path="/projects/:id" component={SingleProject} />
      <Route exact path="/" component={AllProjects} />
    </div>
  )
}
export default Main
