const axios = require('axios');

async function summarizeText(text) { 
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer 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'
    },
    data : data
  };

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    }
    catch (error) {
      console.log(error);
    }
  }

  makeRequest();

}
// Allows for summarized text to be called outside of this file
  
module.exports = summarizeText;