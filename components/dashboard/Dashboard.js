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
    const { projects } = this.props
    return (
      <div>
        <Navbar />
        <div className="center">
          <PMWorkload projects={projects} />
          <div className="item1">
            <TasksPerProject projects={projects} />
          </div>
          <div className="item2">
            <ProjectsByStatus projects={projects} />
          </div>
        </div>
      </div>
    );
  }
}
