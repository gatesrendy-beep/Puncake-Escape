import { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Car, 
  Clock, 
  AlertCircle, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { PUNCAK_GUIDE, REVIEWS_DATA } from '../data/guide';
import { generateGeneralWhatsAppInquiryUrl } from '../utils/format';

export function PuncakGuide() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="puncak-guide-section" className="py-16 md:py-24 bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: Local Knowledge - Puncak, Cisarua & Tugu Selatan Guide */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              Panduan Lokal Puncak 16750
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-stone-900">
              Tips Liburan Bebas Macet di Puncak & Cisarua
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Informasi jadwal buka tutup (one-way), ganjil genap, dan lokasi strategis Tugu Selatan, Cisarua, Jawa Barat 16750.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PUNCAK_GUIDE.trafficTips.map((tip, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  {idx === 0 ? <Clock className="w-5 h-5" /> : idx === 1 ? <AlertCircle className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-stone-900 text-base">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {tip.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Concierge Route Assistant Banner */}
          <div className="mt-6 bg-emerald-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg font-display flex items-center justify-center sm:justify-start gap-2">
                <span>🚘 Takut kena macet atau bingung jadwal one-way?</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200">
                Chat tim WhatsApp Puncak Escape. Kami siap membagikan info live traffic Gadog - Cisarua & rekomendasi jam keberangkatan terbaik!
              </p>
            </div>
            <a
              href={generateGeneralWhatsAppInquiryUrl('Halo Admin Puncak Escape, mau tanya info kondisi jalan & jadwal one way ke Tugu Selatan saat ini bagaimana ya?')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm font-bold shrink-0 flex items-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>Tanya Live Traffic via WA</span>
            </a>
          </div>
        </div>

        {/* Section 2: Nearby Attractions */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Destinasi Populer Terdekat</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              Hanya Beberapa Menit dari Villa Anda
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PUNCAK_GUIDE.nearbyAttractions.map((att) => (
              <div key={att.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {att.category}
                  </span>
                  <h4 className="font-bold text-stone-900 text-sm mt-2">
                    {att.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {att.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{att.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Verified Guest Reviews */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Dipercaya Ratusan Tamu dari Jakarta & Sekitarnya
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Ulasan asli dari keluarga, korporat, dan pasangan yang telah menginap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{rev.guestName}</div>
                    <div className="text-xs text-stone-500">{rev.guestCity} • {rev.purpose}</div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-amber-900">{rev.rating}.0</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-medium text-emerald-800">Menginap di: {rev.villaName}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Pertanyaan Umum</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              Seputar Pemesanan di Puncak Escape
            </h3>
          </div>

          <div className="space-y-3">
            {PUNCAK_GUIDE.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm hover:bg-stone-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
