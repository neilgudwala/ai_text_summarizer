// backend/index.js
const express = require('express');
const cors = require('cors');
const summarizeRouter = require('./summarizeRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', summarizeRouter);

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
