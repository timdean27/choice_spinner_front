import React, { useState } from "react";
import axios from "axios";

const AddChoiceForm = ({ CHOICES_API_ENDPOINT, onChoiceAdded }) => {
  const [newChoice, setNewChoice] = useState("");
  console.log(CHOICES_API_ENDPOINT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const choiceData = { body: newChoice };
    console.log(choiceData)
    try {
      // Send a POST request to add the new choice to Django
      await axios.post(CHOICES_API_ENDPOINT, choiceData);

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

