import React, { useState, useEffect } from "react";
import axios from "axios";
import AddChoiceForm from "../components/AddChoiceForm";
import ChoiceSpinner from "../components/ChoiceSpinner";

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

    const handleCheckboxChange = (choiceId) => {
        setSelectedChoices((prevSelectedChoices) => {
            if (prevSelectedChoices.includes(choiceId)) {
                // Deselect the choice if it was already selected
                return prevSelectedChoices.filter((id) => id !== choiceId);
            } else {
                // Select the choice if it was not already selected
                return [...prevSelectedChoices, choiceId];
            }
        });
    };

    const handleDeleteSelected = async () => {
        // Send DELETE requests to delete the selected choices
        const deleteRequests = selectedChoices.map((choiceId) =>
            axios.delete(`http://localhost:8000/api/choices/${choiceId}`)
        );

        try {
            // Wait for all DELETE requests to complete
            await Promise.all(deleteRequests);

            // Clear the selected choices
            setSelectedChoices([]);

            // Fetch the updated choices
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

            <AddChoiceForm CHOICES_API_ENDPOINT={CHOICES_API_ENDPOINT} onChoiceAdded={fetchChoices} />
        </div>
    );
};

export default Home;
