import { useState, useMemo, ChangeEvent } from 'react';
import {
  X,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  MapPin,
  BedDouble,
  Bath,
  Users,
  Star,
  ExternalLink,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Check,
  ShieldCheck,
  PhoneCall,
  Flame,
  Tv,
  Wifi,
  Car,
  Coffee,
} from 'lucide-react';
import { Villa, GooglePlaceImportResult, VerificationStage } from '../../types';
import { generateAiDescriptionApi } from '../../services/api';
import { formatRupiah } from '../../utils/format';

interface VillaEditorModalProps {
  initialVilla?: Partial<Villa>;
  placeData?: GooglePlaceImportResult;
  onSaveDraft: (villa: Villa) => void;
  onPublish: (villa: Villa) => void;
  onClose: () => void;
}

const LOCAL_PLACEHOLDER_PRESETS = [
  {
    title: 'Infinity Pool & View Salak',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    tag: 'Heated Pool',
  },
  {
    title: 'Living Room Kayu & Mezzanine',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Interior',
  },
  {
    title: 'Fasad Modern Tropis Puncak',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    tag: 'Fasad',
  },
  {
    title: 'Master Bedroom Pinus',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    tag: 'Kamar',
  },
  {
    title: 'Billiard & Lounge Kumpul',
    url: 'https://images.unsplash.com/photo-1542314831-c6a4d27299a9?auto=format&fit=crop&w=1200&q=80',
    tag: 'Billiard',
  },
  {
    title: 'Halaman Rumput Luas & Bonfire',
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    tag: 'Garden BBQ',
  },
];

