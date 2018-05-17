import React, { Component } from "react";
import Navbar from "../Navbar";
import PMWorkload from "./PMWorkload";
import TasksPerProject from "./TasksPerProject";
import ProjectsByStatus from "./ProjectsByStatus";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("projects", this.props.projects)
    return (
      <div>
        <Navbar />
        <div className="center">
          <PMWorkload />
          <div className="item1">
            <TasksPerProject />
          </div>
          <div className="item2">
            <ProjectsByStatus />
          </div>
        </div>
      </div>
    );
  }
}
