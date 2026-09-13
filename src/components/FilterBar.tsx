import { 
  SlidersHorizontal, 
  Flame, 
  Users, 
  MapPin, 
  Sparkles, 
  Music, 
  Search,
  X
} from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalVillasCount: number;
  filteredCount: number;
}

export function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalVillasCount,
  filteredCount,
}: FilterBarProps) {
  const isAnyFilterActive = 
    (filters.intent && filters.intent !== 'all') ||
    filters.area !== '' ||
    filters.onlyHeatedPool ||
    filters.onlyMountainView ||
    filters.hasBilliard ||
    filters.hasKaraoke ||
    filters.minGuests > 0 ||
    filters.searchQuery !== '';

  return (
    <div className="bg-white border-y border-stone-200 sticky top-[60px] md:top-[64px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        
        {/* Top row: search input + sort dropdown + count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search bar inside catalog */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama villa, fasilitas (misal: billiard, jacuzzi)..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all text-stone-800 placeholder-stone-400"
            />
            {filters.searchQuery && (
              <button 
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Result Count and Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs sm:text-sm">
            <span className="text-stone-500 font-medium">
              Menampilkan <strong className="text-stone-900 font-semibold">{filteredCount}</strong> dari {totalVillasCount} Villa
            </span>

            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
                className="bg-transparent font-medium text-stone-700 text-xs focus:outline-none cursor-pointer"
              >
                <option value="recommended">Rekomendasi Terbaik</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi (4.9+)</option>
                <option value="capacity">Kapasitas Tamu Terbesar</option>
              </select>
            </div>

            {isAnyFilterActive && (
              <button
                onClick={onResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 px-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips row (Horizontal scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-medium">
          {filters.intent && filters.intent !== 'all' && (
            <button
              onClick={() => onFilterChange({ intent: 'all' })}
              className="px-3 py-1.5 rounded-xl bg-emerald-900 text-white font-semibold flex items-center gap-1.5 shrink-0 shadow-xs"
              title="Klik untuk hapus filter intent"
            >
              <span>Kategori: {filters.intent}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => onFilterChange({ area: '' })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 ${
              filters.area === '' 
                ? 'bg-stone-900 text-white font-semibold' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
            }`}
          >
            Semua Area
          </button>

          <button
            onClick={() => onFilterChange({ area: filters.area === 'Tugu Selatan' ? '' : 'Tugu Selatan' })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              filters.area === 'Tugu Selatan' 
                ? 'bg-emerald-800 text-white font-semibold' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
            }`}
          >
            <MapPin className="w-3 h-3 text-emerald-500" />
            Tugu Selatan (16750)
          </button>

          <button
            onClick={() => onFilterChange({ area: filters.area === 'Cisarua' ? '' : 'Cisarua' })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              filters.area === 'Cisarua' 
                ? 'bg-emerald-800 text-white font-semibold' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
            }`}
          >
            <MapPin className="w-3 h-3 text-emerald-500" />
            Cisarua
          </button>

          <button
            onClick={() => onFilterChange({ onlyHeatedPool: !filters.onlyHeatedPool })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              filters.onlyHeatedPool 
                ? 'bg-amber-600 text-white font-semibold shadow-xs' 
                : 'bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-500" />
            Kolam Air Hangat
          </button>

          <button
            onClick={() => onFilterChange({ onlyMountainView: !filters.onlyMountainView })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              filters.onlyMountainView 
                ? 'bg-emerald-700 text-white font-semibold shadow-xs' 
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-600" />
            View Gunung & Kebun Teh
          </button>

          <button
            onClick={() => onFilterChange({ minGuests: filters.minGuests >= 20 ? 0 : 20 })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              filters.minGuests >= 20 
                ? 'bg-stone-900 text-white font-semibold shadow-xs' 
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Users className="w-3 h-3 text-stone-600" />
            Keluarga Besar (20+ Pax)
          </button>

          <button
            onClick={() => onFilterChange({ hasBilliard: !filters.hasBilliard })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              filters.hasBilliard 
                ? 'bg-stone-900 text-white font-semibold shadow-xs' 
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            Meja Billiard
          </button>

          <button
            onClick={() => onFilterChange({ hasKaraoke: !filters.hasKaraoke })}
            className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5 ${
              filters.hasKaraoke 
                ? 'bg-stone-900 text-white font-semibold shadow-xs' 
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Music className="w-3 h-3 text-stone-600" />
            Karaoke
          </button>
        </div>

      </div>
    </div>
  );
}
