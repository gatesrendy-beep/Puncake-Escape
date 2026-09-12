import { PhoneCall, Calendar, Heart } from 'lucide-react';
import { generateGeneralWhatsAppInquiryUrl } from '../utils/format';

interface MobileStickyBarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onScrollToSearch: () => void;
}

export function MobileStickyBar({
  savedCount,
  onOpenSaved,
  onScrollToSearch,
}: MobileStickyBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
      
      {/* Cek Tanggal button */}
      <button
        onClick={onScrollToSearch}
        className="flex-1 py-2 px-3 rounded-xl bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-700/60 transition-colors"
      >
        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
        <span>Cari Tanggal</span>
      </button>

      {/* Saved / Favorit button */}
      <button
        onClick={onOpenSaved}
        className="relative py-2 px-3 rounded-xl bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-700/60 transition-colors"
        aria-label="Villa Favorit"
      >
        <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-300'}`} />
        <span>Favorit</span>
        {savedCount > 0 && (
          <span className="bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {savedCount}
          </span>
        )}
      </button>

      {/* Direct WhatsApp Concierge button */}
      <a
        href={generateGeneralWhatsAppInquiryUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
      >
        <PhoneCall className="w-3.5 h-3.5 fill-current" />
        <span>Chat Admin</span>
      </a>

    </div>
  );
}
