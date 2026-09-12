import { 
  PhoneCall, 
  MapPin, 
  Mail, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { WHATSAPP_DISPLAY, OFFICE_ADDRESS } from '../data/villas';
import { generateGeneralWhatsAppInquiryUrl } from '../utils/format';

interface FooterProps {
  onSelectArea: (area: string) => void;
  onFilterHeated: () => void;
  onFilterFamily: () => void;
}

export function Footer({ onSelectArea, onFilterHeated, onFilterFamily }: FooterProps) {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pb-14 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Description (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-serif-heading font-bold">
                <span>P</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  Puncak Escape
                </span>
                <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-medium">
                  Your Escape in Puncak
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Puncak Escape helps guests discover and book villas around Puncak, Cisarua, Tugu Selatan, West Java, Indonesia 16750. Platform reservasi villa privat terverifikasi dengan konfirmasi cepat via WhatsApp.
            </p>

            <div className="pt-2 text-xs space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Layanan Customer Concierge: Setiap Hari 07.00 - 22.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Area & Wilayah */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Area Populer
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectArea('Tugu Selatan');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Villa Tugu Selatan (16750)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectArea('Cisarua');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Villa Cisarua Puncak
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectArea('Puncak Pass');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Villa Kawasan Puncak Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectArea('');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Semua Villa Terdaftar
                </button>
              </li>
            </ul>
          </div>

          {/* Kategori Favorit */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Pilihan Fasilitas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onFilterHeated();
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Villa Kolam Air Hangat (Heated Pool)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onFilterFamily();
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Villa Kapasitas Besar (20+ Tamu)
                </button>
              </li>
              <li>
                <a
                  href="#puncak-guide-section"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Jadwal Buka Tutup One-Way
                </a>
              </li>
              <li>
                <a
                  href="#puncak-guide-section"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tips Jalur Alternatif Ganjil-Genap
                </a>
              </li>
            </ul>
          </div>

          {/* Quick WhatsApp Concierge Card */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              WhatsApp Booking
            </h4>
            <p className="text-xs text-stone-400">
              Butuh konsultasi villa sesuai tanggal & jumlah rombongan keluarga?
            </p>
            <a
              href={generateGeneralWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md active:scale-95 text-center"
            >
              <PhoneCall className="w-3.5 h-3.5 fill-current" />
              <span>Chat WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Layanan Bebas Penipuan Villa</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Puncak Escape. All rights reserved. Your Escape in Puncak.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Tugu Selatan, Cisarua, West Java 16750</span>
            <span>•</span>
            <span>Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
