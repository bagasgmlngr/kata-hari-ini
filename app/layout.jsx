// app/layout.jsx - Layout yang ditingkatkan
import './globals.css';
import { Nunito, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/component/ThemeProvider';

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
    <html lang="id" className={`${nunito.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className={`${nunito.className} antialiased min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 text-gray-800 dark:text-gray-200 transition-colors duration-200`}>
        <ThemeProvider>
          <div className="max-w-5xl mx-auto px-4">
            {children}
          </div>
          <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Kata Hari Ini. Semua hak cipta dilindungi.</p>
          </footer>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}