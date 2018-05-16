import React, { Component } from 'react'
import Navbar from '../Navbar'
import PMWorkload from './PMWorkload'
import TasksPerProject from './TasksPerProject'

export default class Dashboard extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Navbar />
        <PMWorkload />
        <TasksPerProject />
      </div>
    )
  }
}
