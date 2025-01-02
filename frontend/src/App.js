import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { URL } from './url';

// Animation Background Component adds visual interest while maintaining minimalism
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-96 h-96 rounded-full bg-yellow-900/5 dark:bg-yellow-500/5"
            animate={{
              x: ['0%', '100%', '0%'],
              y: ['0%', '100%', '0%'],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + index * 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 5,
            }}
            style={{
              left: `${index * 30}%`,
              top: `${index * 20}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [textToSummarize, setTextToSummarize] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSummarize = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      if (textToSummarize.length < 100) {
        throw new Error('Please enter at least 100 characters');
      }

      const response = await axios.post(`${URL}/api/summarize`, {
        text: textToSummarize
      });

      if (response.data && response.data.summary) {
        setSummary(response.data.summary);
      } else {
        throw new Error('Unable to generate summary');
      }
    } catch (err) {
      setError(err.message || 'Failed to summarize text');
      setSummary('');
    } finally {
      setIsLoading(false);
    }
  };

  const remainingChars = 10000 - textToSummarize.length;
  const charactersEntered = textToSummarize.length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 font-['EB_Garamond']">
      <AnimatedBackground />
      
      <div className="max-w-2xl mx-auto p-6 relative">
        <div className="flex justify-between items-center mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl text-yellow-900 dark:text-yellow-500 tracking-wide"
          >
            summary.ai
          </motion.h1>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-yellow-50 dark:hover:bg-gray-800 transition-colors"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-yellow-900" />
              )}
            </motion.div>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="relative">
            <textarea
              value={textToSummarize}
              onChange={(e) => setTextToSummarize(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-40 p-4 rounded-lg border border-yellow-900/20 dark:border-yellow-500/20 
                       bg-white dark:bg-gray-800 focus:border-yellow-900 dark:focus:border-yellow-500 
                       transition-colors duration-200 text-gray-800 dark:text-gray-200 resize-none text-lg
                       focus:ring-2 focus:ring-yellow-900/20 dark:focus:ring-yellow-500/20 outline-none"
              maxLength={10000}
            />
            
            <div className="absolute bottom-3 right-3 text-base text-yellow-900/60 dark:text-yellow-500/60">
              {charactersEntered} / 10,000
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSummarize}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-lg transition-colors duration-200
              ${isLoading 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400' 
                : 'bg-yellow-900 dark:bg-yellow-500 text-white dark:text-gray-900 hover:bg-yellow-800 dark:hover:bg-yellow-400'
              }`}
          >
            {isLoading ? 'Processing...' : 'Summarize'}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 dark:text-red-400 text-base text-center"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence>
            {summary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <textarea
                  value={summary}
                  readOnly
                  className="w-full h-40 p-4 rounded-lg border border-yellow-900/20 dark:border-yellow-500/20 
                           bg-yellow-50 dark:bg-yellow-900/10 text-gray-800 dark:text-gray-200 
                           resize-none cursor-default text-lg"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default App;