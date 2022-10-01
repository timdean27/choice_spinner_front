import React, { useState, useEffect } from "react";
import {Chart as ChartJS, BarElement, CategoryScale , LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
    )



const BarChart = () => {

    const [chart , setChart] = useState([])

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
                    console.log("coin data for bar chart" ,json.data);
                    setChart(json.data)
                  });
                }
              }).catch((error) => {
                console.log(error);
              });
          };
        fetchCoins()
    }, [baseURL , proxyURL ,apiKey])

   let data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }


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
    <div><Bar
        data={data}
        options={options}
        height={400}
    /></div>
  )
}

export default BarChart
