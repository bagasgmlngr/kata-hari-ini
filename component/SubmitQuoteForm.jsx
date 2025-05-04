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
    <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-indigo-800 mb-4 dark:text-indigo-300">Kirim Kutipan Baru</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="quoteText" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Kutipan
          </label>
          <textarea
            id="quoteText"
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              tooShort || tooLong ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
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
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Penulis (opsional)
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
              ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600' 
              : 'bg-indigo-400 cursor-not-allowed dark:bg-indigo-500'
          }`}
        >
          {loading ? 'Mengirim...' : 'Kirim Kutipan'}
        </motion.button>
      </form>
      
      {/* Success Notification */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center dark:bg-green-800/30 dark:text-green-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Kutipan berhasil dikirim! Terima kasih atas kontribusi Anda.
        </motion.div>
      )}
      
      {/* Error Notification */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center dark:bg-red-800/30 dark:text-red-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}
    </div>
  );
}