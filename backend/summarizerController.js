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
