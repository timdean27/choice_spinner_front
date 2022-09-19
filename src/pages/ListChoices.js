import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddChoiceLogic from "./AddChoiceLogic"
const ListChoices = ({ choices }) => {
  console.log("pritinging at top of list pager", choices);
  const [addChoice, setaddChoice] = useState(false);


  const clickedAddChoice = () => {
    setaddChoice(true);
  }

////////////////////////////////
//rendering page
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
      {!addChoice ?<button onClick={clickedAddChoice}>Add Choice</button> :<AddChoiceLogic setaddChoice={setaddChoice}/>}
      </div>
    );
  };

  const loadingData = () => {
    return <h3>Awaiting Data</h3>;
  };

  return <div>{!choices ? loadingData() : loadedData()}</div>;
};

export default ListChoices;
