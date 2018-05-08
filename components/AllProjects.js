import React, { Component } from 'react'
import Navbar from './Navbar'
import GenericCardGrid from './GenericCardGrid'

export default class AllProjects extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="allProjects">
        <Navbar />
        <GenericCardGrid type="projects" />
      </div>
    )
  }
}
