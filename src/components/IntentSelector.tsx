import { Users, Flame, Mountain, Sparkles, Heart, Award } from 'lucide-react';

interface IntentSelectorProps {
  activeIntent: string;
  onSelectIntent: (intent: string) => void;
}

export function IntentSelector({ activeIntent, onSelectIntent }: IntentSelectorProps) {
  const intents = [
    {
      id: 'all',
      title: 'Semua Koleksi',
      subtitle: '8 Villa Kurasi Pilihan',
      icon: Award,
      badge: 'Lengkap',
    },
    {
      id: 'family',
      title: 'Liburan Keluarga',
      subtitle: 'Kenyamanan multi-generasi',
      icon: Users,
      badge: 'Favorit',
    },
    {
      id: 'heated-pool',
      title: 'Kolam Air Hangat',
      subtitle: 'Berenang nyaman udara sejuk',
      icon: Flame,
      badge: '30°C - 32°C',
    },
    {
      id: 'mountain-view',
      title: 'View Gunung & Teh',
      subtitle: 'Hamparan kebun & kabut pagi',
      icon: Mountain,
      badge: 'Panorama',
    },
    {
      id: 'gathering',
      title: 'Rombongan & Arisan',
      subtitle: 'Kapasitas 15 - 40 orang',
      icon: Sparkles,
      badge: 'Halaman Luas',
    },
    {
      id: 'romantic',
      title: 'Romantis & Pasangan',
      subtitle: 'Cottage privat & tenang',
      icon: Heart,
      badge: 'Intimate',
    },
  ];

  return (
    <section className="py-8 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
              Discovery by Intent
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 mt-1">
              Tujuan Perjalanan Anda ke Puncak
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md">
            Pilih preferensi liburan untuk melihat rekomendasi villa paling pas tanpa perlu membuang waktu.
          </p>
        </div>

        {/* Intent Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {intents.map((item) => {
            const Icon = item.icon;
            const isActive = activeIntent === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectIntent(item.id)}
                className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                  isActive
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-md scale-[1.02]'
                    : 'bg-white text-stone-800 border-stone-200/90 hover:border-emerald-600/40 hover:bg-emerald-50/30 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-emerald-800 text-emerald-200'
                        : 'bg-stone-100 text-stone-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-emerald-800/90 text-emerald-100'
                        : 'bg-stone-100 text-stone-500 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`text-xs sm:text-sm font-bold font-display ${isActive ? 'text-white' : 'text-stone-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-[11px] mt-0.5 line-clamp-1 ${isActive ? 'text-emerald-200' : 'text-stone-500'}`}>
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
