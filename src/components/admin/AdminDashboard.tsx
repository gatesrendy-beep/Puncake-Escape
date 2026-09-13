import { useState, useMemo } from 'react';
import {
  Plus,
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Star,
  ExternalLink,
  Edit,
  Eye,
  LogOut,
  MapPin,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Villa, VillaStatus } from '../../types';
import { formatRupiah } from '../../utils/format';

interface AdminDashboardProps {
  villas: Villa[];
  onAddNewVilla: () => void;
  onEditVilla: (villa: Villa) => void;
  onPreviewVilla: (villa: Villa) => void;
  onPublishVilla: (villa: Villa) => void;
  onUnpublishVilla: (villa: Villa) => void;
  onArchiveVilla: (villa: Villa) => void;
  onExitAdmin: () => void;
  onLogout: () => void;
}

export function AdminDashboard({
  villas,
  onAddNewVilla,
  onEditVilla,
  onPreviewVilla,
  onPublishVilla,
  onUnpublishVilla,
  onArchiveVilla,
  onExitAdmin,
  onLogout,
}: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Stats
  const stats = useMemo(() => {
    const total = villas.length;
    const published = villas.filter((v) => v.status === 'published').length;
    const drafts = villas.filter((v) => v.status === 'draft').length;
    const pending = villas.filter((v) => v.status === 'pending_review').length;
    const archived = villas.filter((v) => v.status === 'archived').length;

    // 14 days new villa check
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    const newVillas = villas.filter((v) => {
      if (v.status !== 'published') return false;
      if (!v.publishedAt) return false;
      const pubTime = new Date(v.publishedAt).getTime();
      return pubTime >= fourteenDaysAgo;
    }).length;

    return { total, published, drafts, pending, archived, newVillas };
  }, [villas]);

  // Filtered villas
  const displayedVillas = useMemo(() => {
    return villas.filter((v) => {
      if (filterStatus !== 'all') {
        if (filterStatus === 'new') {
          if (v.status !== 'published' || !v.publishedAt) return false;
          const pubTime = new Date(v.publishedAt).getTime();
          return pubTime >= Date.now() - 14 * 24 * 60 * 60 * 1000;
        } else if (v.status !== filterStatus) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = v.name.toLowerCase().includes(q);
        const matchArea = v.location.area.toLowerCase().includes(q);
        return matchName || matchArea;
      }
      return true;
    });
  }, [villas, filterStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-16 font-sans">
      
      {/* Top Navbar */}
      <header className="bg-stone-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExitAdmin}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Kembali ke website utama"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Website Utama</span>
            </button>

            <div className="h-4 w-px bg-stone-700 hidden sm:block" />

            <div>
              <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-stone-50 flex items-center gap-2">
                <span>PUNCAKE ESCAPE ADMIN</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase">
                  Dev Mode (No Auth)
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs font-medium"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar Dev Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Development Mode Notice Banner */}
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold text-[10px] uppercase tracking-wider">
              Phase 1 Dev Mode
            </span>
            <span className="text-stone-700">
              Listing sistem berjalan lokal tanpa memerlukan Google API key atau kredensial autentikasi produksi.
            </span>
          </div>
          <code className="text-[11px] font-mono text-stone-600 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
            {/* TODO: Replace development admin mode with Supabase Auth before production launch. */}
            TODO: Replace development admin mode with Supabase Auth before production launch.
          </code>
        </div>

        {/* Hero Actions Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-stone-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Easy Onboarding & Google Maps Import</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Katalog Properti & Approval
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
              Cukup tempel link Google Maps untuk mengekstrak identitas villa, lalu lengkapi harga dan foto untuk langsung menerbitkan ke beranda.
            </p>
          </div>

          {/* Large Primary Add Button */}
          <button
            type="button"
            onClick={onAddNewVilla}
            className="px-7 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-emerald-950/15 transition-all flex items-center justify-center gap-2.5 shrink-0"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Add New Villa</span>
          </button>
        </div>

        {/* 6 Key Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { label: 'Total Villas', count: stats.total, color: 'text-stone-900', bg: 'bg-white', filter: 'all' },
            { label: 'Published', count: stats.published, color: 'text-emerald-700', bg: 'bg-emerald-50/50', filter: 'published' },
            { label: 'Drafts', count: stats.drafts, color: 'text-amber-700', bg: 'bg-amber-50/50', filter: 'draft' },
            { label: 'Pending Review', count: stats.pending, color: 'text-blue-700', bg: 'bg-blue-50/50', filter: 'pending_review' },
            { label: '✨ New Villas', count: stats.newVillas, color: 'text-purple-700', bg: 'bg-purple-50/50', filter: 'new' },
            { label: 'Archived', count: stats.archived, color: 'text-stone-500', bg: 'bg-stone-50', filter: 'archived' },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setFilterStatus(item.filter)}
              className={`p-4 rounded-2xl border text-left transition-all ${item.bg} ${
                filterStatus === item.filter
                  ? 'border-emerald-700 ring-2 ring-emerald-700/20 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1 truncate">
                {item.label}
              </span>
              <span className={`text-2xl sm:text-3xl font-bold font-display ${item.color}`}>
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table / List View */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          
          {/* Table Header Filter & Search */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama villa atau area..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
              />
            </div>

            {/* Status Filter Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-semibold">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'published', label: 'Published' },
                { id: 'draft', label: 'Draft' },
                { id: 'new', label: '✨ New' },
                { id: 'archived', label: 'Archived' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setFilterStatus(pill.id)}
                  className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                    filterStatus === pill.id
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

          </div>

          {/* Table Body */}
          {displayedVillas.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-display text-stone-800">
                Tidak Ada Villa Ditemukan
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau klik "+ Add New Villa" untuk menambah properti baru.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
                    <th className="py-3.5 px-6">Villa</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Harga / Malam</th>
                    <th className="py-3.5 px-4">Lokasi</th>
                    <th className="py-3.5 px-4">Kapasitas</th>
                    <th className="py-3.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {displayedVillas.map((villa) => {
                    const status = villa.status || 'published';
                    const isNew = Boolean(
                      status === 'published' &&
                      villa.publishedAt &&
                      new Date(villa.publishedAt).getTime() >= Date.now() - 14 * 24 * 60 * 60 * 1000
                    );

                    return (
                      <tr key={villa.id} className="hover:bg-stone-50/70 transition-colors">
                        
                        {/* Villa Name & Image */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-11 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-200">
                              {villa.images && villa.images[0] ? (
                                <img
                                  src={villa.images[0]}
                                  alt={villa.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400 text-[10px]">
                                  No Pic
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-900 text-sm">
                                  {villa.name}
                                </span>
                                {isNew && (
                                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-800 text-white font-bold text-[9px] uppercase tracking-wider">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-500 line-clamp-1">
                                {villa.tagline || villa.whyThisVilla}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : status === 'draft'
                                ? 'bg-amber-100 text-amber-800'
                                : status === 'pending_review'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span>{status}</span>
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 font-semibold text-stone-900 whitespace-nowrap">
                          <div>{formatRupiah(villa.pricePerNightWeekday)}</div>
                          <div className="text-[10px] text-stone-400 font-normal">
                            Weekend: {formatRupiah(villa.pricePerNightWeekend)}
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-medium text-stone-900 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{villa.location.area}</span>
                          </span>
                        </td>

                        {/* Capacity */}
                        <td className="py-4 px-4 whitespace-nowrap text-stone-600">
                          {villa.bedrooms} Kamar • Max {villa.maxGuests} Tamu
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => onEditVilla(villa)}
                              className="p-1.5 rounded-lg text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors font-semibold"
                              title="Edit Listing"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => onPreviewVilla(villa)}
                              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                              title="Lihat Tampilan Villa"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {status !== 'published' ? (
                              <button
                                type="button"
                                onClick={() => onPublishVilla(villa)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors"
                              >
                                Publish
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => onUnpublishVilla(villa)}
                                className="px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 text-[11px] font-semibold transition-colors"
                              >
                                Unpublish
                              </button>
                            )}

                            {status !== 'archived' && (
                              <button
                                type="button"
                                onClick={() => onArchiveVilla(villa)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Arsipkan Villa"
                              >
                                <Archive className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}
