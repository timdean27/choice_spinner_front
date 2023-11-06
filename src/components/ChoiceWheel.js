import React, { useState, useEffect } from "react";
import "../styles/ChoiceWheel.css"; // Create a CSS file for styling

const ChoiceWheel = ({ choices, onChoiceSelected }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const spinWheel = () => {
    setSpinning(true);

    // Simulate spinning for 10 seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      setSelectedChoice(choices[randomIndex]);
      setSpinning(false);
      onChoiceSelected(choices[randomIndex]);
    }, 10000);
  };

  useEffect(() => {
    setSelectedChoice(null);
  }, [choices]);

  return (
    <div className={`choice-wheel ${spinning ? "spinning" : ""}`}>
      <div className="wheel">
        {choices.map((choice, index) => (
          <div
            key={choice.id}
            className={`choice ${index === 0 ? "selected" : ""}`}
            style={{
              transform: `rotate(${(360 / choices.length) * index}deg)`,
            }}
          >
            {choice.body}
          </div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={spinning}>
        Spin
      </button>
    </div>
  );
};

export default ChoiceWheel;
