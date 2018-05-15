import React, { Component } from 'react'
import Navbar from '../Navbar'
import ProjectList from './ProjectList'

export default class AllProjects extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="allProjects">
        <Navbar />
        <ProjectList  />
      </div>
    )
  }
}
