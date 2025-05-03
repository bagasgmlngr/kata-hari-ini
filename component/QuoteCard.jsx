import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuoteCard({ quote }) {
    const [isVisible, setIsVisible] = useState(false);
    
    // Animasi untuk menampilkan kutipan saat komponen dimuat
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 20 
            }}
            transition={{ duration: 0.6 }}
            className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100"
        >
            {/* Elemen dekoratif */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <div className="p-8 sm:p-10">
                {/* Tanda kutip dekoratif */}
                <div className="absolute opacity-10 text-8xl font-serif text-indigo-300 top-4 left-4">
                    "
                </div>
                
                <blockquote className="relative z-10">
                    <div className="font-playfair text-xl sm:text-2xl md:text-3xl text-gray-800 leading-relaxed mb-6">
                        "{quote.text}"
                    </div>
                    <footer className="mt-6 text-right">
                        <cite className="text-indigo-600 font-medium not-italic">
                            — {quote.author || 'Anonim'}
                        </cite>
                    </footer>
                </blockquote>
            </div>
            
            {/* Indikator refresh */}
            <div className="absolute bottom-4 right-4">
                <button
                    className="text-indigo-400 hover:text-indigo-600 transition-colors"
                    title="Kutipan baru setiap hari"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
}