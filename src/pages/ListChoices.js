import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListChoices = ({ choices }) => {
  console.log(choices);

  const loadedData = () => {
    return (
      <div>
      <ul>
        {choices.map((choice, index) => (
          <li key={index}><Link  to={`/choice/${choice.id}`}>
            {choice.body}
          </Link>
          </li>
        ))}
        </ul>
      </div>
    );
  };

  const loadingData = () => {
    return <h3>Awaiting Data</h3>;
  };

  return <div>{!choices ? loadingData() : loadedData()}</div>;
};

export default ListChoices;
