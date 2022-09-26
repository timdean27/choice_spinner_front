import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddChoicelogic = ({ setaddChoice, mainAPIGet }) => {
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate();
  // creat choice Post to API
  const createChoice = () => {
    console.log("creat function ran");
    const REACT_APP_DATABASE_URL_DJANGO =
      process.env.REACT_APP_DATABASE_URL_DJANGO;
    // const Endpoint = `create`;
    const method = 'POST'
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(REACT_APP_DATABASE_URL_DJANGO, choice, headers, method);
  };

  const handleChange = (e) => {
    setChoice({ ...choice, [e.target.id]: e.target.value });
    console.warn(e.target.value);
  };

  const handleSubmit = () => {
    if (!choice) {
      setaddChoice(false);
    } else {
      createChoice();
      setaddChoice(false);
      mainAPIGet();
      navigate("/");
    }
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
