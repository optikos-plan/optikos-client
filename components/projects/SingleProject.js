import React, { Component } from 'react'
import Navbar from '../Navbar'
import TaskNode from '../task-diagram'

export default class SingleProject extends Component {
  /* constructor() {
   *   super()
   *   this.state = {
   *     taskSelected: true,
   *     taskCompleted: false
   *   }
   *   this.updateTaskCompleted = this.updateTaskCompleted.bind(this)
   * } */

  /* updateTaskCompleted() {
   *   this.setState({
   *     taskCompleted: !this.state.taskCompleted
   *   })
   * } */

  render() {
    return (
      <div id="singleProject">
        <Navbar />
        <div className="testFlex">
          <TaskNode tasks={this.props.tasks} />
        </div>
      </div>
    )
  }
}
