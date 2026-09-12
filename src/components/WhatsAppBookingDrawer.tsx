import { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Copy, 
  Check, 
  Calendar, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  MessageSquare
} from 'lucide-react';
import { Villa } from '../types';
import { 
  formatRupiah, 
  calculateNights, 
  calculateTotalEstimate, 
  generateWhatsAppBookingUrl,
  formatDateIndo,
  WHATSAPP_DISPLAY
} from '../utils/format';

interface WhatsAppBookingDrawerProps {
  villa: Villa | null;
  onClose: () => void;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  onDateChange: (checkIn: string, checkOut: string) => void;
  onGuestsChange: (count: number) => void;
}

export function WhatsAppBookingDrawer({
  villa,
  onClose,
  checkInDate,
  checkOutDate,
  guestsCount,
  onDateChange,
  onGuestsChange,
}: WhatsAppBookingDrawerProps) {
  const [guestName, setGuestName] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!villa) return null;

  const nights = calculateNights(checkInDate, checkOutDate);
  const { total } = calculateTotalEstimate(villa, checkInDate, checkOutDate);

  const whatsappUrl = generateWhatsAppBookingUrl({
    villa,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: guestsCount,
    name: guestName,
    specialNotes: specialNotes,
  });

  const messagePreview = `Halo Puncak Escape! 🌿 Saya ingin booking:
🏡 Villa: ${villa.name} (${villa.location.area}, 16750)
📅 Check-In: ${checkInDate ? formatDateIndo(checkInDate) : 'Tanggal segera konfirmasi'}
📅 Check-Out: ${checkOutDate ? formatDateIndo(checkOutDate) : 'Tanggal segera konfirmasi'} (${nights} Malam)
👥 Tamu: ${guestsCount} Orang
💰 Estimasi: ${formatRupiah(total)}
${guestName ? `👤 Pemesan: ${guestName}\n` : ''}${specialNotes ? `📝 Catatan: ${specialNotes}\n` : ''}Apakah tanggal ini masih tersedia? Terima kasih! 🙏`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messagePreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <PhoneCall className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                Konfirmasi Reservasi WhatsApp
              </h3>
              <p className="text-xs text-emerald-200">
                Puncak Escape Concierge ({WHATSAPP_DISPLAY})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Villa mini preview */}
          <div className="flex gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
            <img 
              src={villa.images[0]} 
              alt={villa.name} 
              className="w-20 h-20 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {villa.location.area}
              </span>
              <h4 className="font-bold text-stone-900 text-sm truncate mt-1">
                {villa.name}
              </h4>
              <p className="text-xs text-stone-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                <span>Cisarua, Tugu Selatan 16750</span>
              </p>
              <p className="text-xs font-bold text-emerald-800 mt-1">
                {formatRupiah(total)} <span className="font-normal text-stone-500">({nights} malam)</span>
              </p>
            </div>
          </div>

          {/* Quick Date and Guests adjust */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                <label className="block text-[10px] font-bold text-stone-500 uppercase">
                  Check-In
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => onDateChange(e.target.value, checkOutDate)}
                  className="w-full text-xs font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer"
                />
              </div>
              <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                <label className="block text-[10px] font-bold text-stone-500 uppercase">
                  Check-Out
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => onDateChange(checkInDate, e.target.value)}
                  className="w-full text-xs font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase">
                  Kapasitas Tamu
                </label>
                <span className="text-xs font-bold text-stone-800">
                  {guestsCount} Orang
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onGuestsChange(Math.max(2, guestsCount - 2))}
                  className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 font-bold text-xs"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => onGuestsChange(Math.min(villa.maxGuests, guestsCount + 2))}
                  className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Optional Personalization */}
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="Nama Anda (cth: Mas Danang)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
              <input
                type="text"
                placeholder="Catatan khusus (opsional)"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
            </div>
          </div>

          {/* WhatsApp Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                Draf Pesan Otomatis WhatsApp:
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Tersalin' : 'Salin Pesan'}
              </button>
            </div>
            <div className="bg-stone-100 p-3 rounded-xl text-stone-800 text-[11px] font-mono whitespace-pre-line border border-stone-200 leading-relaxed">
              {messagePreview}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 text-center transition-all"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>Kirim Booking ke WhatsApp</span>
            </a>
            <p className="text-[11px] text-center text-stone-400">
              Akan membuka aplikasi WhatsApp resmi untuk chat langsung dengan tim reservasi Puncak Escape.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
