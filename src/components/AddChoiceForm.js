import React, { useState } from "react";
import axios from "axios";

const AddChoiceForm = ({ mainAPIGet }) => {
  const [newChoice, setNewChoice] = useState("");
  const CHOICES_API_ENDPOINT = "http://localhost:8000/api/choices"; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const choiceData = { body: newChoice };

    try {
      // Send a POST request to add the new choice to Django
      await axios.post(CHOICES_API_ENDPOINT, choiceData);

      // After successful creation, update the choices list
      mainAPIGet();

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
