import { 
  X, 
  Heart, 
  Trash2, 
  PhoneCall, 
  MapPin, 
  Star, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Villa } from '../types';
import { formatRupiah, WHATSAPP_NUMBER } from '../utils/format';

interface SavedVillasDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedVillas: Villa[];
  onRemoveSaved: (id: string) => void;
  onSelectVilla: (villa: Villa) => void;
  onClearAll: () => void;
}

export function SavedVillasDrawer({
  isOpen,
  onClose,
  savedVillas,
  onRemoveSaved,
  onSelectVilla,
  onClearAll,
}: SavedVillasDrawerProps) {
  if (!isOpen) return null;

  const handleInquireShortlist = () => {
    const villaNames = savedVillas.map(v => `• ${v.name} (${v.location.area})`).join('\n');
    const text = `Halo Puncak Escape! 🌿 Saya sedang tertarik dan membandingkan beberapa villa favorit ini:\n\n${villaNames}\n\nBoleh bantu rekomendasikan mana yang paling cocok untuk rombongan kami? Terima kasih!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h3 className="font-bold text-stone-900 text-base font-display">
              Villa Favorit Anda ({savedVillas.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:bg-stone-200 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedVillas.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Heart className="w-6 h-6" />
              </div>
              <p className="font-semibold text-stone-700 text-sm">Belum Ada Villa Disimpan</p>
              <p className="text-xs text-stone-500 max-w-xs">
                Klik ikon hati pada kartu villa untuk menyimpan villa favorit Anda dan membandingkannya di sini.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                <span>Daftar Villa Tersimpan:</span>
                <button
                  onClick={onClearAll}
                  className="text-stone-400 hover:text-rose-600 transition-colors"
                >
                  Hapus Semua
                </button>
              </div>

              {savedVillas.map((villa) => (
                <div 
                  key={villa.id} 
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex gap-3 group relative hover:border-emerald-700/50 transition-all cursor-pointer"
                  onClick={() => {
                    onSelectVilla(villa);
                    onClose();
                  }}
                >
                  <img
                    src={villa.images[0]}
                    alt={villa.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{villa.rating}</span>
                      <span className="text-stone-400">• {villa.location.area}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate mt-0.5 group-hover:text-emerald-800 transition-colors">
                      {villa.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {villa.bedrooms} Kamar • Maks {villa.maxGuests} Tamu
                    </p>
                    <p className="text-xs font-bold text-stone-900 mt-1">
                      {formatRupiah(villa.pricePerNightWeekday)}
                      <span className="text-[10px] font-normal text-stone-500"> /malam</span>
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSaved(villa.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Hapus dari favorit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {savedVillas.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2">
            <button
              onClick={handleInquireShortlist}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>Tanya Semua Villa ke WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-stone-400">
              Kirim daftar perbandingan langsung ke concierge Puncak Escape
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
