// app/layout.jsx - Layout yang ditingkatkan
import './globals.css';
import { Nunito, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

// Font sans-serif untuk teks umum
const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap'
});

// Font serif untuk kutipan
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

export const metadata = {
  title: 'Kata Hari Ini - Inspirasi Harian untuk Jiwamu',
  description: 'Temukan kutipan inspiratif harian dalam Bahasa Indonesia untuk mencerahkan harimu dan memberi ketenangan',
  keywords: 'kutipan harian, inspirasi, motivasi, kata-kata bijak, wallpaper quotes',
  openGraph: {
    title: 'Kata Hari Ini - Inspirasi Harian',
    description: 'Kutipan inspiratif harian dalam Bahasa Indonesia',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${nunito.variable} ${playfair.variable}`}>
      <body className={`${nunito.className} antialiased bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen`}>
        <div className="max-w-5xl mx-auto px-4">
          {children}
        </div>
        <footer className="py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Kata Hari Ini. Semua hak cipta dilindungi.</p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}