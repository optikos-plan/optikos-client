import React from 'react'
import { Route } from 'react-router-dom'
import AllProjects from './AllProjects'

const Main = () => {
  return (
    <div id="main">
      <Route exact path="/" component={AllProjects} />
    </div>
  )
}
export default Main
