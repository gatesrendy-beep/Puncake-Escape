import { useState, useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Villa } from '../types';
import { VillaCard } from './VillaCard';

interface NewVillasSectionProps {
  allVillas: Villa[];
  savedVillaIds: string[];
  onToggleSave: (id: string) => void;
  onSelectVilla: (villa: Villa) => void;
  onQuickBookWhatsApp: (villa: Villa) => void;
  checkInDate: string;
  checkOutDate: string;
  onViewAllCatalog: () => void;
}

export function NewVillasSection({
  allVillas,
  savedVillaIds,
  onToggleSave,
  onSelectVilla,
  onQuickBookWhatsApp,
  checkInDate,
  checkOutDate,
  onViewAllCatalog,
}: NewVillasSectionProps) {
  const [showAllNew, setShowAllNew] = useState(false);

  // 14-day cutoff window
  const newVillas = useMemo(() => {
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    
    // Find published villas that have publishedAt within 14 days
    const filtered = allVillas.filter((v) => {
      if (v.status && v.status !== 'published') return false;
      if (!v.publishedAt) return false;
      const pubTime = new Date(v.publishedAt).getTime();
      return pubTime >= fourteenDaysAgo;
    });

    // Sort newest first
    filtered.sort((a, b) => {
      const timeA = new Date(a.publishedAt || 0).getTime();
      const timeB = new Date(b.publishedAt || 0).getTime();
      return timeB - timeA;
    });

    return filtered;
  }, [allVillas]);

  // If there are no new villas within 14 days, gracefully hide this section
  if (newVillas.length === 0) {
    return null;
  }

  const displayedVillas = showAllNew ? newVillas : newVillas.slice(0, 6);

  return (
    <section className="py-12 border-b border-stone-200/70 bg-stone-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Listing Terkini</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
              ✨ New Villas
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Freshly added private villas in Puncak & Cisarua.
            </p>
          </div>

          {newVillas.length > 6 && !showAllNew && (
            <button
              type="button"
              onClick={() => setShowAllNew(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
            >
              <span>Lihat Semua ({newVillas.length} Villa Baru)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedVillas.map((villa) => (
            <VillaCard
              key={`new-${villa.id}`}
              villa={villa}
              isSaved={savedVillaIds.includes(villa.id)}
              onToggleSave={onToggleSave}
              onSelectVilla={onSelectVilla}
              onQuickBookWhatsApp={onQuickBookWhatsApp}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
