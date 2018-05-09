import React from 'react'
import { Route } from 'react-router-dom'
import AllProjects from './projects/AllProjects'
import SingleProject from './projects/SingleProject'
import AllPeople from './people/AllPeople'

const Main = () => {
  return (
    <div id="main">
      <Route path="/projects/:id" component={SingleProject} />
      <Route exact path="/people" component={AllPeople} />
      <Route exact path="/projects" component={AllProjects} />
      <Route exact path="/" component={AllProjects} />
    </div>
  )
}
export default Main
