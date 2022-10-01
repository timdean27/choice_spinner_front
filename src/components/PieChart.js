import React, { useState, useEffect } from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale , LinearScale} from 'chart.js'
import {Pie} from 'react-chartjs-2'


ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
    )

const PieChart = () => {
  const colorMap = {};
  const selectedColors = {};

    const [chart , setChart] = useState([])
    const generateColor = () => {
      let randomColorString = "#";
      const arrayOfColorFunctions = "0123456789abcdef";
      for (let x = 0; x < 6; x++) {
        let index = Math.floor(Math.random() * 16);
        let value = arrayOfColorFunctions[index];
        randomColorString += value;
      }
      // console.log("randomColorString", randomColorString);
      return randomColorString;
    };
  
    const newColorFind = (id) => {
      // If already generated and assigned, return
      if (colorMap[id]) return colorMap[id];
      // Generate new random color
      let newColor;
      do {
        newColor = generateColor();
      } while (selectedColors[newColor]);
      // Found a new random, unassigned color
      colorMap[id] = newColor;
      selectedColors[newColor] = true;
      // Return next new color
      return newColor;
    };







    let baseURL = "https://api.coinranking.com/v2/coins/?limit=10";
    let proxyURL = "https://cors-anywhere.herokuapp.com/";
    let apiKey = 'coinrankingf5f07a6c12c1189211631eeaed1a16cf58cdf5e111d89829';

    useEffect(() => {
        const fetchCoins = async () => {
            await fetch(`${proxyURL}${baseURL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${apiKey}`,
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                if (response.ok) {
                  response.json().then((json) => {
                    console.log(json.data);
                    setChart(json.data)
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
          };
        fetchCoins()
    }, [baseURL , proxyURL ,apiKey])


    console.log("index", chart?.coins?.map((x, index) => index))

   let data = {
    labels: chart?.coins?.map(x => x.name),
    datasets: [{
      label: `${chart?.coins?.length} Coins Available`,
      data: chart?.coins?.map(x => x.price),
      backgroundColor: chart?.coins?.map((x, index) =>  newColorFind(`${index}`)),
      borderColor: chart?.coins?.map((x, index) =>  newColorFind(`${index}`)),
      borderWidth: 1
    }]
  };


    let options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }

  return (
    <div>
    <div className="arrow"></div>
    <Pie
        data={data}
        options={options}
        height={400}
    />
    </div>
  )
}

export default PieChart
