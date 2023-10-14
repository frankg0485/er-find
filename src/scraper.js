import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/data')
    .then((response) => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.text(); // Get the response as text
    })
    .then((htmlContent) => {
        htmlContent = htmlContent

        // Create a div element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Find all the elements with class "erLocation" (assuming each location is within a container with this class)
        const locationElements = tempDiv.querySelectorAll('.erLocation');

        // Extract and format the data for each location
        const extractedData = Array.from(locationElements).map(locationElement => {
        const name = locationElement.querySelector('a')?.textContent || 'N/A';
        const address = locationElement.querySelector('.erLocationInfo')?.textContent.trim() || 'N/A';
        const time = locationElement.querySelector('.erLocationTime')?.textContent.trim() || 'N/A';

        return { name, address, time };
        });

        setData(extractedData);
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });
}, []);

  return (
    <div>
      <h1>Emergency Room Wait Times</h1>
      <h4>Average wait times for Piedmont emergency rooms</h4>
      <ul>
        {data.map((location, index) => (
          <li key={index}>
            <h5>{location.name}</h5>
            <p>{location.address}</p>
            <p>{location.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;