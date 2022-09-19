import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddChoice from "../components/AddChoice"
const ListChoices = ({ choices }) => {
  console.log(choices);

  const loadedData = () => {
    return (
      <div>
      <div>
      <ul>
        {choices.map((choice, index) => (
          <li key={index}>
          <Link  to={`/choice/view/${choice.id}`}>
            {choice.body}
          </Link>
          </li>
        ))}
        </ul>
      </div>
      <AddChoice/>
      </div>
    );
  };

  const loadingData = () => {
    return <h3>Awaiting Data</h3>;
  };

  return <div>{!choices ? loadingData() : loadedData()}</div>;
};

export default ListChoices;
