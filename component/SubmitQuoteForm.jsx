'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function SubmitQuoteForm() {
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Validation states
  const tooShort = quoteText.length > 0 && quoteText.length < 5;
  const tooLong = quoteText.length > 300;
  const isValid = quoteText.length >= 5 && quoteText.length <= 300;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('submitted_quotes')
        .insert([
          { 
            content: quoteText,
            author: author || 'Anonim',
            status: 'pending'
          }
        ]);
      
      if (error) throw error;
      
      // Reset form
      setQuoteText('');
      setAuthor('');
      setSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError('Maaf, terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 dark-transition border border-indigo-50 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">Kirim Kutipan Baru</h2>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Bagikan kutipan inspiratif untuk menginspirasi orang lain. Setiap kutipan akan ditinjau sebelum ditampilkan.
      </p>
      
      {success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-400 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Kutipan berhasil dikirim! Terima kasih atas kontribusi Anda.
        </motion.div>
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-400 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}
      
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="quoteText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kutipan
            </label>
            <textarea
              id="quoteText"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] dark-transition
                ${tooShort || tooLong 
                  ? 'border-red-300 dark:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
                } 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white border`}
              placeholder="Tuliskan kutipan inspiratif disini..."
            />
            
            <div className="mt-1 flex justify-between text-sm">
              <div>
                {tooShort && <p className="text-red-600 dark:text-red-400">Minimal 5 karakter</p>}
                {tooLong && <p className="text-red-600 dark:text-red-400">Maksimal 300 karakter</p>}
              </div>
              <p className={`${quoteText.length > 280 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {quoteText.length}/300
              </p>
            </div>
          </div>
          
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Penulis (opsional)
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark-transition"
              placeholder="Nama penulis kutipan"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
              isValid && !loading 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600' 
                : 'bg-indigo-400 dark:bg-indigo-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Mengirim...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <span>Kirim Kutipan</span>
              </div>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}