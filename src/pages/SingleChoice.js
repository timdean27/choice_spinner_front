import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const SingleChoice = (props) => {
  let { id } = useParams();
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    grabChoice();
  }, [id]);

  ////////////////////////////////////////////////////////////////////////////////
  // get rout for a single choice
  const grabChoice = () => {
    const REACT_APP_DATABASE_URL_DJANGO =
      process.env.REACT_APP_DATABASE_URL_DJANGO;
      const Endpoint = `${id}`;

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.get(REACT_APP_DATABASE_URL_DJANGO + Endpoint, headers).then((res) => {
      console.log("data insisde DjGfood fetch", res.data);
      setChoice(res.data);
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  // updateing a single chocie
  const handleChange = (e) => {
    setChoice({ ...choice, [e.target.id]: e.target.value });
  };

  const updateChoice = () => {
    console.log("update fucntion ran",choice.body)
    const REACT_APP_DATABASE_URL_DJANGO =
      process.env.REACT_APP_DATABASE_URL_DJANGO;
      const Endpoint = `${id}/update`;

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.put(REACT_APP_DATABASE_URL_DJANGO + Endpoint, choice, headers);
  };


  const handleSubmit =() => {
    updateChoice()
    navigate("/")
  }


  // rendering to the page
  const loadedData = () => {
    return (
      <div>
          <button onClick={handleSubmit}>Update & Back</button>
        <h3>Single Choice Page showing ID={choice.body}</h3>
        <form>
          <input
            id="body"
            type="text"
            placeholder={choice.body}
            onChange={handleChange}
          />
        </form>
      </div>
    );
  };
  const loadingData = () => {
    return <h1>Loading Data...</h1>;
  };

  return <div>{!choice ? loadingData() : loadedData()}</div>;
};

export default SingleChoice;
