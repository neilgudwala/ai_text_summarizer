const express = require('express');
    // const cors = require('cors');
const router = express.Router()
    // const app = express();
    // const port = 8000;
const {handleSummarizeRequest} = require("./summarizerController");
  
// app.use(cors());
// // Parses JSON bodies (as sent by API clients)
// app.use(express.json());

// app.use(express.static('public'));
// app.listen(port, () => {
// console.log(`Server running at http://localhost:${port}/`);
// });

// router.get("/summarize", summary)
router.post("/summarize", handleSummarizeRequest);


// app.post('/summarize', async (req, res) => {
// const textToSummarize = req.body.text;
// const summarizedText = await summarizeText(textToSummarize);
// res.send({ summary: summarizedText });
// });

module.exports = router;