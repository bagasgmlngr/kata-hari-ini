'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ShareButtons({ quote }) {
  const [activeTab, setActiveTab] = useState('social'); // 'social' atau 'copy'
  const [copied, setCopied] = useState(false);
  
  // Pastikan komponen dapat bekerja dengan format dari database dan format lama
  const quoteText = quote.text || quote.content;
  const quoteAuthor = quote.author || 'Anonim';
  
  const shareText = `"${quoteText}" — ${quoteAuthor}`;
  const encodedQuote = encodeURIComponent(shareText);
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedQuote}&hashtags=KataHariIni`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedQuote}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=https://kataharini.vercel.app&quote=${encodedQuote}`,
    telegram: `https://t.me/share/url?url=https://kataharini.vercel.app&text=${encodedQuote}`
  };
  
  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank');
  };
  
  const handleCopy = (type) => {
    let textToCopy = '';
    
    if (type === 'text') {
      textToCopy = shareText;
    } else if (type === 'html') {
      textToCopy = `<blockquote>
  <p>"${quoteText}"</p>
  <footer>— ${quoteAuthor}</footer>
</blockquote>`;
    } else if (type === 'markdown') {
      textToCopy = `> "${quoteText}"
> 
> — ${quoteAuthor}`;
    }
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      {/* Tab Selector */}
      <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeTab === 'social'
              ? 'bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-300'
              : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300'
          }`}
        >
          Sosial Media
        </button>
        <button
          onClick={() => setActiveTab('copy')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeTab === 'copy'
              ? 'bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-300'
              : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300'
          }`}
        >
          Salin
        </button>
      </div>
      
      {/* Social Media Buttons */}
      {activeTab === 'social' && (
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare('twitter')}
            className="px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a94da] text-white font-medium rounded-md transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span>Twitter</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare('whatsapp')}
            className="px-4 py-2 bg-[#25D366] hover:bg-[#22c35e] text-white font-medium rounded-md transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center space-x-2"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare('facebook')}
            className="px-4 py-2 bg-[#4267B2] hover:bg-[#3b5fa3] text-white font-medium rounded-md transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare('telegram')}
            className="px-4 py-2 bg-[#0088cc] hover:bg-[#007ab8] text-white font-medium rounded-md transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span>Telegram</span>
          </motion.button>
        </div>
      )}
      
      {/* Copy Options */}
      {activeTab === 'copy' && (
        <div className="space-y-3">
          <button
            onClick={() => handleCopy('text')}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              <span>Salin sebagai teks biasa</span>
            </div>
            {copied && <span className="text-green-600 dark:text-green-400 text-sm">✓ Tersalin!</span>}
          </button>
          
          <button
            onClick={() => handleCopy('markdown')}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Salin sebagai Markdown</span>
            </div>
            {copied && <span className="text-green-600 dark:text-green-400 text-sm">✓ Tersalin!</span>}
          </button>
          
          <button
            onClick={() => handleCopy('html')}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <span>Salin sebagai HTML</span>
            </div>
            {copied && <span className="text-green-600 dark:text-green-400 text-sm">✓ Tersalin!</span>}
          </button>
        </div>
      )}
    </div>
  );
}