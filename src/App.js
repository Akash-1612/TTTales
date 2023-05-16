import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto'; // I have installed chart.js to render the histogram.
import './App.css';

function App() {
  // I am using useState hook to set the state of the wordFrequencies.
  // I am using useRef hook to get the reference of the canvas element.
  const [wordFrequencies, setWordFrequencies] = useState({});
  const chartContainerRef = useRef(null);

  // This is an event handler function which is called when the submit button is clicked.
  const handleButtonClick = () => {
    fetch('https://www.terriblytinytales.com/test.txt')
      .then((response) => response.text())
      .then((data) => {
        const words = data.toLowerCase().match(/[^\W\d]+/g); // We are using regex to match the words.
        let wordFrequencies = {};
        
        //Promise means that the code will run asynchronously.
        const promises = words.map((word) => {
          if (word.length > 0) {
            return new Promise((resolve) => {
              wordFrequencies[word] = (wordFrequencies[word] || 0) + 1; 
              resolve();
            });
          }
          return Promise.resolve();
        });

        // Promise.all() method is used to run all the promises in the promises array.
        Promise.all(promises).then(() => {
          setWordFrequencies(wordFrequencies);
        });
      })
      .catch((error) => {
        console.log('Error in fetching the file.', error);
      });
  };

  
  // Here we are using useEffect hook to render the histogram.
  useEffect(() => {
    if (wordFrequencies && Object.keys(wordFrequencies).length > 0) {
      const sortedFrequencies = Object.entries(wordFrequencies)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

      
      const labels = sortedFrequencies.map((entry) => entry[0]);
      const data = sortedFrequencies.map((entry) => entry[1]);

      const ctx = chartContainerRef.current.getContext('2d');
      // The if condition checks if the ctx and chartContainerRef.current is not null.
      if (ctx && chartContainerRef.current) {
        if (ctx.chart) {
          ctx.chart.destroy();
        }
        // Then we are creating a new chart using the Chart.js library.
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Word Frequencies',
                data,
                backgroundColor: 'rgb(255,194,62)',
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 1)',
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Frequency',
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                },
                ticks: {
                  font: {
                    size: 16,
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Top 20 Words',
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                },
                ticks: {
                  font: {
                    size: 18,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
                
        });
      }
    }
  }, [wordFrequencies]);

  // After the histogram is rendered, we are converting the data into csv format.
  const convertToCSV = (data) => {
    const header = 'Word,Frequency\n';
    const rows = data.map((entry) => entry[0] + ',' + entry[1]);
    return header + rows.join('\n');
  };

  // This function is called when the export button is clicked.
  const downloadCsv = () => {
    const csvData = convertToCSV(Object.entries(wordFrequencies));
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'histogram.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  
  //This is the html part of the code.
  //this is responsible for the UI of the application.
  return (
    <div>
      {Object.keys(wordFrequencies).length === 0 && ( // Here we are checking if the wordFrequencies is empty or not.
      <div className="center">
        <div className="subBtn">
          <button onClick={handleButtonClick}> {// Here we are calling the handleButtonClick function.
            <span> Submit </span>
          }</button>
            </div>
        </div>
      )}

      {Object.keys(wordFrequencies).length > 0 && (
        <div className="center2">
          <div className="csvbtn">
  <button onClick={downloadCsv}> {// Similarly here we are calling the downloadCsv function.
         <span> Export </span>
        }</button>
         </div>
         </div>
      )}
  <div className="histoCss">
  <canvas id="histogramChart" ref={chartContainerRef} />
  </div>
    </div>
  );
}

export default App;
