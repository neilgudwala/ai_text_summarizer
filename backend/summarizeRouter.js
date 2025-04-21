const express = require('express');

const router = express.Router()

const {handleSummarizeRequest} = require("./summarizerController");
  
router.post("/summarize", handleSummarizeRequest);


module.exports = router;