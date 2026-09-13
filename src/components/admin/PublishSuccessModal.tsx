import { CheckCircle2, Eye, ArrowRight } from 'lucide-react';
import { Villa } from '../../types';

interface PublishSuccessModalProps {
  villa: Villa;
  onViewVilla: (villa: Villa) => void;
  onBackToDashboard: () => void;
}

export function PublishSuccessModal({
  villa,
  onViewVilla,
  onBackToDashboard,
}: PublishSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-center p-7 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Celebration Icon */}
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9 text-emerald-700" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <span>✨ Terverifikasi & Live</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-stone-900">
            Villa Published
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            <strong className="text-stone-900 font-semibold">{villa.name}</strong> is now live on Puncake Escape dan tampil di beranda bagian <span className="font-semibold text-emerald-900">✨ New Villas</span>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 text-left text-xs text-stone-600 space-y-1">
          <p>• Area: <strong className="text-stone-900">{villa.location.area}, Puncak</strong></p>
          <p>• Status: <span className="font-semibold text-emerald-800 uppercase">Published</span></p>
          <p>• Kapasitas: <strong className="text-stone-900">{villa.maxGuests} Tamu</strong> ({villa.bedrooms} Kamar)</p>
          <p>• Masa Badge NEW: <strong className="text-stone-900">14 Hari</strong> ke depan</p>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => onViewVilla(villa)}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Villa</span>
          </button>

          <button
            type="button"
            onClick={onBackToDashboard}
            className="py-3 px-4 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
