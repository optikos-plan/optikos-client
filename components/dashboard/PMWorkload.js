import React from "react";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";

const PMWorkload = props => {
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

  const ITEMS = ["PM1", "PM2", "PM3", "PM4"];

  return (
    <div id="pmworkload">
      <h3> Project Manager Workload</h3>
      <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="Time (days)" postition="start" />
        <YAxis title="Number of Projects" />
        <LineSeries data={PM1data} />
        <LineSeries data={PM2data} />
        <LineSeries data={PM3data} />
        <LineSeries data={PM4data} />
      </XYPlot>
      <DiscreteColorLegend orientation="horizontal" width={300} items={ITEMS} />
    </div>
  );
};

export default PMWorkload;
