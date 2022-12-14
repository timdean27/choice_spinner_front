import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ListChoices from "../pages/ListChoices";
import Wheel from "../components/Wheel";

const ChoicesAPI = () => {
  const [choices, setChoices] = useState([]);

  const grabChoices = () => {
    console.log("get choices Axios ran");
    const REACT_APP_DATABASE_URL_DJANGO =
      process.env.REACT_APP_DATABASE_URL_DJANGO;
    // const loginEndpoint = "gfoods_view_protected/";
    const headers = {
      headers: {
        "Content-Type": "application/json",
        //   'Authorization': `Bearer ${accessToken}`,
      },
    };

    axios
      .get(REACT_APP_DATABASE_URL_DJANGO, headers)
      .then((res) => {
        console.log("data insisde main GET choicesAPI", res.data);
        setChoices(res.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    grabChoices();
  }, []);

  const loadedDate = () => {
    return (
      <div className="Home_PAGE">
        <div className="choices_homepage">
          <ListChoices choices={choices} mainAPIGet={grabChoices} />
        </div>
        <div className="wheel_homepage">
          <Wheel choices={choices} mainAPIGet={grabChoices} />
        </div>
      </div>
    );
  };

  const loadingData = () => {
    return <h1>Loading Data...</h1>;
  };

  console.log(choices[0]);

  return <div>{choices[0] ? loadedDate() : loadingData()}</div>;
};

export default ChoicesAPI;
