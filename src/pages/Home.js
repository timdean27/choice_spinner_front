import React, { useState, useEffect } from "react";
import axios from "axios";
import AddChoiceForm from "../components/AddChoiceForm";
import ChoiceWheel from "../components/ChoiceWheel";

const Home = () => {
  const [choices, setChoices] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState([]);

  const CHOICES_API_ENDPOINT = "http://localhost:8000/api/choices";

  const fetchChoices = async () => {
    try {
      const response = await axios.get(CHOICES_API_ENDPOINT);
      setChoices(response.data);
    } catch (error) {
      console.error("Error fetching choices:", error);
    }
  };

  // Add the handleChoiceSelected function
  const handleChoiceSelected = (selectedChoice) => {
    // Handle the selected choice, you can add your logic here.
    console.log("Selected choice:", selectedChoice);
  };

  const handleCheckboxChange = (choiceId) => {
    setSelectedChoices((prevSelectedChoices) => {
      if (prevSelectedChoices.includes(choiceId)) {
        return prevSelectedChoices.filter((id) => id !== choiceId);
      } else {
        return [...prevSelectedChoices, choiceId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    const deleteRequests = selectedChoices.map((choiceId) =>
      axios.delete(`http://localhost:8000/api/choices/${choiceId}`)
    );

    try {
      await Promise.all(deleteRequests);
      setSelectedChoices([]);
      fetchChoices();
    } catch (error) {
      console.error("Error deleting choices:", error);
    }
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  return (
    <div>
      <h1>Choices</h1>
      <ul>
        {choices.map((choice) => (
          <li key={choice.id}>
            <input
              type="checkbox"
              checked={selectedChoices.includes(choice.id)}
              onChange={() => handleCheckboxChange(choice.id)}
            />
            {choice.body}
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteSelected}>Delete Selected</button>

      {/* Add the ChoiceWheel component with the handleChoiceSelected prop */}
      <ChoiceWheel choices={choices} onChoiceSelected={handleChoiceSelected} />
      <AddChoiceForm CHOICES_API_ENDPOINT={CHOICES_API_ENDPOINT} onChoiceAdded={fetchChoices} />
    </div>
  );
};

export default Home;
