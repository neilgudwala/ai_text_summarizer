const axios = require('axios');

async function summarizeText(text) { 
  console.log("summarizeText called")
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 100
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': process.env.REACT_APP_HUGGINGFACE_API_KEY
    },
    data : data
  };

    try {
      console.log("makeRequest")
      const response = await axios.request(config);
      console.log(response.data)
      return response.data[0].summary_text;
    }
    catch (error) {
      console.log(error);
    }

}
  
module.exports = {summarizeText};