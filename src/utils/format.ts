import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, WHATSAPP_DISPLAY_INTL, SOCIAL_HANDLE, SOCIAL_LINKS } from '../data/villas';
import { Villa } from '../types';

export { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, WHATSAPP_DISPLAY_INTL, SOCIAL_HANDLE, SOCIAL_LINKS };

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function formatDateIndo(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function isWeekend(dateStr: string): boolean {
  if (!dateStr) return false;
  const day = new Date(dateStr).getDay();
  // Friday (5) and Saturday (6) nights are typically weekend rates
  return day === 5 || day === 6;
}

export function calculateTotalEstimate(
  villa: Villa,
  checkIn: string,
  checkOut: string
): { total: number; nights: number; isWeekendIncluded: boolean } {
  if (!checkIn || !checkOut) {
    return { total: villa.pricePerNightWeekday, nights: 1, isWeekendIncluded: false };
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  let total = 0;
  let hasWeekend = false;
  const current = new Date(start);

  for (let i = 0; i < nights; i++) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) { // Fri or Sat night
      total += villa.pricePerNightWeekend;
      hasWeekend = true;
    } else {
      total += villa.pricePerNightWeekday;
    }
    current.setDate(current.getDate() + 1);
  }

  return { total, nights, isWeekendIncluded: hasWeekend };
}

export function generateWhatsAppBookingUrl({
  villa,
  checkIn,
  checkOut,
  guests,
  name,
  specialNotes,
}: {
  villa: Villa;
  checkIn: string;
  checkOut: string;
  guests: number;
  name?: string;
  specialNotes?: string;
}): string {
  const nights = calculateNights(checkIn, checkOut);
  const { total } = calculateTotalEstimate(villa, checkIn, checkOut);

  const checkInFormatted = checkIn ? formatDateIndo(checkIn) : 'Segera konfirmasi';
  const checkOutFormatted = checkOut ? formatDateIndo(checkOut) : 'Segera konfirmasi';

  const messageLines = [
    `Halo Puncak Escape! 🌿 Saya ingin booking villa:`,
    ``,
    `🏡 *Villa:* ${villa.name}`,
    `📍 *Lokasi:* ${villa.location.area}, ${villa.location.district} (16750)`,
    `📅 *Check-in:* ${checkInFormatted}`,
    `📅 *Check-out:* ${checkOutFormatted} (${nights} Malam)`,
    `👥 *Jumlah Tamu:* ${guests} Orang`,
    `💰 *Estimasi Biaya:* ${formatRupiah(total)}`,
  ];

  if (name && name.trim()) {
    messageLines.push(`👤 *Nama Pemesan:* ${name.trim()}`);
  }

  if (specialNotes && specialNotes.trim()) {
    messageLines.push(`📝 *Catatan Khusus:* ${specialNotes.trim()}`);
  }

  messageLines.push(
    ``,
    `Mohon info apakah tanggal tersebut masih available dan prosedur bookingnya. Terima kasih! 🙏✨`
  );

  const fullText = messageLines.join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullText)}`;
}

export function generateGeneralWhatsAppInquiryUrl(customQuestion?: string): string {
  const text = customQuestion 
    ? `Halo Puncak Escape! 🌿 ${customQuestion}`
    : `Halo Puncak Escape! 🌿 Saya ingin konsultasi rekomendasi villa terbaik di Puncak (Cisarua / Tugu Selatan). Mohon bantuannya ya!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
