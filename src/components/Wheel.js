import React from "react";
import "../app.css";
const Wheel = ({ choices }) => {
  const colorMap = {};
  const selectedColors = {};

  const generateColor = () => {
    let randomColorString = "#";
    const arrayOfColorFunctions = "0123456789abcdef";
    for (let x = 0; x < 6; x++) {
      let index = Math.floor(Math.random() * 16);
      let value = arrayOfColorFunctions[index];
      randomColorString += value;
    }
    // console.log("randomColorString", randomColorString);
    return randomColorString;
  };

  const newColorFind = (id) => {
    // If already generated and assigned, return
    if (colorMap[id]) return colorMap[id];
    // Generate new random color
    let newColor;
    do {
      newColor = generateColor();
    } while (selectedColors[newColor]);
    // Found a new random, unassigned color
    colorMap[id] = newColor;
    selectedColors[newColor] = true;
    // Return next new color
    return newColor;
  };

  const rotateFunc = (index) => {
    return `rotate(${index * 30}deg)`;
  };

  const widthFunc = (index) => {
    return (`${50}%`);
  };

  const wheelStyles = (index) => {
    return {
      backgroundColor: newColorFind(index),
      color: "blue",
      transform: `${rotateFunc(index)} skewY(${-60}deg)`,
      overflow: "hidden",
      position: "absolute",
      top: "30%",
      right: "0",
      width: widthFunc(index),
      transformOrigin: `${0}% ${100}%`
    };
  };

  return (
    <div className="mainbox">
      <ul className="circle">
        {choices.map((choice, index) => (
          <li className="wheelSpan" key={index} style={wheelStyles(index)}>
            <p className="option-text">{choice.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wheel;
