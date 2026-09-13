import { useState, FormEvent } from 'react';
import { ShieldAlert, ArrowLeft, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { loginAdminApi } from '../../services/api';
import { setStoredAdminAuth } from '../../services/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onSuccess, onClose }: AdminLoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // TODO: Replace development admin mode with Supabase Auth before production launch.
  const handleEnterDevMode = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      await loginAdminApi();
      setStoredAdminAuth(true);
      onSuccess();
    } catch {
      setStoredAdminAuth(true);
      onSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 sm:p-7 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Development Admin Mode</span>
          </div>

          <h2 className="text-xl font-bold font-display tracking-tight text-stone-50">
            Puncake Escape Admin
          </h2>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            Portal manajemen katalog villa & onboarding properti Puncak.
          </p>
        </div>

        {/* Development Notice & Fast Access */}
        <div className="p-6 sm:p-7 space-y-5">
          
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Phase 1 — Testing & Listing Mode</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Autentikasi produksi ditangguhkan. Anda dapat langsung masuk tanpa password untuk menguji alur paste URL, edit listing, upload foto, dan publikasi ke <strong>✨ New Villas</strong>.
            </p>
            <div className="font-mono text-[10px] bg-white/80 p-2 rounded-lg border border-amber-200 text-stone-700 select-all">
              // TODO: Replace development admin mode with Supabase Auth before production launch.
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Web
            </button>

            <button
              type="button"
              onClick={() => handleEnterDevMode()}
              disabled={isLoading}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Membuka Admin...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Enter Dev Admin Mode</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
