// Perubahan pada app/page.jsx
// Tambahkan state dan fungsi randomize

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Pastikan ini sudah diimpor
import QuoteCard from "@/component/QuoteCard";
import ShareButtons from '@/component/ShareButtons';
import ThemeToggle from '@/component/ThemeToggle';
import SubmitQuoteForm from '@/component/SubmitQuoteForm';

export default function Home() {
    // Gunakan state dasar untuk kutipan
    const [quote, setQuote] = useState({
        text: "Memuat kutipan...",
        author: ""
    });
    const [savedQuotes, setSavedQuotes] = useState([]);
    const [showSaved, setShowSaved] = useState(false);
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [allQuotes, setAllQuotes] = useState([]); // State untuk menyimpan semua quotes
    const [isLoading, setIsLoading] = useState(false); // State untuk loading indicator
    
    // Fetch kutipan dan load saved quotes
    useEffect(() => {
        // Load saved quotes dari localStorage
        const saved = localStorage.getItem('savedQuotes');
        if (saved) {
            setSavedQuotes(JSON.parse(saved));
        }
        
        // Fetch kutipan dari Supabase
        async function fetchQuotes() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('submitted_quotes')
                    .select('*')
                    .eq('status', 'approved')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                
                if (data && data.length > 0) {
                    // Simpan semua quotes untuk digunakan dalam fitur random
                    setAllQuotes(data);
                    
                    // Pilih kutipan berdasarkan tanggal
                    const today = new Date();
                    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
                    const index = dayOfYear % data.length;
                    
                    // Set quote dari database
                    setQuote({
                        text: data[index].content,
                        author: data[index].author
                    });
                }
            } catch (error) {
                console.error('Error fetching quotes:', error);
                // Jika fetch gagal, gunakan kutipan default
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchQuotes();
    }, []);
    
    // Function untuk mendapatkan quote secara acak
    const getRandomQuote = () => {
        if (allQuotes.length === 0) return;
        
        setIsLoading(true);
        
        // Untuk animasi loading
        setTimeout(() => {
            // Pilih quotes secara acak
            const randomIndex = Math.floor(Math.random() * allQuotes.length);
            const randomQuote = allQuotes[randomIndex];
            
            setQuote({
                text: randomQuote.content,
                author: randomQuote.author
            });
            
            setIsLoading(false);
        }, 300); // Delay kecil untuk efek visual
    };
    
    // Function to save current quote
    const saveQuote = () => {
        const updatedSavedQuotes = [...savedQuotes, quote];
        setSavedQuotes(updatedSavedQuotes);
        localStorage.setItem('savedQuotes', JSON.stringify(updatedSavedQuotes));
        
        // Show success notification
        const notification = document.getElementById('notification');
        notification.classList.remove('translate-y-full');
        setTimeout(() => {
            notification.classList.add('translate-y-full');
        }, 3000);
    };
    
    // Check if current quote is already saved
    const isQuoteSaved = savedQuotes.some(
        savedQuote => savedQuote.text === quote.text
    );

    return (
        <main className="flex min-h-screen flex-col items-center pt-12 pb-24 p-6">
            {/* Header */}
            <header className="w-full max-w-4xl flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                        Kata Hari Ini
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Inspirasi untuk jiwamu
                    </p>
                </div>
                <ThemeToggle />
            </header>

            <div className="max-w-xl w-full space-y-10">
                {/* Quote Card */}
                <QuoteCard quote={quote} isLoading={isLoading} />

                {/* Randomize Button - Tambahan baru */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={getRandomQuote}
                    disabled={isLoading || allQuotes.length === 0}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 ${
                        (isLoading || allQuotes.length === 0) ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                        </svg>
                    )}
                    <span>{isLoading ? 'Mengacak...' : 'Acak Kutipan Lain'}</span>
                </motion.button>

                {/* Share buttons dan Save button */}
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <ShareButtons quote={quote} />
                        
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={saveQuote}
                            disabled={isQuoteSaved}
                            className={`flex items-center justify-center p-2 rounded-full transition-colors ${
                                isQuoteSaved 
                                    ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed dark:bg-indigo-900 dark:text-indigo-600' 
                                    : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-400'
                            }`}
                            title={isQuoteSaved ? "Kutipan sudah tersimpan" : "Simpan kutipan ini"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isQuoteSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </motion.button>
                    </div>
                    
                    {/* Koleksi dan Submit buttons */}
                    <div className="w-full flex space-x-3">                        
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowSaved(!showSaved)}
                            className="flex-1 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg border border-indigo-100 transition-all flex items-center justify-center space-x-2 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-900"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>Koleksi Kutipan</span>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowSubmitForm(!showSubmitForm)}
                            className="flex-1 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg border border-indigo-700 transition-all flex items-center justify-center space-x-2 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>Kirim Kutipan</span>
                        </motion.button>
                    </div>
                </div>
                
                {/* Koleksi Kutipan Tersimpan */}
                {showSaved && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-gray-800"
                    >
                        {/* Konten koleksi kutipan... */}
                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">Kutipan Tersimpan</h2>
                        
                        {savedQuotes.length === 0 ? (
                            <p className="text-gray-500 text-center py-4 dark:text-gray-400">
                                Belum ada kutipan tersimpan. Simpan kutipan favorit Anda dengan klik ikon bookmark.
                            </p>
                        ) : (
                            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                                {savedQuotes.map((savedQuote, index) => (
                                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700">
                                        <p className="text-gray-800 italic dark:text-gray-200">"{savedQuote.text}"</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-indigo-600 text-sm dark:text-indigo-400">— {savedQuote.author || 'Anonim'}</p>
                                            <button
                                                onClick={() => {
                                                    const updatedQuotes = [...savedQuotes];
                                                    updatedQuotes.splice(index, 1);
                                                    setSavedQuotes(updatedQuotes);
                                                    localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
                                                }}
                                                className="text-red-400 hover:text-red-600 transition-colors dark:text-red-500 dark:hover:text-red-400"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
                
                {/* Form Submit Kutipan */}
                {showSubmitForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <SubmitQuoteForm />
                    </motion.div>
                )}
            </div>
            
            {/* Notifikasi */}
            <div 
                id="notification"
                className="fixed bottom-0 left-0 right-0 bg-green-500 dark:bg-green-600 text-white py-3 text-center transform translate-y-full transition-transform duration-300 ease-in-out"
            >
                Kutipan berhasil disimpan ke koleksi Anda!
            </div>
        </main>
    );
}