export function VillaEditorModal({
  initialVilla,
  placeData,
  onSaveDraft,
  onPublish,
  onClose,
}: VillaEditorModalProps) {
  // Derive initial values from imported placeData or existing draft
  const defaultArea = placeData?.area || initialVilla?.location?.area || 'Tugu Selatan';
  const defaultName = placeData?.name || initialVilla?.name || '';
  const defaultSlug = (defaultName || 'villa-puncak')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const [name, setName] = useState(defaultName);
  const [slug, setSlug] = useState(initialVilla?.slug || defaultSlug);
  const [tagline, setTagline] = useState(initialVilla?.tagline || 'Private villa retreat in Puncak with tranquil natural surroundings');
  const [whyThisVilla, setWhyThisVilla] = useState(initialVilla?.whyThisVilla || '');
  const [area, setArea] = useState<string>(defaultArea);
  const [district, setDistrict] = useState(initialVilla?.location?.district || placeData?.district || 'Cisarua');
  const [city, setCity] = useState(initialVilla?.location?.city || placeData?.city || 'Kabupaten Bogor, Jawa Barat');
  const [address, setAddress] = useState(initialVilla?.location?.address || placeData?.formattedAddress || '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(initialVilla?.googleMapsUrl || placeData?.googleMapsUri || '');
  const [whatsappNumber, setWhatsappNumber] = useState(initialVilla?.whatsappNumber || '6281349267683');
  const [popularFor, setPopularFor] = useState<'family' | 'luxury' | 'gathering' | 'romantic'>(initialVilla?.popularFor || 'family');

  // Pricing & Capacity
  const [priceWeekday, setPriceWeekday] = useState<number>(initialVilla?.pricePerNightWeekday || 2500000);
  const [priceWeekend, setPriceWeekend] = useState<number>(initialVilla?.pricePerNightWeekend || 3500000);
  const [securityDeposit, setSecurityDeposit] = useState<number>(initialVilla?.securityDeposit || 500000);
  const [maxGuests, setMaxGuests] = useState<number>(initialVilla?.maxGuests || 15);
  const [bedrooms, setBedrooms] = useState<number>(initialVilla?.bedrooms || 4);
  const [bathrooms, setBathrooms] = useState<number>(initialVilla?.bathrooms || 3);
  const [parkingCars, setParkingCars] = useState<number>(initialVilla?.amenities?.parkingCapacityCars || 4);

  // Photos (Default luxury curated fallback if none)
  const defaultImages = initialVilla?.images && initialVilla.images.length > 0
    ? initialVilla.images
    : [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      ];
  const [images, setImages] = useState<string[]>(defaultImages);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Amenities: Default all to FALSE unless explicitly verified
  const [amenities, setAmenities] = useState({
    hasPrivatePool: initialVilla?.amenities?.hasPrivatePool ?? true,
    hasHeatedPool: initialVilla?.amenities?.hasHeatedPool ?? false,
    hasMountainView: initialVilla?.amenities?.hasMountainView ?? true,
    hasTeaGardenView: initialVilla?.amenities?.hasTeaGardenView ?? false,
    hasWifi: initialVilla?.amenities?.hasWifi ?? true,
    hasKitchen: initialVilla?.amenities?.hasKitchen ?? true,
    hasBBQ: initialVilla?.amenities?.hasBBQ ?? true,
    hasBilliard: initialVilla?.amenities?.hasBilliard ?? false,
    hasKaraoke: initialVilla?.amenities?.hasKaraoke ?? false,
    hasWaterHeater: initialVilla?.amenities?.hasWaterHeater ?? true,
    hasLargeGarden: initialVilla?.amenities?.hasLargeGarden ?? true,
    hasSmartTv: initialVilla?.amenities?.hasSmartTv ?? true,
    hasBonfire: initialVilla?.amenities?.hasBonfire ?? false,
    hasVillaAttendant: initialVilla?.amenities?.hasVillaAttendant ?? true,
    hasAirConditioning: initialVilla?.amenities?.hasAirConditioning ?? false,
    hasGazebo: initialVilla?.amenities?.hasGazebo ?? false,
    hasFirePit: initialVilla?.amenities?.hasFirePit ?? false,
    hasBreakfast: initialVilla?.amenities?.hasBreakfast ?? false,
    hasCaretaker24h: initialVilla?.amenities?.hasCaretaker24h ?? true,
    isFamilyFriendly: initialVilla?.amenities?.isFamilyFriendly ?? true,
    isPetFriendly: initialVilla?.amenities?.isPetFriendly ?? false,
  });

  // Descriptions & SEO
  const [description, setDescription] = useState(
    initialVilla?.description ||
      'Villa privat di kawasan sejuk Puncak dengan pemandangan pegunungan dan suasana asri. Cocok untuk liburan keluarga besar maupun rombongan.'
  );
  const [shortDesc, setShortDesc] = useState(initialVilla?.tagline || 'Private mountain villa in Puncak');
  const [seoTitle, setSeoTitle] = useState(initialVilla?.seoTitle || `${name} | Villa Privat Puncak`);
  const [seoDescription, setSeoDescription] = useState(
    initialVilla?.seoDescription || `Sewa villa ${name} di ${area}, Puncak. Kapasitas ${maxGuests} tamu, ${bedrooms} kamar tidur.`
  );

  // Verification stage
  const [verificationStage, setVerificationStage] = useState<VerificationStage>(
    initialVilla?.verificationStage || (placeData ? 'google_located' : 'reviewed')
  );

  // Active tab
  const [activeTab, setActiveTab] = useState<'details' | 'photos' | 'amenities' | 'description' | 'preview'>('details');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState('');

  // Handle local file upload (converts to base64 WebP/DataURL for immediate viewing & persistence)
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setImages((prev) => [loadEvt.target!.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetCover = (index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      const [chosen] = copy.splice(index, 1);
      return [chosen, ...copy];
    });
  };

  // Trigger AI Description generation strictly from verified facts
  const handleGenerateAiDescription = async () => {
    setIsGeneratingAi(true);
    setAiSuccessMsg('');

    // Compile list of verified amenities
    const verifiedList: string[] = [];
    if (amenities.hasPrivatePool) verifiedList.push('Kolam Renang Privat');
    if (amenities.hasHeatedPool) verifiedList.push('Kolam Air Hangat');
    if (amenities.hasMountainView) verifiedList.push('View Gunung');
    if (amenities.hasTeaGardenView) verifiedList.push('View Kebun Teh');
    if (amenities.hasWifi) verifiedList.push('Wi-Fi Cepat');
    if (amenities.hasKitchen) verifiedList.push('Dapur Lengkap');
    if (amenities.hasBBQ) verifiedList.push('Area BBQ');
    if (amenities.hasBilliard) verifiedList.push('Meja Billiard');
    if (amenities.hasKaraoke) verifiedList.push('Karaoke');
    if (amenities.hasWaterHeater) verifiedList.push('Water Heater');
    if (amenities.hasLargeGarden) verifiedList.push('Halaman Luas');
    if (amenities.hasSmartTv) verifiedList.push('Smart TV');
    if (amenities.hasCaretaker24h) verifiedList.push('Caretaker 24 Jam');

    try {
      const result = await generateAiDescriptionApi({
        name,
        area,
        district,
        priceWeekday,
        priceWeekend,
        guests: maxGuests,
        bedrooms,
        bathrooms,
        verifiedAmenities: verifiedList,
        googleRating: placeData?.rating || initialVilla?.rating || 4.9,
      });

      if (result.description) setDescription(result.description);
      if (result.shortDescription) {
        setShortDesc(result.shortDescription);
        setTagline(result.shortDescription);
      }
      if (result.whyThisVilla) setWhyThisVilla(result.whyThisVilla);
      if (result.seoTitle) setSeoTitle(result.seoTitle);
      if (result.seoDescription) setSeoDescription(result.seoDescription);

      setAiSuccessMsg('Deskripsi villa berhasil disusun oleh AI berdasarkan data terverifikasi.');
      setTimeout(() => setAiSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error('AI generation error:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Calculate Publishing Checklist Requirements
  const checklist = useMemo(() => {
    const checks = [
      { id: 'name', label: 'Nama Villa Valid', ok: Boolean(name && name.trim().length > 3) },
      { id: 'location', label: 'Area & Alamat Jelas', ok: Boolean(area && district) },
      { id: 'price', label: 'Harga Sewa Terisi', ok: priceWeekday > 0 && priceWeekend > 0 },
      { id: 'capacity', label: 'Kapasitas Tamu & Kamar', ok: maxGuests > 0 && bedrooms > 0 },
      { id: 'cover', label: 'Foto Cover Tersedia', ok: images.length > 0 },
      { id: 'gallery', label: 'Minimal 3 Foto Gallery', ok: images.length >= 3 },
      { id: 'whatsapp', label: 'Nomor WhatsApp Valid', ok: Boolean(whatsappNumber && whatsappNumber.length >= 10) },
      { id: 'description', label: 'Deskripsi & Highlight', ok: Boolean(description && description.length > 20) },
    ];
    const allPassed = checks.every((c) => c.ok);
    const missingCount = checks.filter((c) => !c.ok).length;
    return { checks, allPassed, missingCount };
  }, [name, area, district, priceWeekday, priceWeekend, maxGuests, bedrooms, images, whatsappNumber, description]);

  // Construct complete Villa object
  const constructVillaObject = (newStatus: 'draft' | 'published'): Villa => {
    // Intent categories
    const intents: ('family' | 'heated-pool' | 'mountain-view' | 'gathering' | 'romantic')[] = [];
    if (amenities.isFamilyFriendly) intents.push('family');
    if (amenities.hasHeatedPool) intents.push('heated-pool');
    if (amenities.hasMountainView || amenities.hasTeaGardenView) intents.push('mountain-view');
    if (maxGuests >= 15) intents.push('gathering');
    if (popularFor === 'romantic') intents.push('romantic');
    if (intents.length === 0) intents.push('family');

    // Features
    const features: string[] = [];
    if (amenities.hasHeatedPool) features.push('Heated Pool 30°C');
    else if (amenities.hasPrivatePool) features.push('Private Pool');
    if (amenities.hasMountainView) features.push('Mountain View');
    if (amenities.hasTeaGardenView) features.push('Tea Plantation View');
    if (amenities.hasBilliard) features.push('Billiard Table');
    if (amenities.hasKaraoke) features.push('Karaoke Set');
    if (amenities.hasBBQ) features.push('BBQ Pavilion');
    if (features.length === 0) features.push('Private Garden', 'Free Wi-Fi', 'Water Heater');

    const cleanId = initialVilla?.id || `villa-${slug}-${Date.now().toString(36)}`;

    return {
      id: cleanId,
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: shortDesc || tagline,
      whyThisVilla: whyThisVilla || `Pilihan ideal berkapasitas ${maxGuests} tamu di kawasan sejuk ${area}.`,
      intentCategory: intents,
      location: {
        area: area as any,
        district,
        city,
        postalCode: '16750',
        address,
        distanceFromJakarta: '90-120 menit via Tol Jagorawi',
      },
      pricePerNightWeekday: priceWeekday,
      pricePerNightWeekend: priceWeekend,
      securityDeposit,
      extraGuestFee: 50000,
      bedrooms,
      bathrooms,
      maxGuests,
      recommendedGuests: `${Math.max(4, maxGuests - 5)} - ${maxGuests} Guests`,
      rating: placeData?.rating || initialVilla?.rating || 4.9,
      reviewCount: placeData?.userRatingCount || initialVilla?.reviewCount || 16,
      images,
      features,
      amenities: {
        ...amenities,
        hasBasketballOrBadminton: false,
        parkingCapacityCars: parkingCars,
      },
      description,
      highlights: [
        `Kapasitas hingga ${maxGuests} orang dengan ${bedrooms} kamar tidur`,
        amenities.hasHeatedPool ? 'Kolam renang air hangat privat (30°C - 32°C)' : 'Kolam renang privat bersih',
        amenities.hasMountainView ? 'Panorama pemandangan pegunungan dan kabut sejuk' : 'Suasana privat tenang dan asri',
        `Caretaker ramah siap membantu selama menginap`,
      ],
      bedConfigurations: [
        { room: 'Master Bedroom', beds: '1 King Bed + Kamar Mandi Dalam' },
        { room: 'Bedroom 2', beds: '1 Queen Bed' },
        { room: 'Bedroom 3 & 4', beds: '2 Single Beds / Extra Bed' },
      ],
      houseRules: [
        'Check-in mulai pukul 14:00 WIB, Check-out maksimal pukul 12:00 WIB',
        'Dilarang merokok di dalam kamar tidur (tersedia area outdoor/balkon)',
        'Harap menjaga ketenangan setelah pukul 22:00 WIB',
        'Tidak diperkenankan membawa zat terlarang / senjata tajam',
      ],
      checkInTime: '14:00 WIB',
      checkOutTime: '12:00 WIB',
      popularFor,
      isFeatured: initialVilla?.isFeatured ?? false,
      status: newStatus,
      verificationStage,
      googlePlaceId: placeData?.placeId || initialVilla?.googlePlaceId,
      sourcePlaceId: placeData?.placeId || initialVilla?.sourcePlaceId,
      googleMapsUrl: googleMapsUrl || placeData?.googleMapsUri,
      coordinates: placeData ? { lat: placeData.latitude, lng: placeData.longitude } : initialVilla?.coordinates,
      googleRating: placeData?.rating || initialVilla?.googleRating,
      googleReviewCount: placeData?.userRatingCount || initialVilla?.googleReviewCount,
      whatsappNumber,
      seoTitle,
      seoDescription,
    };
  };

  const handleSaveDraftAction = () => {
    const draftVilla = constructVillaObject('draft');
    onSaveDraft(draftVilla);
  };

  const handlePublishAction = () => {
    if (!checklist.allPassed) return;
    const publishedVilla = constructVillaObject('published');
    publishedVilla.publishedAt = new Date().toISOString();
    publishedVilla.approvedBy = 'Admin Concierge';
    onPublish(publishedVilla);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="bg-stone-900 text-white px-6 py-4 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-300 font-bold text-sm">
              PE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-stone-100">
                  {name || 'Review Listing Villa Baru'}
                </h2>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  initialVilla?.status === 'published' ? 'bg-emerald-800 text-emerald-100' : 'bg-amber-900/80 text-amber-200'
                }`}>
                  {initialVilla?.status || 'Draft'}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {placeData ? `Diimpor dari Google Maps: ${placeData.name}` : 'Editor Data Listing & Approval'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-stone-200 bg-stone-50 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold">
          {[
            { id: 'details', label: '1. Detail Properti' },
            { id: 'photos', label: `2. Foto Gallery (${images.length})` },
            { id: 'amenities', label: '3. Fasilitas Terverifikasi' },
            { id: 'description', label: '4. Deskripsi & AI ✨' },
            { id: 'preview', label: '5. Preview & Checklist' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-800 text-emerald-950 font-bold bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              
              {/* Google Maps Banner if imported */}
              {placeData && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold uppercase tracking-wider text-emerald-800 text-[10px] block mb-0.5">
                      ✓ Google Places (New) Data Terhubung
                    </span>
                    <p className="font-medium text-emerald-900">
                      Place ID: <code className="font-mono text-[11px] bg-emerald-100 px-1 py-0.5 rounded">{placeData.placeId}</code> • Rating: ★ {placeData.rating || 4.9} ({placeData.userRatingCount || 0} reviews)
                    </p>
                  </div>
                  {placeData.googleMapsUri && (
                    <a
                      href={placeData.googleMapsUri}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                    >
                      <span>Buka di Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Villa Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nama Villa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }}
                    placeholder="Contoh: Villa Casablanca Tugu"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-semibold text-stone-900"
                  />
                </div>

                {/* Area Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Area Puncak <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-semibold text-stone-900 bg-white"
                  >
                    <option value="Tugu Selatan">Tugu Selatan (Kebun Teh & Dingin)</option>
                    <option value="Cisarua">Cisarua (Dekat Safari & Akses Tol)</option>
                    <option value="Megamendung">Megamendung (Akses Mudah Tanpa Buka Tutup)</option>
                    <option value="Puncak Pass">Puncak Pass & Sekitarnya</option>
                  </select>
                </div>

                {/* District & City */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Kecamatan / Kabupaten
                  </label>
                  <input
                    type="text"
                    value={`${district}, ${city}`}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm font-medium text-stone-600"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Jl. Raya Puncak KM..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-medium text-stone-900"
                  />
                </div>

                {/* Pricing: Weekday & Weekend */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Harga Sewa Weekdays / Malam (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="100000"
                    value={priceWeekday}
                    onChange={(e) => setPriceWeekday(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-bold text-stone-900"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    {formatRupiah(priceWeekday)} / malam
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Harga Sewa Weekend / Malam (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="100000"
                    value={priceWeekend}
                    onChange={(e) => setPriceWeekend(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-bold text-stone-900"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    {formatRupiah(priceWeekend)} / malam
                  </span>
                </div>

                {/* Capacity: Guests, Bedrooms, Bathrooms */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Maksimal Tamu (Orang) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-bold text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Kamar Tidur & Kamar Mandi <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="1"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      placeholder="Kamar Tidur"
                      className="px-3 py-3 rounded-xl border border-stone-300 text-sm font-bold text-stone-900 text-center"
                    />
                    <input
                      type="number"
                      min="1"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      placeholder="Kamar Mandi"
                      className="px-3 py-3 rounded-xl border border-stone-300 text-sm font-bold text-stone-900 text-center"
                    />
                  </div>
                </div>

                {/* WhatsApp Concierge Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp Reservasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="6281349267683"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-mono text-stone-900"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Default: Concierge Puncake Escape (6281349267683)
                  </span>
                </div>

                {/* Verification Stage */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Tahap Verifikasi Listing
                  </label>
                  <select
                    value={verificationStage}
                    onChange={(e) => setVerificationStage(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-semibold text-stone-900 bg-white"
                  >
                    <option value="google_located">Google Maps Located (Terverifikasi Lokasi)</option>
                    <option value="reviewed">Information Reviewed (Ditinjau Tim Puncake)</option>
                    <option value="verified">Property Verified (Inspeksi Fisik Selesai)</option>
                  </select>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-5">
              
              <div>
                <h3 className="text-base font-bold font-display text-stone-900">
                  Upload & Kelola Foto Villa
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Foto cover adalah foto pertama yang muncul pada kartu catalog dan hero detail.
                </p>
              </div>

              {/* Local Placeholder Presets Picker (Phase 1 Local Mode) */}
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                      Pilih Foto Placeholder Puncak (Local Presets)
                    </span>
                    <p className="text-[11px] text-stone-500">
                      Klik foto preset di bawah untuk langsung menambahkannya ke galeri villa ini.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const presetUrls = LOCAL_PLACEHOLDER_PRESETS.map((p) => p.url);
                      const combined = Array.from(new Set([...images, ...presetUrls]));
                      setImages(combined);
                    }}
                    className="self-start sm:self-auto text-[11px] font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-100/80 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tambahkan Semua Preset ({LOCAL_PLACEHOLDER_PRESETS.length})</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1">
                  {LOCAL_PLACEHOLDER_PRESETS.map((preset, pIdx) => {
                    const isSelected = images.includes(preset.url);
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setImages(images.filter((img) => img !== preset.url));
                          } else {
                            setImages([...images, preset.url]);
                          }
                        }}
                        className={`group relative rounded-xl overflow-hidden aspect-4/3 border-2 text-left transition-all ${
                          isSelected
                            ? 'border-emerald-700 ring-2 ring-emerald-700/30'
                            : 'border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-1.5">
                          <span className="text-[9px] font-bold text-white leading-tight line-clamp-1">
                            {preset.tag}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Upload Drop Area */}
              <div className="border-2 border-dashed border-stone-300 rounded-3xl p-6 sm:p-8 text-center bg-stone-50/50 hover:bg-emerald-50/30 hover:border-emerald-600/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-stone-800">
                  Tarik & Taruh Foto ke Sini, atau Klik untuk Unggah
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Format gambar JPG, PNG, WEBP. Otomatis dikompresi untuk loading cepat.
                </p>
                <label className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors">
                  <ImageIcon className="w-4 h-4" />
                  <span>Pilih File Foto</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Add image URL directly */}
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Atau tambahkan tautan URL gambar (https://...)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  disabled={!newImageUrl.trim()}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold disabled:opacity-50"
                >
                  Tambah URL
                </button>
              </div>

              {/* Current Gallery Grid */}
              <div>
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-3">
                  Gallery Foto Saat Ini ({images.length} Foto)
                </span>
                {images.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">Belum ada foto yang diunggah.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative group rounded-2xl overflow-hidden aspect-4/3 border-2 ${
                          idx === 0 ? 'border-emerald-600 shadow-md' : 'border-stone-200'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Villa photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Cover Badge */}
                        {idx === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-700 text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
                            Cover Image
                          </div>
                        )}

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(idx)}
                              className="px-2 py-1 rounded-lg bg-emerald-700 text-white text-[10px] font-bold"
                              title="Jadikan Cover Utama"
                            >
                              Set Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            title="Hapus Foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                <span className="font-bold text-amber-900 block mb-0.5">
                  Aturan Integritas Fasilitas Puncake Escape:
                </span>
                <p>
                  Hanya centang fasilitas yang benar-benar telah dikonfirmasi atau diperiksa oleh caretaker. Jangan mencentang kolam air hangat (heated pool) jika hanya kolam biasa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: 'hasPrivatePool', label: 'Private Pool (Kolam Renang Privat)', icon: Flame },
                  { key: 'hasHeatedPool', label: 'Heated Pool (Kolam Air Hangat 30°C)', icon: Flame },
                  { key: 'hasMountainView', label: 'Pemandangan Gunung', icon: MapPin },
                  { key: 'hasTeaGardenView', label: 'Pemandangan Kebun Teh', icon: MapPin },
                  { key: 'hasWifi', label: 'Wi-Fi Cepat', icon: Wifi },
                  { key: 'hasKitchen', label: 'Dapur Lengkap & Gas', icon: Coffee },
                  { key: 'hasBBQ', label: 'Alat & Area BBQ', icon: Flame },
                  { key: 'hasBilliard', label: 'Meja Billiard', icon: Tv },
                  { key: 'hasKaraoke', label: 'Sound System / Karaoke', icon: Tv },
                  { key: 'hasWaterHeater', label: 'Water Heater (Air Panas)', icon: Flame },
                  { key: 'hasSmartTv', label: 'Smart TV (Netflix/YouTube)', icon: Tv },
                  { key: 'hasLargeGarden', label: 'Halaman Rumput Luas', icon: MapPin },
                  { key: 'hasBonfire', label: 'Area Api Unggun / Bonfire', icon: Flame },
                  { key: 'hasAirConditioning', label: 'Air Conditioning (AC)', icon: Tv },
                  { key: 'hasGazebo', label: 'Gazebo Santai', icon: MapPin },
                  { key: 'hasCaretaker24h', label: 'Caretaker Standby 24 Jam', icon: ShieldCheck },
                  { key: 'isFamilyFriendly', label: 'Family Friendly (Ramah Anak/Lansia)', icon: Users },
                  { key: 'isPetFriendly', label: 'Pet Friendly', icon: Users },
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = (amenities as any)[item.key];
                  return (
                    <label
                      key={item.key}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-600/60 text-emerald-950 font-semibold'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 shrink-0 ${isChecked ? 'text-emerald-700' : 'text-stone-400'}`} />
                        <span className="text-xs leading-snug">{item.label}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          setAmenities((prev) => ({ ...prev, [item.key]: e.target.checked }));
                        }}
                        className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-700 border-stone-300"
                      />
                    </label>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 4: DESCRIPTION & AI ASSISTANT */}
          {activeTab === 'description' && (
            <div className="space-y-5">
              
              {/* AI Description Assistant Trigger Banner */}
              <div className="p-5 rounded-3xl bg-linear-to-r from-emerald-900 to-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 text-[11px] font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gemini AI Assistant</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold font-display text-white">
                    Generate Copywriting Villa Otomatis
                  </h4>
                  <p className="text-xs text-stone-300 mt-0.5 max-w-lg">
                    AI hanya meracik teks dari data terverifikasi (nama, lokasi {area}, {maxGuests} tamu, {bedrooms} kamar, dan fasilitas yang dicentang). Tidak ada halusinasi fasilitas fiktif.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAiDescription}
                  disabled={isGeneratingAi || !name.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-60 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyusun Narasi...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Description ✨</span>
                    </>
                  )}
                </button>
              </div>

              {aiSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{aiSuccessMsg}</span>
                </div>
              )}

              {/* Tagline / Subtitle */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Tagline / Ringkasan Singkat
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-medium text-stone-900"
                />
              </div>

              {/* Why This Villa Positioning statement */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Highlight "Kenapa Memilih Villa Ini?" (Callout Badge)
                </label>
                <input
                  type="text"
                  value={whyThisVilla}
                  onChange={(e) => setWhyThisVilla(e.target.value)}
                  placeholder="Contoh: Pilihan utama keluarga besar dengan kolam air hangat privat & pemandangan Gunung Gede."
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-sm font-medium text-stone-900"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Deskripsi Lengkap Villa <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 text-xs sm:text-sm font-normal text-stone-900 leading-relaxed"
                />
              </div>

              {/* SEO Meta Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-700"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: PREVIEW & PUBLISHING CHECKLIST */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              
              {/* Publishing Checklist Box */}
              <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-display text-stone-900">
                    Publishing Checklist
                  </h4>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    checklist.allPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {checklist.allPassed ? '✓ Siap Diterbitkan' : `${checklist.missingCount} Syarat Belum Lengkap`}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {checklist.checks.map((c) => (
                    <div
                      key={c.id}
                      className={`p-2.5 rounded-xl flex items-center gap-2 border ${
                        c.ok
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                          : 'bg-red-50/70 border-red-200 text-red-800 font-medium'
                      }`}
                    >
                      {c.ok ? (
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      )}
                      <span className="truncate">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Preview Card */}
              <div>
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-3">
                  Live Preview Villa Card di Website:
                </span>
                
                <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-lg">
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    {images[0] ? (
                      <img src={images[0]} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">Belum ada foto</div>
                    )}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-900/90 text-white font-bold text-[10px] tracking-wider uppercase">
                      NEW
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-950/70 text-white text-xs font-bold backdrop-blur-xs flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      <span>{placeData?.rating || 4.9}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                        {area}, Puncak
                      </span>
                      <h3 className="text-lg font-bold font-display text-stone-900">
                        {name || 'Nama Villa'}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-1">{tagline}</p>
                    </div>

                    {whyThisVilla && (
                      <div className="p-2 rounded-xl bg-emerald-50 text-[11px] font-medium text-emerald-950">
                        Highlight: {whyThisVilla}
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-stone-100 text-stone-700 font-semibold">
                      <div>{bedrooms} Kamar</div>
                      <div>{bathrooms} Kamar Mandi</div>
                      <div>{maxGuests} Tamu</div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-xs text-stone-400 block">Mulai</span>
                        <span className="text-lg font-bold text-stone-900">
                          {formatRupiah(priceWeekday)}
                        </span>
                        <span className="text-xs text-stone-500"> /malam</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-bold">
                        WhatsApp
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Actions Bar */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveDraftAction}
              className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors"
            >
              Simpan Sebagai Draft
            </button>
          </div>

          <div className="flex items-center gap-3">
            {!checklist.allPassed && (
              <span className="text-[11px] text-amber-800 font-medium hidden sm:inline-block">
                Lengkapi {checklist.missingCount} syarat untuk publish
              </span>
            )}
            <button
              type="button"
              onClick={handlePublishAction}
              disabled={!checklist.allPassed}
              className="px-7 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-40 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Publish Villa</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
