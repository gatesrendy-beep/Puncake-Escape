import { 
  ShieldCheck, 
  PhoneCall, 
  Percent, 
  Sparkles, 
  HeartHandshake, 
  Coffee,
  CheckCircle2
} from 'lucide-react';

export function TrustSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Fisik Villa Terverifikasi',
      description: 'Seluruh villa dalam katalog Puncak Escape telah melewati inspeksi fisik langsung. Kebersihan, fungsi air panas, kehangatan kolam renang, dan legalitas properti terjamin.'
    },
    {
      icon: Percent,
      title: 'Harga Langsung Tanpa Markup',
      description: 'Dapatkan tarif langsung pengelola villa tanpa biaya platform tersembunyi. Transparan antara tarif weekdays dan weekend tanpa komisi sepihak.'
    },
    {
      icon: HeartHandshake,
      title: 'Caretaker Standby 24 Jam',
      description: 'Setiap villa memiliki tim penjaga lokal yang ramah dan siap membantu mulai dari proses check-in, menyalakan arang BBQ, api unggun, hingga pengantaran kebutuhan darurat.'
    },
    {
      icon: PhoneCall,
      title: 'Booking Cepat Tanpa Ribet',
      description: 'Cukup pilih villa, tentukan tanggal, lalu konfirmasi langsung dengan staf reservasi kami via WhatsApp. Tidak perlu registrasi akun atau kartu kredit rumit.'
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Standar Pelayanan Puncak Escape
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-stone-900">
            Mengapa Memilih Booking Bersama Puncak Escape?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Menghadirkan kenyamanan liburan tanpa rasa cemas bagi keluarga dan rekan kerja Anda di kawasan Puncak, Cisarua, dan Tugu Selatan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-700/50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Local presence assurance bar */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-700">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium">
              Kantor Representatif Operasional: <strong>Tugu Selatan, Cisarua, West Java 16750</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tim on-site selalu siap di area Puncak</span>
          </div>
        </div>

      </div>
    </section>
  );
}
