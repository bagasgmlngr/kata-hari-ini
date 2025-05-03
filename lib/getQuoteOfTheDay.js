// lib/getQuoteOfTheDay.js - Fungsi untuk mendapatkan kutipan hari ini
import quotes from '@/data/quotes.json';

export function getQuoteOfTheDay() {
    // Mendapatkan tanggal hari ini sebagai string dalam format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Menggunakan tanggal untuk menentukan kutipan yang akan ditampilkan
    // Kita gunakan metode ini untuk memastikan kutipan yang sama muncul sepanjang hari

    // Konversi string tanggal menjadi angka untuk seed
    const seed = today.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);

    // Gunakan seed untuk memilih quote
    const index = seed % quotes.length;

    return quotes[index];
}

