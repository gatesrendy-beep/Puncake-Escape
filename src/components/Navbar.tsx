import { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Heart, 
  Menu, 
  X, 
  Compass, 
  MapPin,
  Calendar
} from 'lucide-react';
import { WHATSAPP_DISPLAY } from '../data/villas';
import { generateGeneralWhatsAppInquiryUrl } from '../utils/format';
import { BrandLogo } from './BrandLogo';
import { SocialButtons } from './SocialButtons';

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onScrollToVillas: () => void;
  onScrollToGuide: () => void;
  onScrollToSearch: () => void;
}

export function Navbar({
  savedCount,
  onOpenSaved,
  onScrollToVillas,
  onScrollToGuide,
  onScrollToSearch
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-stone-900/90 backdrop-blur-md shadow-md py-2.5 text-stone-100 border-b border-stone-800' 
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent py-3.5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Main Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group transition-transform hover:opacity-95"
            title="Puncak Escape - Your Escape in Puncak"
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button 
              onClick={onScrollToVillas}
              className="text-stone-200 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              Katalog Villa
            </button>
            <button 
              onClick={onScrollToSearch}
              className="text-stone-200 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              Cek Tanggal
            </button>
            <button 
              onClick={onScrollToGuide}
              className="text-stone-200 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              Info Jalur & Tips Puncak
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Social Media buttons for desktop */}
            <div className="hidden xl:flex items-center">
              <SocialButtons variant="compact" />
            </div>

            {/* Shortlisted / Saved Favorites */}
            <button
              onClick={onOpenSaved}
              className="relative p-2.5 rounded-xl bg-stone-800/70 hover:bg-stone-800 text-stone-200 border border-stone-700/60 transition-colors"
              title="Villa Favorit Tersimpan"
              aria-label="Villa Favorit"
            >
              <Heart className={`w-4.5 h-4.5 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-300'}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Concierge CTA */}
            <a
              href={generateGeneralWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>WA {WHATSAPP_DISPLAY}</span>
            </a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-800/70 text-stone-200 border border-stone-700/60"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-stone-800 bg-stone-900/95 rounded-2xl px-4 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Navigasi Cepat
              </span>
              <span className="text-[11px] text-amber-400 font-medium">
                @puncakescapeid
              </span>
            </div>
            <button
              onClick={() => {
                onScrollToVillas();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-stone-200 hover:text-emerald-400 font-medium flex items-center gap-2.5 text-sm"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              Jelajahi Villa (Tugu Selatan & Cisarua)
            </button>
            <button
              onClick={() => {
                onScrollToSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-stone-200 hover:text-emerald-400 font-medium flex items-center gap-2.5 text-sm"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              Cari Berdasarkan Tanggal
            </button>
            <button
              onClick={() => {
                onScrollToGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-stone-200 hover:text-emerald-400 font-medium flex items-center gap-2.5 text-sm"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              Jadwal One-Way & Tips Macet Puncak
            </button>

            {/* Social Media in Mobile Menu */}
            <div className="pt-2 pb-1 border-t border-stone-800/80">
              <div className="text-[11px] text-stone-400 mb-2">Media Sosial Resmi (@puncakescapeid):</div>
              <SocialButtons variant="compact" />
            </div>

            <div className="pt-2 border-t border-stone-800">
              <a
                href={generateGeneralWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
              >
                <PhoneCall className="w-4 h-4 fill-current" />
                Chat WhatsApp ({WHATSAPP_DISPLAY})
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}

