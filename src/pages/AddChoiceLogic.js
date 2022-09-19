import React from 'react'
import { Link , useNavigate } from "react-router-dom";

const AddChoicelogic = () => {
    const navigate = useNavigate();

    const backFunction = () =>{navigate("/")}
  return (
    <div>
    <button onClick={backFunction}>Back</button>
    <h3>Add Choice Logic Page</h3>
    </div>
  )
}

export default AddChoicelogic