import React, { useState, useEffect } from "react";
import "../styles/ChoiceSpinner.css"; // Create a CSS file for styling

const ChoiceSpinner = ({ choices, onChoiceSelected }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const spinSpinner = () => {
    setSpinning(true);

    // Simulate spinning for a few seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      setSelectedChoice(choices[randomIndex]);
      setSpinning(false);
      onChoiceSelected(choices[randomIndex]);
    }, 3000); // Adjust the duration as needed
  };

  useEffect(() => {
    setSelectedChoice(null);
  }, [choices]);

  return (
    <div className={`choice-spinner ${spinning ? "spinning" : ""}`}>
      <div className="spinner-inner">
        {choices.map((choice) => (
          <div key={choice.id} className={`spinner-choice ${choice === selectedChoice ? "selected" : ""}`}>
            {choice.body}
          </div>
        ))}
      </div>
      <button onClick={spinSpinner} disabled={spinning}>
        Spin
      </button>
    </div>
  );
};

export default ChoiceSpinner;
