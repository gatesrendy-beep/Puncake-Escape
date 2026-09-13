import { useState } from 'react';
import { MapPin, ArrowRight, Loader2, AlertTriangle, ExternalLink, Sparkles, X } from 'lucide-react';
import { Villa, GooglePlaceImportResult } from '../../types';
import { importGooglePlace, detectDuplicateListing } from '../../services/api';

interface GoogleMapsImportStepProps {
  existingVillas: Villa[];
  onImportSuccess: (placeData: GooglePlaceImportResult) => void;
  onOpenExisting: (villa: Villa) => void;
  onCancel: () => void;
}

export function GoogleMapsImportStep({
  existingVillas,
  onImportSuccess,
  onOpenExisting,
  onCancel,
}: GoogleMapsImportStepProps) {
  const [mapsUrl, setMapsUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [duplicateVilla, setDuplicateVilla] = useState<Villa | null>(null);
  const [pendingPlaceData, setPendingPlaceData] = useState<GooglePlaceImportResult | null>(null);

  // Suggested realistic Puncak examples for rapid admin testing
  const sampleLinks = [
    {
      label: 'Villa Casablanca Tugu (Tugu Selatan)',
      url: 'https://maps.google.com/?q=Villa+Casablanca+Tugu+Selatan+Puncak',
    },
    {
      label: 'Villa Highland Tea Cisarua',
      url: 'https://maps.google.com/place/Villa+Highland+Tea+Cisarua/@-6.7023,106.9532,17z',
    },
    {
      label: 'Villa Panorama Gunung Mas (Tugu)',
      url: 'https://maps.app.goo.gl/place/Villa+Panorama+Gunung+Mas+Puncak',
    },
  ];

  const handleImport = async (urlToUse?: string) => {
    const url = (urlToUse || mapsUrl).trim();
    if (!url) {
      setErrorMsg('Silakan tempelkan link Google Maps villa terlebih dahulu.');
      return;
    }

    setIsImporting(true);
    setErrorMsg('');
    setDuplicateVilla(null);
    setPendingPlaceData(null);

    try {
      const placeData = await importGooglePlace(url);
      
      // Check for duplicate listing
      const foundDuplicate = detectDuplicateListing(placeData.placeId, placeData.name, existingVillas);
      
      if (foundDuplicate) {
        setDuplicateVilla(foundDuplicate);
        setPendingPlaceData(placeData);
        setIsImporting(false);
        return;
      }

      onImportSuccess(placeData);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memproses link Google Maps. Pastikan URL valid.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 sm:p-8 relative">
          <button
            type="button"
            onClick={onCancel}
            className="absolute right-5 top-5 p-2 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/70 border border-emerald-600/40 text-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Step 1 — Paste Google Maps URL</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-50">
            Tambah Listing Villa Baru
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1.5 max-w-lg leading-relaxed">
            Tempel link Google Maps properti villa di Puncak. Sistem otomatis mengekstrak nama, area Cisarua/Tugu, dan menyimpan URL untuk navigasi tamu tanpa memerlukan Google API key.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Large Paste Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Paste Link Google Maps Villa
            </label>
            <div className="relative">
              <div className="absolute left-4 top-3.5 text-stone-400">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <input
                type="url"
                value={mapsUrl}
                onChange={(e) => {
                  setMapsUrl(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="https://maps.google.com/... atau https://maps.app.goo.gl/..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-medium text-stone-900 transition-all shadow-2xs"
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 mt-2 font-medium flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            )}

            <p className="text-[11px] text-stone-500 mt-2">
              Mendukung link share Google Maps, browser place URL, link pendek goo.gl, atau URL dengan koordinat Puncak.
            </p>
          </div>

          {/* Quick Example Chips for Admin Convenience */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">
              Contoh Link Cepat (Klik untuk uji coba):
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleLinks.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setMapsUrl(sample.url);
                    handleImport(sample.url);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs hover:border-emerald-600/50 hover:bg-emerald-50/40 transition-colors flex items-center gap-1.5 font-medium shadow-2xs text-left"
                >
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{sample.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duplicate Detection Warning Banner */}
          {duplicateVilla && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-950 font-display">
                    Villa Sudah Terdaftar di Puncake Escape
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Properti <strong className="font-semibold text-amber-950">"{duplicateVilla.name}"</strong> sudah ada di database ({duplicateVilla.status === 'published' ? 'Sudah Published' : 'Status: ' + duplicateVilla.status}).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenExisting(duplicateVilla)}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Listing yang Sudah Ada</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (pendingPlaceData) {
                      onImportSuccess(pendingPlaceData);
                    }
                  }}
                  className="px-3 py-2 rounded-xl border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors"
                >
                  Tetap Buat Draft Baru
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-3 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={() => handleImport()}
              disabled={isImporting || !mapsUrl.trim()}
              className="px-7 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengambil Data Places...</span>
                </>
              ) : (
                <>
                  <span>Import Villa</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
