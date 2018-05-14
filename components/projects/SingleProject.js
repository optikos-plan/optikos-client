import React, { Component } from 'react'
import Navbar from '../Navbar'
import TaskNode from '../task-diagram'

export default class SingleProject extends Component {
  constructor(props) {
    super()
    this.state = {
      tasks: props.tasks
    }
    this.createTask = this.createTask.bind(this)
  }

  createTask(task) {
 const oldTasks = [...this.state.tasks]
 console.log("old state", this.state.tasks)
 this.setState({tasks: [...oldTasks, task]})
 console.log("new state", this.state.tasks)
  }
  
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
          <TaskNode createTask={this.createTask} tasks={this.state.tasks} />
        </div>
      </div>
    )
  }
}
