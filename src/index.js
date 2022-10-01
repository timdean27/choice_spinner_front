import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(...registerables);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
