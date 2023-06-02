// Function to get input values from the form
function getInputValues() {
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;
    const year = document.getElementById('year').value;
    const season = document.getElementById('season').value;
    const crop = document.getElementById('crop').value;
    const area = document.getElementById('area').value;
  
  
    // Return an object with input values
    return {state, district, year, season, crop, area}
  }
  
  // Function to send input values to the server and get the predicted output
  async function getPredictedOutput() {
    const inputValues = getInputValues();
    const response = await fetch('/predict', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValues)
    });
    const data = await response.json();
    return data.output;
  }
  
  // Function to update the output field on the webpage
  function updateOutput(output) {
    const outputField = document.getElementById('output');
    outputField.textContent = output;
  }
  
  // Function to handle the form submit event
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting
    const output = await getPredictedOutput();
    updateOutput(output);
  }
  
  // Add an event listener to the form submit button
  const form = document.getElementById('prediction-form');
  form.addEventListener('submit', handleSubmit);
  