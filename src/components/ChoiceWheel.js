import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../styles/ChoiceWheel.css";
import Pin from "./Pin";

const ChoiceSpinner = ({ choices }) => {
  const pieChartRef = useRef(null);
  const width = 300;
  const height = 300;
  const [time, setTime] = useState(null);

  useEffect(() => {
    createPieChart();
  }, [choices]);

  const createPieChart = () => {
    // Remove existing pie chart
    d3.select(pieChartRef.current).selectAll("*").remove();

    // Set up the SVG container
    const radius = Math.min(width, height) / 2;
    const svg = d3.select(pieChartRef.current).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Prepare data and color scale
    const data = Array.from({ length: choices.length }).fill(1);
    const colorScale = d3.scaleOrdinal()
      .domain(choices.map((choice) => choice.body))
      .range(d3.schemeCategory10);

    // Create pie and arc functions
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

  const spinWheel = () => {
    // Generate random current rotation
    let currentRotation = Math.floor(Math.random() * 360);
  
    // Generate random number of rotations (between 5 and 25)
    const rotations = Math.floor(Math.random() * 21) + 5;
  
    // Generate a random offset for the final rotation (between 0 and 360)
    const rotationOffset = Math.floor(Math.random() * 361);
  
    // Calculate the final rotation by adding the rotations and the offset
    const finalRotation = currentRotation + 360 * rotations + rotationOffset;
  
    // Generate a random duration between 10 to 20 seconds
    const duration = Math.floor(Math.random() * 11) + 10;
  
    let starttime = duration;
  
    // Update the timer display every second
    const timerInterval = setInterval(() => {
      starttime--;
      setTime(starttime);
      updateTimer(starttime);
  
      // Stop the interval when the duration reaches 0
      if (starttime <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  
    // Rotate the wheel using d3.transition
    d3.select(pieChartRef.current)
      .select("svg")
      .transition()
      .duration(duration * 1000) // Convert duration to milliseconds
      .tween("rotate", function () {
        // Interpolate between the current rotation and the final rotation
        const i = d3.interpolate(currentRotation, finalRotation);
  
        // Return a function that will be called for each step of the transition
        return function (t) {
          // Rotate the wheel by updating the transform attribute
          d3.select(pieChartRef.current)
            .select("g")
            .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(${i(t)})`);
        };
      });
  };
  
  
  const updateTimer = (time) => {
    // Display the timer (You can replace this with your preferred way of updating the timer in the UI)
    console.log(`Time remaining: ${time} seconds`);
  };

  return (
    <div className="choice-container">
      <div className="choice-spinner" ref={pieChartRef}></div>
      <div className="controls-container">
        <h1>ChoiceWheel</h1>
        {time !== null && <h2>Time remaining: {time} seconds</h2>}
        <button onClick={spinWheel}>Spin Wheel</button>
        <Pin />
      </div>
    </div>
  );
};

export default ChoiceSpinner;
