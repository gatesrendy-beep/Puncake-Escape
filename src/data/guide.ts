export interface Review {
  id: string;
  guestName: string;
  guestCity: string;
  villaId: string;
  villaName: string;
  rating: number;
  date: string;
  comment: string;
  purpose: 'Family Gathering' | 'Weekend Getaway' | 'Company Retreat' | 'Staycation';
}

export interface Attraction {
  id: string;
  name: string;
  distance: string;
  category: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    guestName: 'Bambang & Keluarga',
    guestCity: 'Jakarta Selatan',
    villaId: 'villa-casablanca-tugu',
    villaName: 'Villa Casablanca Tugu',
    rating: 5,
    date: 'Agustus 2026',
    comment: 'Sangat puas! Kolam renang air hangatnya juara banget buat anak-anak berenang malam hari di Puncak yang dingin. Villa bersih, view ke Gunung Gede luas banget tanpa halangan. Penjaga villa (Pak Ujang) ramah dan sangat membantu manggang BBQ. Proses booking lewat WhatsApp juga kilat!',
    purpose: 'Family Gathering'
  },
  {
    id: 'rev-2',
    guestName: 'Jessica Anastasia & Tim',
    guestCity: 'BSD, Tangerang',
    villaId: 'the-glasshouse-puncak',
    villaName: 'The Glasshouse Sanctuary',
    rating: 5,
    date: 'September 2026',
    comment: 'Aesthetic pol! Desain kacanya bikin betah kerja sambil healing. WiFi kenceng stabil 100 Mbps buat Zoom meeting bareng tim corporate. Suasananya sejuk tenang di tengah kebun teh Cisarua. Pasti bakal balik lagi.',
    purpose: 'Company Retreat'
  },
  {
    id: 'rev-3',
    guestName: 'Dimas Wicaksono',
    guestCity: 'Bandung',
    villaId: 'villa-aruna-hillside',
    villaName: 'Villa Aruna Japandi Hillside',
    rating: 5,
    date: 'Juli 2026',
    comment: 'Vibes Jepangnya dapet banget, rapi dan wangi. Anak-anak seneng ada meja billiard dan area rumput luas. Booking via Puncak Escape transparan banget tanpa biaya tersembunyi. Sangat direkomendasikan untuk kumpul keluarga besar.',
    purpose: 'Family Gathering'
  },
  {
    id: 'rev-4',
    guestName: 'Sarah & Rayhan',
    guestCity: 'Jakarta Barat',
    villaId: 'villa-lavender-haven',
    villaName: 'Villa Lavender Romantic Cottage',
    rating: 5,
    date: 'Agustus 2026',
    comment: 'Weekend getaway berdua yang sangat memorable. Suasana cottage Eropa dengan taman bunga dan kolam privat hangat. Admin WhatsApp ramah banget kasih info jam ganjil genap dan jalur alternatif biar ga kena macet.',
    purpose: 'Weekend Getaway'
  }
];

export const PUNCAK_GUIDE = {
  trafficTips: [
    {
      title: 'Jadwal One-Way (Buka Tutup)',
      detail: 'Sabtu: Naik (Arah Puncak) 07:30 - 11:30 WIB | Turun (Arah Jakarta) 13:00 - 17:00 WIB. Minggu: Naik 07:30 - 10:00 WIB | Turun 12:30 - 18:00 WIB. (Fleksibel menyesuaikan diskresi Satlantas Polres Bogor).'
    },
    {
      title: 'Pemberlakuan Ganjil-Genap',
      detail: 'Berlaku setiap Jumat mulai pukul 14:00 WIB hingga Minggu malam 24:00 WIB di jalur Tol Ciawi / Gadog. Sesuaikan angka pelat nomor akhir kendaraan dengan tanggal ganjil/genap hari kedatangan.'
    },
    {
      title: 'Jalur Alternatif Bebas Macet',
      detail: 'Bisa via jalur Bukit Pelangi / Rainbow Hills atau alternatif Pasir Muncang tembus Cisarua. Tim concierge WhatsApp Puncak Escape siap membagikan live Google Maps update rute tercepat saat Anda berangkat!'
    }
  ],
  nearbyAttractions: [
    {
      id: 'att-1',
      name: 'Kebun Teh Agro Wisata Gunung Mas',
      distance: '5 - 10 Menit dari Tugu Selatan',
      category: 'Nature & Adventure',
      description: 'Tea walk, tea bridge kayu melayang di atas perkebunan teh, wahana berkuda, ATV, dan paralayang.'
    },
    {
      id: 'att-2',
      name: 'Telaga Saat Puncak',
      distance: '15 Menit dari Tugu Selatan',
      category: 'Scenic Viewpoint',
      description: 'Danau alami di titik 0 km Sungai Ciliwung dengan pemandangan kabut mistis dan perbukitan teh.'
    },
    {
      id: 'att-3',
      name: 'Taman Safari Indonesia Cisarua',
      distance: '12 Menit dari Cisarua',
      category: 'Family Zoo & Safari',
      description: 'Safari journey interaksi satwa liar kelas dunia, panda palace, dan wahana rekreasi ramah keluarga.'
    },
    {
      id: 'att-4',
      name: 'Cimory Dairyland & Riverside',
      distance: '20 Menit dari Cisarua',
      category: 'Culinary & Fun',
      description: 'Taman peternakan instagramable, resto pinggir sungai, dan oleh-oleh khas susu serta yogurt Puncak.'
    }
  ],
  faqs: [
    {
      question: 'Bagaimana cara booking villa di Puncak Escape?',
      answer: 'Sangat mudah & praktis! Cukup pilih villa yang Anda sukai, masukkan tanggal check-in & check-out, lalu klik tombol "Booking via WhatsApp". Sistem kami akan langsung membuat draf pesan pemesanan lengkap untuk dikirimkan langsung ke admin resmi Puncak Escape via WhatsApp.'
    },
    {
      question: 'Apakah harga sudah termasuk seluruh fasilitas villa?',
      answer: 'Ya, harga yang tercantum adalah harga sewa seluruh unit villa (private entire villa), termasuk kolam renang pribadi, dapur lengkap, gas elpiji, air galon mineral, listrik, serta bantuan penjaga villa (caretaker).'
    },
    {
      question: 'Bagaimana sistem pembayaran dan keamanan transaksi?',
      answer: 'Setelah ketersediaan tanggal diverifikasi admin melalui WhatsApp, Anda cukup membayar DP (Down Payment) sebesar 30% - 50% ke rekening resmi kami untuk mengunci tanggal. Pelunasan dapat dilakukan H-3 atau saat tiba di villa.'
    },
    {
      question: 'Apakah ada deposit keamanan (security deposit)?',
      answer: 'Beberapa villa menerapkan security deposit sebesar Rp 500.000 saat serah terima kunci. Deposit ini 100% dikembalikan secara penuh saat check-out setelah pemeriksaan kondisi villa.'
    },
    {
      question: 'Berapa kapasitas maksimal tamu villa?',
      answer: 'Setiap halaman detail villa mencantumkan kapasitas nyaman dan maksimal. Jika melebihi kapasitas standar, beberapa villa menyediakan tambahan extra bed dengan tarif terjangkau (Rp 50.000 - Rp 100.000 / bed / malam).'
    }
  ]
};
