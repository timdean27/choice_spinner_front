import React from 'react'

const Wheel = ({choices}) => {

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
      console.log(randomColorString)
      return randomColorString;
    
    };
    
    const newColorFind = id => {
      // If already generated and assigned, return
      if (colorMap[id]) return colorMap[id];
      // Generate new random color
      let newColor;
      do {
        newColor = generateColor();
      } while(selectedColors[newColor]);
      // Found a new random, unassigned color
      colorMap[id] = newColor;
      selectedColors[newColor] = true;
      // Return next new color
      return newColor;
    }


  return (
    <div>
        <ul className="wheel-list">
        {choices.map((choice, index) => (
            <li className= {"wheel-list-item" + index} key={index}>
              <div className="inner-wheel-div"  style={{ backgroundColor: newColorFind(index)}}>{choice.body}</div>
            </li>
          ))}
        </ul>
    
    </div>
  )
}

export default Wheel