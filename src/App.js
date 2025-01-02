import './App.css';
import { useState } from 'react';

function App() {
  const [textToSummarize, setTextToSummarize] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    // API call would go here
    console.log('Summarizing text...');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Text Summarizer App</h1>
      
      <p className="mb-6">
        Welcome to the AI Text Summarizer App! This app leverages the power of 
        Artificial Intelligence APIs to provide concise summaries of long texts...
      </p>

      <div className="space-y-4">
        <div>
          <textarea
            value={textToSummarize}
            onChange={(e) => setTextToSummarize(e.target.value)}
            placeholder="Paste in some text to summarize. (Min length is 200 chars. Max length is 100,000 chars.)"
            maxLength={100000}
            className="w-full h-40 p-2 border rounded"
          />
          <button
            onClick={handleSummarize}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Summarize
          </button>
        </div>

        <div>
          <textarea
            value={summary}
            readOnly
            placeholder="Summarized text will appear here"
            className="w-full h-40 p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
