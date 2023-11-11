import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/ChoiceWheel.css";

const ChoiceSpinner = ({ choices }) => {
  const pieChartRef = useRef(null);

  useEffect(() => {
    createPieChart();
  }, [choices]);

  const createPieChart = () => {
    // Remove existing pie chart
    d3.select(pieChartRef.current).selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(pieChartRef.current).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const data = choices.map((choice) => choice.body.length);

    const colorScale = d3.scaleOrdinal()
      .domain(choices.map((choice) => choice.body))
      .range(d3.schemeCategory10);

    const pie = d3.pie();

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Append slices
    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colorScale(choices[i].body))
      .attr("class", "pie-slice");

    // Append text to each slice
    svg.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em") // Adjust vertical positioning
      .attr("text-anchor", "middle")
      .text((d, i) => choices[i].body);
  };

  return (
    <div>
      <h1>ChoiceWheel</h1>
      <div className="choice-spinner" ref={pieChartRef}></div>
    </div>
  );
};

export default ChoiceSpinner;

