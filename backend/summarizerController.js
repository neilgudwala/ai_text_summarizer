// const axios = require('axios');

// async function summarizeText(req,res) { 
//   console.log("summarizeText called")
//   let data = JSON.stringify({
//     "inputs": req.body,
//     "parameters": {
//       "max_length": 100,
//       "min_length": 30
//     }
//   });

//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
//     headers: { 
//       'Content-Type': 'application/json', 
//       'Authorization': 'Bearer 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'
//     },
//     data : data
//   };

//   async function makeRequest() {
//     try {
//       console.log("makeRequest")
//       const response = await axios.request(config);
//       console.log(response)
//       return response;
//     }
//     catch (error) {
//       console.log(error);
//     }
//   }

//   return res.status(200).makeRequest();

// }
  
// module.exports = {summarizeText};



const { summarizeText } = require('./summarizerModel');

async function handleSummarizeRequest(req, res) {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to summarize text' });
  }
}

module.exports = { handleSummarizeRequest };
