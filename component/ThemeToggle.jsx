// component/ThemeToggle.jsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center justify-start p-1 cursor-not-allowed opacity-50">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-12 h-6 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-700 dark:to-purple-800 flex items-center transition-colors duration-200 focus:outline-none shadow-md relative"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="flex w-full justify-between absolute top-0 left-0 right-0 bottom-0 px-1">
        <span className="flex items-center">
          {/* Moon Icon (visible when theme is 'light') */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme === 'dark' ? 'white' : 'transparent'}
            className="w-4 h-4 text-white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </span>
        <span className="flex items-center">
          {/* Sun Icon (visible when theme is 'dark') */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme === 'dark' ? 'transparent' : 'white'}
            className="w-4 h-4 text-white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </span>
      </div>
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md z-10"
        animate={{
          x: theme === 'dark' ? '6px' : '26px',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}