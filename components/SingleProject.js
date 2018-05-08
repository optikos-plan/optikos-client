import React, { Component } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default class SingleProject extends Component {
  constructor() {
    super()
    this.state = {
      taskSelected: true,
      taskCompleted: false
    }
    this.updateTaskCompleted = this.updateTaskCompleted.bind(this)
  }

  updateTaskCompleted () {
    this.setState({
      taskCompleted: !this.state.taskCompleted
    })
  }

  render() {
    const {taskSelected, taskCompleted} = this.state
    return (
      <div id="singleProject">
        <Navbar />
        <div>
          <div>
            <Sidebar taskSelected={taskSelected} taskCompleted={taskCompleted} updateTaskCompleted={this.updateTaskCompleted} />
          </div>
          <div>
            <h5>Diagrams go here</h5>
          </div>
        </div>
      </div>
    )
  }
}
