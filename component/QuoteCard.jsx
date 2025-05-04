// component/QuoteCard.jsx
'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function QuoteCard({ quote, isLoading }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-8 dark-transition rounded-xl shadow-lg text-center relative overflow-hidden dark:shadow-indigo-900/20 bg-white dark:bg-gray-800 border border-indigo-50 dark:border-gray-700"
    >
      {/* Quote background decorations */}
      <div className="absolute top-4 left-4 text-indigo-200 dark:text-indigo-800 text-7xl font-serif opacity-40">
        "
      </div>
      <div className="absolute bottom-4 right-4 text-indigo-200 dark:text-indigo-800 text-7xl font-serif opacity-40">
        "
      </div>

      {/* Quote content */}
      <div className="relative">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-2/3 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-2/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-1/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-4"></div>
          </div>
        ) : (
          <>
            <p className={`text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-200 font-serif italic mb-4 ${mounted && theme === 'dark' ? 'var(--font-playfair)' : ''}`}>
              "{quote.text}"
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
              — {quote.author || 'Anonim'}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}