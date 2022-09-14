import React, { useState, useEffect } from "react";
import axios from "axios";

const ChoicesAPI = () => {
  const [choices, setChoices] = useState([]);

  const grabChoices = () => {
    console.log("grabFoodDataFunc ran");
    const REACT_APP_DATABASE_URL_DJANGO = process.env.REACT_APP_DATABASE_URL_DJANGO;
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

  const loadedDate = () => {
    return ( <div className="choices_div">
    {choices.map((choice, index) => (
      <h3 key={index}>{choice.body}</h3>
    ))}
  </div>)
  }

  const loadingData = () => {
    return <h1>Loading Data...</h1>
  }


  console.log(choices[0])

  return (
    <div>
        {choices[0] ? loadedDate() : loadingData() }
   </div>
  );

};

export default ChoicesAPI;