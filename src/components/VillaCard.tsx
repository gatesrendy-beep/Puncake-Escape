import { useState, MouseEvent } from 'react';
import { 
  Heart, 
  Star, 
  MapPin, 
  Users, 
  BedDouble, 
  Bath, 
  Flame, 
  ChevronLeft, 
  ChevronRight,
  PhoneCall,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Villa } from '../types';
import { formatRupiah, calculateTotalEstimate } from '../utils/format';

interface VillaCardProps {
  key?: string;
  villa: Villa;
  isSaved: boolean;
  onToggleSave: (villaId: string) => void;
  onSelectVilla: (villa: Villa) => void;
  onQuickBookWhatsApp: (villa: Villa) => void;
  checkInDate: string;
  checkOutDate: string;
}

export function VillaCard({
  villa,
  isSaved,
  onToggleSave,
  onSelectVilla,
  onQuickBookWhatsApp,
  checkInDate,
  checkOutDate,
}: VillaCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasDatesSelected = Boolean(checkInDate && checkOutDate);
  const { total, nights } = calculateTotalEstimate(villa, checkInDate, checkOutDate);

  const nextImage = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % villa.images.length);
  };

  const prevImage = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length);
  };

  return (
    <article 
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-emerald-700/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => onSelectVilla(villa)}
    >
      {/* Image Container with slider */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <img
          src={villa.images[currentImageIndex]}
          alt={villa.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-900/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-stone-100 text-[11px] font-semibold flex items-center gap-1 border border-stone-700/50">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              100% Terverifikasi
            </span>
            {villa.amenities.hasHeatedPool && (
              <span className="px-2 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                <Flame className="w-3 h-3" />
                Kolam Hangat
              </span>
            )}
          </div>

          {/* Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(villa.id);
            }}
            className="p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-md transition-colors border border-white/20"
            aria-label={isSaved ? "Hapus dari favorit" : "Simpan ke favorit"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </button>
        </div>

        {/* Image navigation arrows */}
        {villa.images.length > 1 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-xs z-10 transition-colors"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-xs z-10 transition-colors"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Location & Image dots bar on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 text-stone-200 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{villa.location.area}, Cisarua 16750</span>
          </div>

          <div className="flex items-center gap-1">
            {villa.images.slice(0, 5).map((_, idx) => (
              <span 
                key={idx} 
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{villa.rating.toFixed(2)}</span>
              <span className="text-stone-400 font-normal">({villa.reviewCount} ulasan tamu)</span>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              {villa.location.distanceFromJakarta}
            </span>
          </div>

          {/* Villa Name */}
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display group-hover:text-emerald-800 transition-colors line-clamp-1">
            {villa.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
            {villa.tagline}
          </p>

          {/* "Why This Villa?" Positioning Statement */}
          <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-950 flex items-start gap-2">
            <span className="shrink-0 text-emerald-700 font-bold text-[11px] uppercase tracking-wider mt-0.5">
              Highlight:
            </span>
            <p className="text-[11px] sm:text-xs leading-relaxed font-medium">
              {villa.whyThisVilla}
            </p>
          </div>

          {/* Core Specs: Bedrooms, Bathrooms, Guests */}
          <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs text-stone-600">
            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-stone-50">
              <div className="flex items-center gap-1 font-bold text-stone-800">
                <BedDouble className="w-3.5 h-3.5 text-emerald-700" />
                <span>{villa.bedrooms} Kamar</span>
              </div>
              <span className="text-[10px] text-stone-400 mt-0.5">Tidur Privat</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-stone-50">
              <div className="flex items-center gap-1 font-bold text-stone-800">
                <Bath className="w-3.5 h-3.5 text-emerald-700" />
                <span>{villa.bathrooms} Toilet</span>
              </div>
              <span className="text-[10px] text-stone-400 mt-0.5">Water Heater</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-stone-50">
              <div className="flex items-center gap-1 font-bold text-stone-800">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                <span>s/d {villa.maxGuests}</span>
              </div>
              <span className="text-[10px] text-stone-400 mt-0.5">Kapasitas Tamu</span>
            </div>
          </div>

          {/* Features Pills */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {villa.features.slice(0, 3).map((feat, idx) => (
              <span 
                key={idx}
                className="text-[11px] px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md font-medium"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-stone-100 space-y-3">
          
          <div className="flex items-baseline justify-between">
            <div>
              {hasDatesSelected ? (
                <>
                  <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <span>Total Estimasi ({nights} Malam):</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-stone-900">
                    {formatRupiah(total)}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Rp 0 biaya platform • Deposit Rp 500k refundable
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[11px] text-stone-500 font-medium">
                    Mulai dari (Weekdays):
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-stone-900">
                    {formatRupiah(villa.pricePerNightWeekday)}
                    <span className="text-xs font-normal text-stone-500"> /malam</span>
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Weekend: {formatRupiah(villa.pricePerNightWeekend)} /malam
                  </div>
                </>
              )}
            </div>

            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              {villa.location.area}
            </span>
          </div>

          {/* Primary & Secondary CTA Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectVilla(villa);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Cek Detail</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickBookWhatsApp(villa);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 active:scale-[0.98] text-emerald-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-emerald-600/40 transition-all"
              title="Konsultasi langsung via WhatsApp dengan Concierge Puncak Escape"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </article>
  );
}
