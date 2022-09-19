import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const AddChoicelogic = ({setaddChoice}) => {

  const [choice, setChoice] = useState(null);

  // creat choice Post to API
  const createChoice = () => {
    console.log("creat function ran");
      const REACT_APP_DATABASE_URL_DJANGO =
        process.env.REACT_APP_DATABASE_URL_DJANGO;
      const Endpoint = `create`;

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios.post(REACT_APP_DATABASE_URL_DJANGO + Endpoint, choice, headers);
  };

  const handleChange = (e) => {
    setChoice({ ...choice, [e.target.id]: e.target.value });
    console.warn(e.target.value);
  };

  const handleSubmit = () => {
    createChoice();
    setaddChoice(false)
  };


  return (
    <div>
      <button onClick={handleSubmit}>Create Choice</button>
      <form onSubmit={handleSubmit}>
        <input
          id="body"
          type="text"
          placeholder="Enter Option"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default AddChoicelogic;
