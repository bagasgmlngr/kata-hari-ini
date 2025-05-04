'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  
  useEffect(() => {
    fetchQuotes();
  }, []);
  
  async function fetchQuotes() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('submitted_quotes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setQuotes(data || []);
    } catch (err) {
      console.error('Error fetching quotes:', err);
      setError('Gagal memuat data kutipan.');
    } finally {
      setLoading(false);
    }
  }
  
  async function updateQuoteStatus(id, status) {
    try {
      const { error } = await supabase
        .from('submitted_quotes')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setQuotes(quotes.map(quote => 
        quote.id === id ? { ...quote, status } : quote
      ));
      
      // Show notification
      setNotification({
        type: 'success',
        message: `Kutipan berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}.`
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error updating quote status:', err);
      setNotification({
        type: 'error',
        message: 'Gagal mengubah status kutipan.'
      });
    }
  }
  
  // Filter quotes based on selected filter
  const filteredQuotes = filter === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.status === filter);

  // Rendered quotes list JSX here - same as before
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Admin UI components here - same as in previous examples */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Admin Panel - Kata Hari Ini</h1>
          <p className="text-gray-600 dark:text-gray-400">Kelola kutipan yang dikirimkan pengguna</p>
        </div>
        
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 transition-colors dark:text-indigo-400 dark:hover:text-indigo-300">
          &larr; Kembali ke Home
        </Link>
      </div>
      
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mb-6 p-4 rounded-lg ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400'
          }`}
        >
          {notification.message}
        </motion.div>
      )}
      
      {/* Filter tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto pb-1">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 whitespace-nowrap ${
            filter === 'all' 
              ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium' 
              : 'text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400'
          }`}
        >
          Semua Kutipan
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 whitespace-nowrap ${
            filter === 'pending' 
              ? 'border-b-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 font-medium' 
              : 'text-gray-600 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400'
          }`}
        >
          Menunggu Persetujuan
        </button>
        <button 
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 whitespace-nowrap ${
            filter === 'approved' 
              ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400 font-medium' 
              : 'text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400'
          }`}
        >
          Disetujui
        </button>
        <button 
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 whitespace-nowrap ${
            filter === 'rejected' 
              ? 'border-b-2 border-red-500 text-red-600 dark:text-red-400 font-medium' 
              : 'text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400'
          }`}
        >
          Ditolak
        </button>
      </div>
      
      {/* Quote list display (loading, error, empty, or quote cards) here */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Memuat data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          {filter === 'all' 
            ? 'Belum ada kutipan yang dikirimkan.' 
            : `Belum ada kutipan dengan status "${filter === 'pending' ? 'menunggu' : filter === 'approved' ? 'disetujui' : 'ditolak'}".`}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuotes.map(quote => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-5 dark:bg-gray-800"
            >
              <div className="mb-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                  quote.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300' 
                    : quote.status === 'approved' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'
                }`}>
                  {quote.status === 'pending' ? 'Menunggu' : 
 quote.status === 'approved' ? 'Disetujui' : 'Ditolak'}
</span>
              </div>
              
              <p className="text-gray-800 text-lg italic dark:text-gray-100">"{quote.content}"</p>
              
              <div className="mt-3 flex justify-between items-center">
                <p className="text-indigo-600 dark:text-indigo-400">— {quote.author || 'Anonim'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(quote.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              
              {quote.status === 'pending' && (
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'approved')}
                    className="flex-1 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors dark:bg-green-800/30 dark:text-green-400 dark:hover:bg-green-800/50"
                  >
                    Setujui
                  </button>
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'rejected')}
                    className="flex-1 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors dark:bg-red-800/30 dark:text-red-400 dark:hover:bg-red-800/50"
                  >
                    Tolak
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}