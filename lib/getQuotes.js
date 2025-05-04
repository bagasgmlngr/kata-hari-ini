// Fungsi untuk mengambil kutipan dari database
export async function getApprovedQuotes() {
    try {
      const response = await fetch('/api/quotes', {
        cache: 'no-store',
        next: { revalidate: 0 }
      });
      
      // Tangani respons yang tidak ok secara lebih baik
      if (!response.ok) {
        console.error('API responded with status:', response.status);
        // Jangan throw error, gunakan fallback ke kutipan statis
        return [];
      }
      
      const data = await response.json();
      return data.quotes || [];
    } catch (error) {
      console.error('Error fetching quotes:', error);
      // Kembalikan array kosong sebagai fallback
      return [];
    }
  }
  
  // Ini untuk fallback jika API gagal
  export function getQuoteOfTheDay() {
    const quotes = [
      {
        text: "Keajaiban selalu terjadi pada mereka yang tak pernah menyerah.",
        author: "Pramoedya Ananta Toer"
      },
      {
        text: "Sebelum menolong orang lain, saya harus dapat menolong diri sendiri dulu. Sebelum menguatkan orang lain, saya harus menguatkan diri sendiri dahulu.",
        author: "Najwa Shihab"
      },
      {
        text: "Hidup ini sederhana, kita yang membuatnya sulit.",
        author: "Confucius"
      }
    ];
    
    // Mendapatkan kutipan berdasarkan tanggal
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % quotes.length;
    
    return quotes[index];
  }