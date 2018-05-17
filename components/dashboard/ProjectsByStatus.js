import React from "react";
import {
  RadialChart,
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";

const ProjectsByStatus = props => {
  const ITEMS = ["PM1", "PM2", "PM3", "PM4"];

  return (
    <div>
      <h3> Projects by Status</h3>
      <RadialChart
        colorType={"literal"}
        colorDomain={[0, 100]}
        colorRange={[0, 10]}
        margin={{ top: 100 }}
        getLabel={d => d.name}
        data={[
          { angle: 1, color: "#4CAF50", name: "Completed" },
          { angle: 2, color: "#03A9F4", name: "In Progress" },
          { angle: 3, color: "#F57C00", name: "Assigned" }
        ]}
        labelsRadiusMultiplier={1.1}
        labelsStyle={{ fontSize: 16, fill: "#222" }}
        showLabels
        style={{ stroke: "#fff", strokeWidth: 2 }}
        width={400}
        height={300}
      />
    </div>
  );
};

export default ProjectsByStatus;
