'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getQuoteOfTheDay } from '@/lib/getQuoteOfTheDay';
import QuoteCard from "@/component/QuoteCard";
import ShareButtons from '@/component/ShareButtons';
import ThemeToggle from '@/component/ThemeToggle';

export default function Home() {
    const [quote, setQuote] = useState(getQuoteOfTheDay());
    const [savedQuotes, setSavedQuotes] = useState([]);
    const [showSaved, setShowSaved] = useState(false);
    
    // Load saved quotes from localStorage on component mount
    useEffect(() => {
        const saved = localStorage.getItem('savedQuotes');
        if (saved) {
            setSavedQuotes(JSON.parse(saved));
        }
    }, []);
    
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
            <header className="w-full max-w-4xl flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                        Kata Hari Ini
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Inspirasi untuk jiwamu
                    </p>
                </div>
                <ThemeToggle />
            </header>

            <div className="max-w-xl w-full space-y-10">
                <div className="relative">
                    <div className="absolute -top-6 -left-6 opacity-30">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 10.5C5.34 10.5 4.25 10.03 3.44 9.19C2.62 8.34 2.15 7.25 2.15 6.09C2.15 4.94 2.62 3.84 3.46 3C4.31 2.16 5.41 1.69 6.57 1.69C8.87 1.69 10.74 3.55 10.74 5.85C10.74 8.15 8.87 10.03 6.57 10.03C6.57 10.03 6.5 10.5 6.5 10.5ZM17.69 10.5C16.53 10.5 15.44 10.03 14.62 9.19C13.81 8.34 13.34 7.25 13.34 6.09C13.34 4.94 13.81 3.84 14.65 3C15.5 2.16 16.59 1.69 17.76 1.69C20.06 1.69 21.93 3.55 21.93 5.85C21.93 8.15 20.06 10.03 17.76 10.03C17.69 10.03 17.69 10.5 17.69 10.5ZM6.5 22.31C5.34 22.31 4.25 21.84 3.44 21C2.62 20.16 2.15 19.06 2.15 17.91C2.15 16.75 2.62 15.66 3.46 14.84C4.31 14 5.41 13.53 6.57 13.53C8.87 13.53 10.74 15.4 10.74 17.7C10.74 20 8.87 21.87 6.57 21.87C6.5 21.87 6.5 22.31 6.5 22.31ZM17.69 22.31C16.53 22.31 15.44 21.84 14.62 21C13.81 20.16 13.34 19.06 13.34 17.91C13.34 16.75 13.81 15.66 14.65 14.84C15.5 14 16.59 13.53 17.76 13.53C20.06 13.53 21.93 15.4 21.93 17.7C21.93 20 20.06 21.87 17.76 21.87C17.69 21.87 17.69 22.31 17.69 22.31Z" fill="currentColor" />
                        </svg>
                    </div>
                    <QuoteCard quote={quote} />
                </div>

                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <ShareButtons quote={quote} />
                        
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={saveQuote}
                            disabled={isQuoteSaved}
                            className={`flex items-center justify-center p-2 rounded-full transition-colors ${
                                isQuoteSaved 
                                    ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed' 
                                    : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                            }`}
                            title={isQuoteSaved ? "Kutipan sudah tersimpan" : "Simpan kutipan ini"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isQuoteSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </motion.button>
                    </div>
                    
                    <div className="w-full">                        
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowSaved(!showSaved)}
                            className="w-full py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg border border-indigo-100 transition-all flex items-center justify-center space-x-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>Koleksi Kutipan</span>
                        </motion.button>
                    </div>
                </div>
                
                {/* Koleksi Kutipan Tersimpan */}
                {showSaved && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-lg shadow-md p-6 space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-indigo-800">Kutipan Tersimpan</h2>
                        
                        {savedQuotes.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">
                                Belum ada kutipan tersimpan. Simpan kutipan favorit Anda dengan klik ikon bookmark.
                            </p>
                        ) : (
                            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                                {savedQuotes.map((savedQuote, index) => (
                                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                                        <p className="text-gray-800 italic">"{savedQuote.text}"</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-indigo-600 text-sm">— {savedQuote.author || 'Anonim'}</p>
                                            <button
                                                onClick={() => {
                                                    const updatedQuotes = [...savedQuotes];
                                                    updatedQuotes.splice(index, 1);
                                                    setSavedQuotes(updatedQuotes);
                                                    localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
                                                }}
                                                className="text-red-400 hover:text-red-600 transition-colors"
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
            </div>
            
            {/* Notifikasi */}
            <div 
                id="notification"
                className="fixed bottom-0 left-0 right-0 bg-green-500 text-white py-3 text-center transform translate-y-full transition-transform duration-300 ease-in-out"
            >
                Kutipan berhasil disimpan ke koleksi Anda!
            </div>
        </main>
    );
}