import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";

const TasksPerProject = props => {
  const PM1data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
  ];

  const PM2data = [
    { x: 0, y: 4 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 4 },
    { x: 4, y: 1 },
    { x: 5, y: 3 },
    { x: 6, y: 3 },
    { x: 7, y: 1 },
    { x: 8, y: 1 },
    { x: 9, y: 0 }
  ];

  const PM3data = [
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
    { x: 6, y: 2 },
    { x: 7, y: 2 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
  ];

  const PM4data = [
    { x: 0, y: 12 },
    { x: 1, y: 8 },
    { x: 2, y: 6 },
    { x: 3, y: 12 },
    { x: 4, y: 15 },
    { x: 5, y: 14 },
    { x: 6, y: 12 },
    { x: 7, y: 6 },
    { x: 8, y: 10 },
    { x: 9, y: 12 }
  ];

  const ITEMS = ["Assigned", "In Progress", "Completed"];

  return (
    <div>
      <h3> Tasks per Project</h3>
      <XYPlot width={300} height={300} stackBy="y">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          data={[
            { x: 1, y: 10 },
            { x: 2, y: 5 },
            { x: 3, y: 15 },
            { x: 4, y: 5 },
            { x: 5, y: 15 }
          ]}
        />
        <VerticalBarSeries
          data={[
            { x: 1, y: 12 },
            { x: 2, y: 2 },
            { x: 3, y: 11 },
            { x: 4, y: 2 },
            { x: 5, y: 11 }
          ]}
        />
        <VerticalBarSeries
          data={[
            { x: 1, y: 12 },
            { x: 2, y: 2 },
            { x: 3, y: 11 },
            { x: 4, y: 2 },
            { x: 5, y: 11 }
          ]}
        />
      </XYPlot>
      <DiscreteColorLegend orientation="horizontal" width={300} items={ITEMS} />
    </div>
  );
};

export default TasksPerProject;
