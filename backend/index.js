const express = require('express');
const cors = require('cors');
const summarizeRouter = require('./summarizeRouter');

const app = express();


const whitelist = ["https://delightful-alfajores-30c408.netlify.app/"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', summarizeRouter);

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
