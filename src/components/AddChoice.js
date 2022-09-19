import React from "react";
import { Link } from "react-router-dom";

const AddChoice = () => {
  return (
    <div>
      <Link to={`/choice/new`}>
        <button>Add Choice</button>
      </Link>
    </div>
  );
};

export default AddChoice;
