// AddChoiceForm.js
import React, { useState } from "react";
import axios from "axios";

const AddChoiceForm = ({ onChoiceAdded }) => {
  const [newChoice, setNewChoice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const choiceData = { body: newChoice };

    try {
      await axios.post("http://localhost:8000/api/choices/", choiceData);

      // After successful creation, update the choices list
      onChoiceAdded();

      // Clear the input field
      setNewChoice("");
    } catch (error) {
      console.error("Error creating choice:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your choice"
        value={newChoice}
        onChange={(e) => setNewChoice(e.target.value)}
      />
      <button type="submit">Add Choice</button>
    </form>
  );
};

export default AddChoiceForm;
