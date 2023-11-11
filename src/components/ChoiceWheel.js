import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/ChoiceWheel.css";

const ChoiceSpinner = ({ choices }) => {
  // Create a ref to hold the reference to the pie chart container
  const pieChartRef = useRef(null);

  // useEffect hook to trigger the creation of the pie chart when choices change
  useEffect(() => {
    createPieChart();
  }, [choices]);

  // Function to create the pie chart using D3
  const createPieChart = () => {
    // Remove any existing elements inside the pie chart container
    d3.select(pieChartRef.current).selectAll("*").remove();

    // Set up dimensions for the pie chart
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Create an SVG element and append it to the pie chart container
    const svg = d3.select(pieChartRef.current).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Extract data for the pie chart (length of choice names)
    const data = choices.map((choice) => choice.body.length);

    // Create a color scale based on the choice names
    const colorScale = d3.scaleOrdinal()
      .domain(choices.map((choice) => choice.body))
      .range(d3.schemeCategory10);

    // Create a D3 pie function
    const pie = d3.pie();

    // Create a D3 arc function to define the shape of each slice
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Append slices to the SVG
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

  // Render the component
  return (
    <div>
      <h1>ChoiceWheel</h1>
      {/* Attach the pie chart container to the ref */}
      <div className="choice-spinner" ref={pieChartRef}></div>
    </div>
  );
};

export default ChoiceSpinner;
