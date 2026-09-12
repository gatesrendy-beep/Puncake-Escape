import { useState, FormEvent } from 'react';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Search, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { FilterOptions } from '../types';

interface HeroSearchProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  onDateChange: (checkIn: string, checkOut: string) => void;
  onGuestsChange: (count: number) => void;
  onSearchSubmit: () => void;
}

export function HeroSearch({
  filters,
  onFilterChange,
  checkInDate,
  checkOutDate,
  guestsCount,
  onDateChange,
  onGuestsChange,
  onSearchSubmit,
}: HeroSearchProps) {
  const [selectedArea, setSelectedArea] = useState<string>(filters.area || '');

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    onFilterChange({ area });
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onFilterChange({ area: selectedArea });
    onSearchSubmit();
  };

  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-stone-950 text-white">
      {/* Ambient background with high quality image overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80" 
          alt="Puncak Escape Mountain Villa" 
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Badge & Tagline */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Puncak Escape • Your Escape in Puncak</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-50 font-display leading-[1.15]">
            Discover Premium Private Villas in <span className="text-emerald-400 italic">Puncak & Cisarua</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto">
            Rasakan liburan sejuk eksklusif di Tugu Selatan & Cisarua. Villa privat dengan kolam air hangat, panorama kebun teh, dan reservasi instan via WhatsApp tanpa biaya terselubung.
          </p>
        </div>

        {/* Search & Date Check Card */}
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl border border-stone-200/40 text-stone-900 transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Location selector */}
              <div className="md:col-span-4 bg-stone-50 hover:bg-stone-100/80 p-3 sm:p-3.5 rounded-xl border border-stone-200/80 transition-colors">
                <label className="block text-[11px] font-bold tracking-wider uppercase text-stone-500 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  Lokasi / Area
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => handleAreaSelect(e.target.value)}
                  className="w-full bg-transparent font-semibold text-stone-800 focus:outline-none text-sm cursor-pointer"
                >
                  <option value="">Semua Wilayah Puncak</option>
                  <option value="Tugu Selatan">Tugu Selatan (Kebun Teh & Dingin)</option>
                  <option value="Cisarua">Cisarua (Dekat Safari & Akses Tol)</option>
                  <option value="Puncak Pass">Puncak Pass & Sekitarnya</option>
                </select>
              </div>

              {/* Check-in & Check-out Dates */}
              <div className="md:col-span-5 grid grid-cols-2 gap-2 bg-stone-50 p-2.5 sm:p-3 rounded-xl border border-stone-200/80">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-stone-500 mb-0.5 flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3 text-emerald-700" />
                    Check-In
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => onDateChange(e.target.value, checkOutDate)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
                  />
                </div>
                <div className="border-l border-stone-200 pl-2">
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-stone-500 mb-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-700" />
                    Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => onDateChange(checkInDate, e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Guests Count */}
              <div className="md:col-span-3 bg-stone-50 p-3 sm:p-3.5 rounded-xl border border-stone-200/80">
                <label className="block text-[11px] font-bold tracking-wider uppercase text-stone-500 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  Kapasitas Tamu
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-stone-800">
                    {guestsCount} Orang
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onGuestsChange(Math.max(2, guestsCount - 2))}
                      className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center text-sm font-bold transition-colors"
                      aria-label="Kurang tamu"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => onGuestsChange(Math.min(45, guestsCount + 2))}
                      className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center text-sm font-bold transition-colors"
                      aria-label="Tambah tamu"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Submit search button & Quick filters */}
            <div className="mt-4 pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                <span className="font-semibold text-stone-700">Pilihan Populer:</span>
                <button
                  type="button"
                  onClick={() => onFilterChange({ onlyHeatedPool: !filters.onlyHeatedPool })}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
                    filters.onlyHeatedPool 
                      ? 'bg-amber-100 text-amber-900 border-amber-300' 
                      : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <Flame className="w-3 h-3 text-amber-600" />
                  Kolam Air Hangat
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange({ onlyMountainView: !filters.onlyMountainView })}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
                    filters.onlyMountainView 
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                      : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  View Gunung & Kebun Teh
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm shadow-md shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>Cari Villa Tersedia</span>
              </button>

            </div>
          </form>
        </div>

        {/* Value Props & Trust Badges under Hero */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-stone-300 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-stone-100">100% Terverifikasi</p>
              <p className="text-[11px] text-stone-400">Inspeksi langsung berkala</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <Flame className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-stone-100">Kolam Air Hangat</p>
              <p className="text-[11px] text-stone-400">Pilihan pool hangat nyaman</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-stone-100">Tanpa Biaya Admin</p>
              <p className="text-[11px] text-stone-400">Harga langsung transparan</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-stone-100">Cisarua & Tugu Selatan</p>
              <p className="text-[11px] text-stone-400">Lokasi strategis Puncak</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
