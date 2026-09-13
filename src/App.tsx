import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { IntentSelector } from './components/IntentSelector';
import { FilterBar } from './components/FilterBar';
import { VillaCard } from './components/VillaCard';
import { VillaDetailModal } from './components/VillaDetailModal';
import { WhatsAppBookingDrawer } from './components/WhatsAppBookingDrawer';
import { SavedVillasDrawer } from './components/SavedVillasDrawer';
import { TrustSection } from './components/TrustSection';
import { PuncakGuide } from './components/PuncakGuide';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { NewVillasSection } from './components/NewVillasSection';

// Admin Portal Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { GoogleMapsImportStep } from './components/admin/GoogleMapsImportStep';
import { VillaEditorModal } from './components/admin/VillaEditorModal';
import { PublishSuccessModal } from './components/admin/PublishSuccessModal';

import { VILLAS_DATA, WHATSAPP_DISPLAY } from './data/villas';
import { Villa, FilterOptions, GooglePlaceImportResult } from './types';
import { PhoneCall, Sparkles, MapPin } from 'lucide-react';
import { generateGeneralWhatsAppInquiryUrl } from './utils/format';
import { fetchAllCustomVillas, saveVillaApi } from './services/api';
import { getStoredAdminAuth, setStoredAdminAuth } from './services/storage';

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

  // All catalog villas (combining built-in seed villas with user-created / published ones)
  const [allVillas, setAllVillas] = useState<Villa[]>(() => {
    return VILLAS_DATA.map((v) => ({
      ...v,
      status: v.status || 'published',
      verificationStage: v.verificationStage || 'verified',
    }));
  });

  // Admin routing & auth states
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(getStoredAdminAuth);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  // Admin sub-modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingVilla, setEditingVilla] = useState<Partial<Villa> | null>(null);
  const [importedPlaceData, setImportedPlaceData] = useState<GooglePlaceImportResult | undefined>(undefined);
  const [recentlyPublishedVilla, setRecentlyPublishedVilla] = useState<Villa | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterOptions>({
    intent: 'all',
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

  // Fetch custom and server villas on mount and merge
  useEffect(() => {
    fetchAllCustomVillas().then((customVillas) => {
      if (!customVillas || customVillas.length === 0) return;

      setAllVillas((prev) => {
        const merged = [...prev];
        customVillas.forEach((cv) => {
          const index = merged.findIndex((v) => v.id === cv.id || (cv.googlePlaceId && v.googlePlaceId === cv.googlePlaceId));
          if (index >= 0) {
            merged[index] = { ...merged[index], ...cv };
          } else {
            merged.unshift(cv);
          }
        });
        return merged;
      });
    });
  }, []);

  // Check URL routes for /admin or #admin, and /villa/:slug
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (pathname === '/admin' || hash === '#admin') {
        setIsAdminView(true);
        if (!getStoredAdminAuth()) {
          setShowAdminLoginModal(true);
        }
      }

      // Check /villa/[slug] or #villa/[slug]
      const villaSlugMatch = pathname.match(/\/villa\/([^/]+)/) || hash.match(/#villa\/([^/]+)/);
      if (villaSlugMatch && villaSlugMatch[1]) {
        const slug = villaSlugMatch[1];
        const matched = allVillas.find((v) => v.slug === slug || v.id === slug);
        if (matched) {
          setSelectedVillaForDetail(matched);
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [allVillas]);

  // Update SEO Title and Meta Description dynamically
  useEffect(() => {
    if (selectedVillaForDetail) {
      document.title = selectedVillaForDetail.seoTitle || `${selectedVillaForDetail.name} | Puncake Escape Puncak`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          selectedVillaForDetail.seoDescription || selectedVillaForDetail.tagline || 'Sewa villa privat di Puncak.'
        );
      }
    } else if (isAdminView) {
      document.title = 'Admin Portal | Puncake Escape';
    } else {
      document.title = 'Puncake Escape | Sewa Villa Privat Puncak & Cisarua Terverifikasi';
    }
  }, [selectedVillaForDetail, isAdminView]);

  // Save favorites to localStorage
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
      intent: 'all',
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

  // Only show PUBLISHED villas to public travelers
  const publicVillas = useMemo(() => {
    return allVillas.filter((v) => (v.status ? v.status === 'published' : true));
  }, [allVillas]);

  // Filtered & Sorted Villas for Catalog
  const filteredVillas = useMemo(() => {
    let result = publicVillas.filter((villa) => {
      // Intent Category match
      if (filters.intent && filters.intent !== 'all') {
        if (!villa.intentCategory || !villa.intentCategory.includes(filters.intent as any)) {
          return false;
        }
      }
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
        const matchesFeatures = villa.features.some((f) => f.toLowerCase().includes(query));
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
  }, [publicVillas, filters]);

  const savedVillasList = useMemo(() => {
    return allVillas.filter((villa) => savedIds.includes(villa.id));
  }, [allVillas, savedIds]);

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

  // Admin Actions
  const handleOpenAdminPortal = () => {
    setIsAdminView(true);
    window.history.pushState(null, '', '#admin');
    if (!getStoredAdminAuth()) {
      setShowAdminLoginModal(true);
    }
  };

  const handleExitAdminPortal = () => {
    setIsAdminView(false);
    window.history.pushState(null, '', window.location.pathname === '/admin' ? '/' : window.location.pathname);
  };

  const handleAdminLogout = () => {
    setStoredAdminAuth(false);
    setIsAdminAuthenticated(false);
    setIsAdminView(false);
    window.history.pushState(null, '', '/');
  };

  // Save Draft Handler
  const handleSaveDraft = useCallback(async (villa: Villa) => {
    await saveVillaApi(villa);
    setAllVillas((prev) => {
      const idx = prev.findIndex((v) => v.id === villa.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = villa;
        return copy;
      }
      return [villa, ...prev];
    });
    setEditingVilla(null);
    setIsImportModalOpen(false);
  }, []);

  // Publish Handler
  const handlePublish = useCallback(async (villa: Villa) => {
    await saveVillaApi(villa);
    setAllVillas((prev) => {
      const idx = prev.findIndex((v) => v.id === villa.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = villa;
        return copy;
      }
      return [villa, ...prev];
    });
    setEditingVilla(null);
    setIsImportModalOpen(false);
    setRecentlyPublishedVilla(villa);
  }, []);

  // Unpublish Handler
  const handleUnpublish = useCallback(async (villa: Villa) => {
    const updated: Villa = { ...villa, status: 'draft', updatedAt: new Date().toISOString() };
    await saveVillaApi(updated);
    setAllVillas((prev) => prev.map((v) => (v.id === villa.id ? updated : v)));
  }, []);

  // Archive Handler
  const handleArchive = useCallback(async (villa: Villa) => {
    const updated: Villa = { ...villa, status: 'archived', updatedAt: new Date().toISOString() };
    await saveVillaApi(updated);
    setAllVillas((prev) => prev.map((v) => (v.id === villa.id ? updated : v)));
  }, []);

  // ============================================
  // RENDER ADMIN VIEW
  // ============================================
  if (isAdminView && isAdminAuthenticated) {
    return (
      <>
        <AdminDashboard
          villas={allVillas}
          onAddNewVilla={() => {
            setImportedPlaceData(undefined);
            setIsImportModalOpen(true);
          }}
          onEditVilla={(villa) => {
            setEditingVilla(villa);
          }}
          onPreviewVilla={(villa) => {
            setSelectedVillaForDetail(villa);
          }}
          onPublishVilla={handlePublish}
          onUnpublishVilla={handleUnpublish}
          onArchiveVilla={handleArchive}
          onExitAdmin={handleExitAdminPortal}
          onLogout={handleAdminLogout}
        />

        {/* Step 1: Google Maps URL Import Modal */}
        {isImportModalOpen && (
          <GoogleMapsImportStep
            existingVillas={allVillas}
            onImportSuccess={(placeData) => {
              setIsImportModalOpen(false);
              setImportedPlaceData(placeData);
              setEditingVilla({
                name: placeData.name,
                location: {
                  area: placeData.area as any,
                  district: placeData.district,
                  city: placeData.city,
                  postalCode: placeData.postalCode,
                  address: placeData.formattedAddress,
                  distanceFromJakarta: '90-120 menit via Tol Jagorawi',
                },
                rating: placeData.rating,
                reviewCount: placeData.userRatingCount,
                googlePlaceId: placeData.placeId,
                sourcePlaceId: placeData.placeId,
                googleMapsUrl: placeData.googleMapsUri,
                coordinates: { lat: placeData.latitude, lng: placeData.longitude },
              });
            }}
            onOpenExisting={(existing) => {
              setIsImportModalOpen(false);
              setEditingVilla(existing);
            }}
            onCancel={() => setIsImportModalOpen(false)}
          />
        )}

        {/* Step 2: Villa Review & Editor Modal */}
        {editingVilla && (
          <VillaEditorModal
            initialVilla={editingVilla}
            placeData={importedPlaceData}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
            onClose={() => {
              setEditingVilla(null);
              setImportedPlaceData(undefined);
            }}
          />
        )}

        {/* Step 3: Publish Success Celebration Modal */}
        {recentlyPublishedVilla && (
          <PublishSuccessModal
            villa={recentlyPublishedVilla}
            onViewVilla={(v) => {
              setRecentlyPublishedVilla(null);
              setIsAdminView(false);
              setSelectedVillaForDetail(v);
            }}
            onBackToDashboard={() => {
              setRecentlyPublishedVilla(null);
            }}
          />
        )}

        {/* Detail preview inside admin */}
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
      </>
    );
  }

  // ============================================
  // RENDER PUBLIC TRAVELER EXPERIENCE
  // ============================================
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

        {/* Discovery by Intent Selector */}
        <div id="villa-list">
          <IntentSelector
            activeIntent={filters.intent || 'all'}
            onSelectIntent={(intent) => {
              handleFilterChange({ intent });
              scrollToVillas();
            }}
          />
        </div>

        {/* ✨ NEW VILLAS Section (Pristine, 14-day auto-badge, sorted by publishedAt DESC) */}
        <NewVillasSection
          allVillas={publicVillas}
          savedVillaIds={savedIds}
          onToggleSave={toggleSaveVilla}
          onSelectVilla={(v) => setSelectedVillaForDetail(v)}
          onQuickBookWhatsApp={(v) => setSelectedVillaForWhatsApp(v)}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onViewAllCatalog={scrollToVillas}
        />

        {/* Filter Bar (Sticky) */}
        <div id="catalog-section">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalVillasCount={publicVillas.length}
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
                  type="button"
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

      {/* Footer with subtle host/admin access */}
      <Footer
        onSelectArea={(area) => handleFilterChange({ area })}
        onFilterHeated={() => handleFilterChange({ onlyHeatedPool: true })}
        onFilterFamily={() => handleFilterChange({ minGuests: 20 })}
        onOpenAdmin={handleOpenAdminPortal}
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
            <span className="block text-[10px] text-emerald-200 font-medium leading-none">Ada Pertanyaan?</span>
            <span className="text-xs font-bold leading-tight">Chat WA: {WHATSAPP_DISPLAY}</span>
          </div>
        </a>
      </div>

      {/* Villa Full Detail Modal */}
      {selectedVillaForDetail && (
        <VillaDetailModal
          villa={selectedVillaForDetail}
          onClose={() => {
            setSelectedVillaForDetail(null);
            if (window.location.hash.startsWith('#villa/')) {
              window.history.pushState(null, '', window.location.pathname);
            }
          }}
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

      {/* Admin Login Modal (When visiting /admin or clicking admin while not authenticated) */}
      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setShowAdminLoginModal(false);
          setIsAdminView(true);
        }}
        onClose={() => {
          setShowAdminLoginModal(false);
          if (!isAdminAuthenticated) {
            setIsAdminView(false);
            window.history.pushState(null, '', '/');
          }
        }}
      />

    </div>
  );
}
