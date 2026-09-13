import { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Users, 
  BedDouble, 
  Bath, 
  Flame, 
  Wifi, 
  UtensilsCrossed, 
  Tv, 
  Music, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Copy, 
  Calendar as CalendarIcon, 
  Share2, 
  Heart,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  PhoneCall
} from 'lucide-react';
import { Villa } from '../types';
import { 
  formatRupiah, 
  calculateNights, 
  calculateTotalEstimate, 
  generateWhatsAppBookingUrl,
  formatDateIndo 
} from '../utils/format';

interface VillaDetailModalProps {
  villa: Villa | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (villaId: string) => void;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  onDateChange: (checkIn: string, checkOut: string) => void;
  onGuestsChange: (count: number) => void;
}

export function VillaDetailModal({
  villa,
  onClose,
  isSaved,
  onToggleSave,
  checkInDate,
  checkOutDate,
  guestsCount,
  onDateChange,
  onGuestsChange,
}: VillaDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Reset image index when villa opens
    setActiveImageIndex(0);
  }, [villa?.id]);

  useEffect(() => {
    // Lock body scroll when modal is open
    if (villa) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [villa]);

  if (!villa) return null;

  const nights = calculateNights(checkInDate, checkOutDate);
  const { total, isWeekendIncluded } = calculateTotalEstimate(villa, checkInDate, checkOutDate);

  const whatsappUrl = generateWhatsAppBookingUrl({
    villa,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: guestsCount,
    name: customerName,
    specialNotes: specialNotes,
  });

  const handleCopyBookingDetails = () => {
    const text = `Halo Puncak Escape! Saya ingin booking ${villa.name} (${villa.location.area}, 16750) untuk tanggal ${checkInDate || 'TBD'} s/d ${checkOutDate || 'TBD'} (${nights} malam, ${guestsCount} tamu). Estimasi: ${formatRupiah(total)}.`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${villa.name} | Puncak Escape`,
        text: `${villa.tagline} - Booking via Puncak Escape WhatsApp`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan villa berhasil disalin!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Container card */}
      <div 
        className="bg-white w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              {villa.location.area}
            </span>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Cisarua, Bogor 16750
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-stone-600 hover:bg-stone-200 transition-colors"
              title="Bagikan Villa"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(villa.id)}
              className="p-2 rounded-xl text-stone-600 hover:bg-stone-200 transition-colors"
              title="Simpan Villa"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-600'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors ml-1"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          
          {/* Title and location overview */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{villa.rating.toFixed(2)}</span>
              <span className="text-stone-400">({villa.reviewCount} ulasan tamu terverifikasi)</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">100% Private Villa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-stone-900">
              {villa.name}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{villa.location.area}, {villa.location.district}, {villa.location.city} {villa.location.postalCode}</span>
            </p>

            {/* "Why This Villa?" Positioning Box */}
            <div className="mt-3 p-3 sm:p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 flex items-start gap-2.5">
              <div className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider shrink-0 mt-0.5">
                Rekomendasi
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {villa.whyThisVilla}
              </p>
            </div>
          </div>

          {/* Photo Gallery with Hero and Thumbnails */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-900">
              <img
                src={villa.images[activeImageIndex]}
                alt={`${villa.name} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex gap-2">
                {villa.amenities.hasHeatedPool && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md">
                    <Flame className="w-3.5 h-3.5" />
                    Kolam Renang Air Hangat
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Inspeksi Puncak Escape
                </span>
              </div>

              {/* Prev / Next buttons */}
              {villa.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
                    aria-label="Sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % villa.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
                    aria-label="Selanjutnya"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {villa.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 sm:w-24 aspect-[16/10] shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex ? 'border-emerald-700 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Two Columns Grid: Left Details, Right WhatsApp Booking Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Description, Amenities, Highlights */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Quick Specs Highlight Bar */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-center">
                <div>
                  <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">Kamar Tidur</span>
                  <p className="text-base sm:text-lg font-bold text-stone-900 mt-0.5">{villa.bedrooms} Kamar</p>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">Kamar Mandi</span>
                  <p className="text-base sm:text-lg font-bold text-stone-900 mt-0.5">{villa.bathrooms} Toilet</p>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">Kapasitas</span>
                  <p className="text-base sm:text-lg font-bold text-stone-900 mt-0.5">{villa.maxGuests} Tamu</p>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">Parkir</span>
                  <p className="text-base sm:text-lg font-bold text-stone-900 mt-0.5">{villa.amenities.parkingCapacityCars} Mobil</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold font-display text-stone-900 mb-2">
                  Tentang Villa
                </h3>
                <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                  {villa.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="text-lg font-bold font-display text-stone-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  Keunggulan Utama Villa Ini
                </h3>
                <div className="space-y-2.5">
                  {villa.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-stone-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-lg font-bold font-display text-stone-900 mb-3">
                  Fasilitas Lengkap
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-stone-700">
                  {villa.amenities.hasPrivatePool && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <span className="text-emerald-700 font-bold">🏊</span>
                      <span>Kolam Renang Privat</span>
                    </div>
                  )}
                  {villa.amenities.hasHeatedPool && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                      <Flame className="w-4 h-4 text-amber-600" />
                      <span>Kolam Air Hangat</span>
                    </div>
                  )}
                  {villa.amenities.hasMountainView && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <span className="text-emerald-700 font-bold">🏔️</span>
                      <span>View Gunung & Lembah</span>
                    </div>
                  )}
                  {villa.amenities.hasWifi && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <Wifi className="w-4 h-4 text-emerald-700" />
                      <span>WiFi Fiber Optic Cepat</span>
                    </div>
                  )}
                  {villa.amenities.hasKitchen && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
                      <span>Dapur Lengkap + Gas</span>
                    </div>
                  )}
                  {villa.amenities.hasBBQ && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <span className="text-emerald-700 font-bold">🍖</span>
                      <span>Panggangan BBQ</span>
                    </div>
                  )}
                  {villa.amenities.hasBilliard && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <span className="text-emerald-700 font-bold">🎱</span>
                      <span>Meja Billiard Standar</span>
                    </div>
                  )}
                  {villa.amenities.hasKaraoke && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <Music className="w-4 h-4 text-emerald-700" />
                      <span>Sound Karaoke & Mic</span>
                    </div>
                  )}
                  {villa.amenities.hasWaterHeater && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <Bath className="w-4 h-4 text-emerald-700" />
                      <span>Water Heater Setiap Kamar</span>
                    </div>
                  )}
                  {villa.amenities.hasSmartTv && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <Tv className="w-4 h-4 text-emerald-700" />
                      <span>Smart TV + Streaming</span>
                    </div>
                  )}
                  {villa.amenities.hasVillaAttendant && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Penjaga Villa Standby</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <Car className="w-4 h-4 text-emerald-700" />
                    <span>Parkir {villa.amenities.parkingCapacityCars} Mobil</span>
                  </div>
                </div>
              </div>

              {/* Bed Arrangements */}
              <div>
                <h3 className="text-lg font-bold font-display text-stone-900 mb-3">
                  Penataan Kamar Tidur
                </h3>
                <div className="space-y-2">
                  {villa.bedConfigurations.map((room, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs sm:text-sm">
                      <div className="flex items-center gap-2.5 font-semibold text-stone-800">
                        <BedDouble className="w-4 h-4 text-emerald-700" />
                        <span>{room.room}</span>
                      </div>
                      <span className="text-stone-600">{room.beds}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  Aturan & Waktu Check-In / Check-Out
                </h4>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <p>• <strong>Check-In:</strong> {villa.checkInTime} WIB | <strong>Check-Out:</strong> {villa.checkOutTime} WIB</p>
                  {villa.houseRules.map((rule, idx) => (
                    <p key={idx}>• {rule}</p>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive WhatsApp Booking Engine */}
            <div className="lg:col-span-5">
              <div className="bg-stone-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-sm sticky top-20 space-y-5">
                
                {/* Price Summary Header */}
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-xs text-stone-500 font-medium">Tarif Sewa Villa:</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <div>
                      <span className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                        {formatRupiah(villa.pricePerNightWeekday)}
                      </span>
                      <span className="text-xs text-stone-500"> /malam (Senin-Kamis)</span>
                    </div>
                  </div>
                  <div className="text-xs text-amber-900 mt-1 font-medium bg-amber-50 px-2 py-1 rounded-md inline-block">
                    Weekend (Jum - Sab): {formatRupiah(villa.pricePerNightWeekend)} /malam
                  </div>
                </div>

                {/* Date Selection inside details */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => onDateChange(e.target.value, checkOutDate)}
                        className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
                      />
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => onDateChange(checkInDate, e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Guests Selector */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Jumlah Tamu
                      </label>
                      <span className="text-sm font-bold text-stone-900">
                        {guestsCount} Orang (Maks {villa.maxGuests})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onGuestsChange(Math.max(2, guestsCount - 2))}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => onGuestsChange(Math.min(villa.maxGuests, guestsCount + 2))}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Customer Name & Notes for custom WhatsApp message */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                        Nama Pemesan (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Rendy / Keluarga Bpk. Agus"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs font-medium text-stone-900 focus:outline-none placeholder-stone-400"
                      />
                    </div>
                    <div className="pt-2 border-t border-stone-100">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                        Permintaan Khusus (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Butuh arang BBQ, early check-in, dsb."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full text-xs font-medium text-stone-900 focus:outline-none placeholder-stone-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Price Calculation Breakdown */}
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Durasi Menginap:</span>
                    <span className="font-semibold text-stone-800">{nights} Malam</span>
                  </div>
                  {isWeekendIncluded && (
                    <div className="flex justify-between text-amber-700 text-[11px]">
                      <span>Termasuk tarif weekend:</span>
                      <span>Tercakup otomatis</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Biaya Layanan & Admin:</span>
                    <span className="text-emerald-700 font-bold">GRATIS (Rp 0)</span>
                  </div>
                  <div className="flex justify-between text-stone-500 text-[11px]">
                    <span>Security Deposit (Refundable saat check-out):</span>
                    <span>{formatRupiah(villa.securityDeposit || 500000)}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                    <span className="font-bold text-stone-900 text-sm">Estimasi Total Sewa:</span>
                    <span className="font-bold text-stone-900 text-lg sm:text-xl font-display text-emerald-800">
                      {formatRupiah(total)}
                    </span>
                  </div>
                </div>

                {/* Primary WhatsApp Action Button */}
                <div className="space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/20 transition-all text-center"
                  >
                    <PhoneCall className="w-5 h-5 fill-current" />
                    <span>Lanjut Booking ke WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBookingDetails}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs border border-stone-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Format Pesan Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-stone-500" />
                        <span>Salin Format Pesan WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust reminders */}
                <div className="text-[11px] text-stone-500 space-y-1 text-center pt-2">
                  <p className="flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 inline" />
                    Pembayaran aman langsung ke rekening resmi pengelola
                  </p>
                  <p>Respon admin WhatsApp rata-rata &lt; 5 menit</p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
