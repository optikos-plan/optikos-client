import React, { Component } from 'react'
import Navbar from '../Navbar'
import TaskNode from '../task-diagram'

export default class SingleProject extends Component {

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
