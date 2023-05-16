TTTales.
ReactJS Assignment.

A brief overview of the Assignment.
I've created a ReactJS Application. The landing page or on the first load, user can see a submit button.
Upon clicking which a file is fetched from "https://www.terriblytinytales.com/test.txt"
Thereafter the data from the file is parsed so it can be displayed on the frontend in the form of histogram.
The histogram displays the top 20 words with most recurrence on the x-axis, whereas the Y-Axis represents the amount of time or frequencies of the words.
Above the histogram chart a button is visible to the user labelled "Export" 
User can click on this button to download the Histogram chart in the CSV form.


Following are the technical details of the assignment.
Importing Dependencies: On the top I've imported the relevant dependencies required to run the application. 
Such as React, useState, useEffect, useRef from the 'react' package, and the Chart component from the 'chart.js/auto' library.

App Component: The main functional component of the application is App.js component.

State and Refs: Two hooks are declared within the App component. 
I've used useState hook to create the wordFrequencies state variable, which is initially an empty object. 
and I've used useRef hook to create a ref named chartContainerRef, which will be used to reference the canvas element for the histogram chart.

handleButtonClick Function: This function is an event handler and it is triggered when the user clicks the submit button.
It performs an asynchronous fetch request to retrieve text data from a URL, extracts words using regex, and counts the frequency of each word. 
The results are then stored in the wordFrequencies state variable.

useEffect Hook: This hook is responsible for rendering the histogram chart. 
It executes whenever the wordFrequencies state variable changes.
In this useEffect Hook, the sorted word frequencies are extracted.
Then I've used Chart component, which is being imported from the Chart.js library. This is the only external library I've imported.
This chart component is used to create a bar chart to represent the top 20 words with most recurrence and the subsequent frequencies of the words.
The chart is rendered using the canvas element referenced by chartContainerRef.

convertToCSV Function: This utility function converts the wordFrequencies object into CSV format, including the headers and data rows.

downloadCsv Function: This function is called when the export button is clicked. 
It converts the wordFrequencies into CSV format using the convertToCSV function, creates a Blob object, and generates a download link for the CSV file. 
The link is automatically clicked to initiate the file download.

HTML Structure: The return statement defines the HTML structure of the application. 
It conditionally renders the submit and export buttons based on the presence of wordFrequencies. 
The canvas element for the chart is wrapped within a div with the class "histoCss".

Export Default: The App component is exported as the default export of the module.


The React Application is hosted on Netlify 
Link: https://graceful-sunflower-d969d6.netlify.app/
