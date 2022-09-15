import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const ListChoices = ({choice}) => {
  console.log(choice);
  return (

    <div>
    <h1>Printing from List Choices Page</h1>
    <Link to={`/choice/${choice.id}`}>{choice.body}</Link>

    </div>
  )
}

export default ListChoices