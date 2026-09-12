import { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { FilterBar } from './components/FilterBar';
import { VillaCard } from './components/VillaCard';
import { VillaDetailModal } from './components/VillaDetailModal';
import { WhatsAppBookingDrawer } from './components/WhatsAppBookingDrawer';
import { SavedVillasDrawer } from './components/SavedVillasDrawer';
import { TrustSection } from './components/TrustSection';
import { PuncakGuide } from './components/PuncakGuide';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { VILLAS_DATA } from './data/villas';
import { Villa, FilterOptions } from './types';
import { PhoneCall, Sparkles, MapPin } from 'lucide-react';
import { generateGeneralWhatsAppInquiryUrl } from './utils/format';

function getInitialNextWeekendDates(): { checkIn: string; checkOut: string } {
  const today = new Date();
  const day = today.getDay(); // 0 is Sun, 5 is Fri, 6 is Sat
  const daysUntilFriday = (5 - day + 7) % 7 || 7; // Next Friday
  
  const friday = new Date(today);
  friday.setDate(today.getDate() + daysUntilFriday);

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);

  const format = (d: Date) => d.toISOString().split('T')[0];
  return {
    checkIn: format(friday),
    checkOut: format(sunday),
  };
}

export default function App() {
  const initialDates = useMemo(() => getInitialNextWeekendDates(), []);

  const [checkInDate, setCheckInDate] = useState<string>(initialDates.checkIn);
  const [checkOutDate, setCheckOutDate] = useState<string>(initialDates.checkOut);
  const [guestsCount, setGuestsCount] = useState<number>(12);

  // Filters
  const [filters, setFilters] = useState<FilterOptions>({
    area: '',
    minPrice: 0,
    maxPrice: 15000000,
    minBedrooms: 0,
    minGuests: 0,
    onlyHeatedPool: false,
    onlyMountainView: false,
    hasBilliard: false,
    hasKaraoke: false,
    searchQuery: '',
    sortBy: 'recommended',
  });

  // Saved / Favorite villas
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('puncak_escape_saved_villas');
      return saved ? JSON.parse(saved) : ['villa-casablanca-tugu'];
    } catch {
      return ['villa-casablanca-tugu'];
    }
  });

  // Modals state
  const [selectedVillaForDetail, setSelectedVillaForDetail] = useState<Villa | null>(null);
  const [selectedVillaForWhatsApp, setSelectedVillaForWhatsApp] = useState<Villa | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('puncak_escape_saved_villas', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  const toggleSaveVilla = (id: string) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      area: '',
      minPrice: 0,
      maxPrice: 15000000,
      minBedrooms: 0,
      minGuests: 0,
      onlyHeatedPool: false,
      onlyMountainView: false,
      hasBilliard: false,
      hasKaraoke: false,
      searchQuery: '',
      sortBy: 'recommended',
    });
  };

  const handleDateChange = (inDate: string, outDate: string) => {
    setCheckInDate(inDate);
    setCheckOutDate(outDate);
  };

  // Filtered & Sorted Villas
  const filteredVillas = useMemo(() => {
    let result = VILLAS_DATA.filter((villa) => {
      // Area match
      if (filters.area && villa.location.area !== filters.area) {
        return false;
      }
      // Capacity match
      if (filters.minGuests > 0 && villa.maxGuests < filters.minGuests) {
        return false;
      }
      // Heated Pool match
      if (filters.onlyHeatedPool && !villa.amenities.hasHeatedPool) {
        return false;
      }
      // Mountain view match
      if (filters.onlyMountainView && !villa.amenities.hasMountainView) {
        return false;
      }
      // Billiard match
      if (filters.hasBilliard && !villa.amenities.hasBilliard) {
        return false;
      }
      // Karaoke match
      if (filters.hasKaraoke && !villa.amenities.hasKaraoke) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = villa.name.toLowerCase().includes(query);
        const matchesArea = villa.location.area.toLowerCase().includes(query);
        const matchesTagline = villa.tagline.toLowerCase().includes(query);
        const matchesFeatures = villa.features.some(f => f.toLowerCase().includes(query));
        const matchesDesc = villa.description.toLowerCase().includes(query);
        if (!matchesName && !matchesArea && !matchesTagline && !matchesFeatures && !matchesDesc) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.pricePerNightWeekday - b.pricePerNightWeekday);
        break;
      case 'price-desc':
        result.sort((a, b) => b.pricePerNightWeekday - a.pricePerNightWeekday);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'capacity':
        result.sort((a, b) => b.maxGuests - a.maxGuests);
        break;
      case 'recommended':
      default:
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [filters]);

  const savedVillasList = useMemo(() => {
    return VILLAS_DATA.filter((villa) => savedIds.includes(villa.id));
  }, [savedIds]);

  const scrollToVillas = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGuide = () => {
    const el = document.getElementById('puncak-guide-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSearch = () => {
    const el = document.getElementById('hero-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      
      {/* Top Navigation */}
      <Navbar
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onScrollToVillas={scrollToVillas}
        onScrollToGuide={scrollToGuide}
        onScrollToSearch={scrollToSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero with Search & Date Check */}
        <HeroSearch
          filters={filters}
          onFilterChange={handleFilterChange}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guestsCount={guestsCount}
          onDateChange={handleDateChange}
          onGuestsChange={setGuestsCount}
          onSearchSubmit={scrollToVillas}
        />

        {/* Filter Bar (Sticky) */}
        <div id="catalog-section">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalVillasCount={VILLAS_DATA.length}
            filteredCount={filteredVillas.length}
          />
        </div>

        {/* Villa Catalog Listing */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Koleksi Villa Eksklusif
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                Pilihan Villa di Tugu Selatan & Cisarua
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                Seluruh villa dapat disewa secara privat (entire house) dengan kolam renang pribadi dan panorama pegunungan asri.
              </p>
            </div>

            {/* Quick stats / live helper */}
            <div className="text-xs text-stone-500 bg-white border border-stone-200 px-3 py-2 rounded-xl shrink-0">
              <span className="font-semibold text-stone-800">Cisarua & Tugu Selatan 16750</span>
              <span className="block text-[11px] text-emerald-700 font-medium">✓ Konfirmasi cepat via WhatsApp</span>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredVillas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredVillas.map((villa) => (
                <VillaCard
                  key={villa.id}
                  villa={villa}
                  isSaved={savedIds.includes(villa.id)}
                  onToggleSave={toggleSaveVilla}
                  onSelectVilla={(v) => setSelectedVillaForDetail(v)}
                  onQuickBookWhatsApp={(v) => setSelectedVillaForWhatsApp(v)}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200/80 max-w-lg mx-auto space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900">
                Tidak Menemukan Villa yang Sesuai Filter
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Coba sesuaikan kriteria pencarian, reset filter fasilitas, atau hubungi langsung admin WhatsApp kami untuk dicarikan villa yang tersedia sesuai tanggal Anda.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors"
                >
                  Reset Semua Filter
                </button>
                <a
                  href={generateGeneralWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Konsultasi via WA</span>
                </a>
              </div>
            </div>
          )}

        </section>

        {/* Trust & Service Quality Section */}
        <TrustSection />

        {/* Local Puncak Guide, Traffic, Testimonials & FAQs */}
        <PuncakGuide />

      </main>

      {/* Footer */}
      <Footer
        onSelectArea={(area) => handleFilterChange({ area })}
        onFilterHeated={() => handleFilterChange({ onlyHeatedPool: true })}
        onFilterFamily={() => handleFilterChange({ minGuests: 20 })}
      />

      {/* Mobile Sticky Bar for instantaneous conversion */}
      <MobileStickyBar
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onScrollToSearch={scrollToSearch}
      />

      {/* Floating WhatsApp Concierge Button for Desktop */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href={generateGeneralWhatsAppInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95 border border-emerald-500/30"
          title="Chat Admin WhatsApp"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[11px] text-emerald-200 font-medium leading-none">Ada Pertanyaan?</span>
            <span className="text-xs font-bold leading-tight">Chat Admin WhatsApp</span>
          </div>
        </a>
      </div>

      {/* Villa Full Detail Modal */}
      {selectedVillaForDetail && (
        <VillaDetailModal
          villa={selectedVillaForDetail}
          onClose={() => setSelectedVillaForDetail(null)}
          isSaved={savedIds.includes(selectedVillaForDetail.id)}
          onToggleSave={toggleSaveVilla}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guestsCount={guestsCount}
          onDateChange={handleDateChange}
          onGuestsChange={setGuestsCount}
        />
      )}

      {/* WhatsApp Quick Booking Drawer/Modal */}
      {selectedVillaForWhatsApp && (
        <WhatsAppBookingDrawer
          villa={selectedVillaForWhatsApp}
          onClose={() => setSelectedVillaForWhatsApp(null)}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guestsCount={guestsCount}
          onDateChange={handleDateChange}
          onGuestsChange={setGuestsCount}
        />
      )}

      {/* Saved / Shortlist Drawer */}
      <SavedVillasDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedVillas={savedVillasList}
        onRemoveSaved={toggleSaveVilla}
        onSelectVilla={(v) => setSelectedVillaForDetail(v)}
        onClearAll={() => setSavedIds([])}
      />

    </div>
  );
}
