import React, { Component } from "react";
import Navbar from "../Navbar";
import PMWorkload from "./PMWorkload";
import TasksPerProject from "./TasksPerProject";
import ProjectsByStatus from "./ProjectsByStatus";

export default class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
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
