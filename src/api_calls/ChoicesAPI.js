import React, { useState, useEffect } from "react";
import axios from "axios";

const ChoicesAPI = () => {
  const [choices, setChoices] = useState([]);

  const grabChoices = () => {
    console.log("grabFoodDataFunc ran");
    const REACT_APP_DATABASE_URL_DJANGO = "http://127.0.0.1:8000/api/choices/";
    // const loginEndpoint = "gfoods_view_protected/";
    const headers = {
      headers: {
        "Content-Type": "application/json",
        //   'Authorization': `Bearer ${accessToken}`,
      },
    };

    axios.get(REACT_APP_DATABASE_URL_DJANGO, headers).then((res) => {
      console.log("data insisde DjGfood fetch", res.data);
      setChoices(res.data);
    });
  };

  useEffect(() => {
    grabChoices();
  }, []);

  const loadDate = () => {
    return ( <div className="choices_div">
    {choices.map((choice, index) => (
      <h3 key={index}>{choice.body}</h3>
    ))}
  </div>)
  }
  console.log(choices)
  return (
    <div>
        {choices[0].body ? loadDate() : <h1>Lodaing Data...</h1> }
   </div>
  );

};

export default ChoicesAPI;
