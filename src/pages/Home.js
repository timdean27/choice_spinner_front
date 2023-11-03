import React, { useState, useEffect } from "react";
import axios from "axios";
import AddChoiceForm from "../components/AddChoiceForm";  // Import your AddChoiceForm component

const Home = () => {
  const [choices, setChoices] = useState([]);

  // Define your API endpoint
  const CHOICES_API_ENDPOINT = "http://localhost:8000/api/choices";

  const fetchChoices = async () => {
    try {
      const response = await axios.get(CHOICES_API_ENDPOINT);
      setChoices(response.data);
    } catch (error) {
      console.error("Error fetching choices:", error);
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
          <li key={choice.id}>{choice.body}</li>
        ))}
      </ul>

      {/* AddChoiceForm component for adding choices */}
      <AddChoiceForm
        CHOICES_API_ENDPOINT={CHOICES_API_ENDPOINT}
        onChoiceAdded={fetchChoices}  // Callback to refresh the choices list
      />
    </div>
  );
};

export default Home;
