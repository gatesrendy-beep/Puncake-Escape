import { Villa } from '../types';

export const WHATSAPP_NUMBER = '6281349267683'; // Official booking concierge
export const WHATSAPP_DISPLAY = '0813-4926-7683';
export const WHATSAPP_DISPLAY_INTL = '+62 813-4926-7683';
export const SOCIAL_HANDLE = '@puncakescapeid';
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/puncakescapeid',
  tiktok: 'https://tiktok.com/@puncakescapeid',
  youtube: 'https://youtube.com/@puncakescapeid',
  whatsapp: 'https://wa.me/6281349267683',
};
export const OFFICE_ADDRESS = 'Jl. Raya Puncak KM 84, Tugu Selatan, Kec. Cisarua, Kabupaten Bogor, Jawa Barat 16750';

export const VILLAS_DATA: Villa[] = [
  {
    id: 'villa-casablanca-tugu',
    name: 'Villa Casablanca Tugu',
    slug: 'villa-casablanca-tugu',
    tagline: 'Private warm infinity pool overlooking Mt. Gede Pangrango',
    whyThisVilla: 'Pilihan utama keluarga besar yang mencari kolam air hangat privat & panorama luas Gunung Gede Pangrango.',
    intentCategory: ['family', 'heated-pool', 'mountain-view', 'gathering'],
    location: {
      area: 'Tugu Selatan',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '90 menit via Tol Jagorawi',
    },
    pricePerNightWeekday: 3450000,
    pricePerNightWeekend: 4750000,
    securityDeposit: 500000,
    extraGuestFee: 75000,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 25,
    recommendedGuests: '15 - 22 Guests',
    rating: 4.95,
    reviewCount: 48,
    isFeatured: true,
    popularFor: 'family',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Heated Infinity Pool', 'Billiard & Table Tennis', 'BBQ Pavilion', 'Full Mountain View'],
    amenities: {
      hasHeatedPool: true,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: true,
      hasKaraoke: true,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: true,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 8
    },
    description: 'Perched gracefully on the breezy hills of Tugu Selatan, Villa Casablanca offers panoramic views of Mount Gede Pangrango wrapped in morning mist. Features a temperature-regulated heated infinity swimming pool so you and your family can swim comfortably day or night in the cool Puncak air. Spacious lawn for outbound activities, professional 9-ft billiard table, karaoke lounge, and a dedicated 24-hour on-site villa caretaker team.',
    highlights: [
      'Unobstructed 180-degree view of tea plantation valleys & Mount Gede',
      'Private heated pool (30°C - 32°C) perfect for cold mountain evenings',
      'Dedicated BBQ gazebo with charcoal grill and outdoor dining seating',
      'Located above the heavy traffic choke points with alternative village route access'
    ],
    bedConfigurations: [
      { room: 'Master Bedroom 1 (Ground Fl)', beds: '1 King Bed + 1 Single Bed + Ensuite Bath' },
      { room: 'Bedroom 2 (Ground Fl)', beds: '2 Queen Beds + Ensuite Bath' },
      { room: 'Bedroom 3 (Upper Fl)', beds: '1 King Bed + Balcony with Valley View' },
      { room: 'Bedroom 4 (Upper Fl)', beds: '2 Queen Beds + Ensuite Bath' },
      { room: 'Bedroom 5 (Upper Fl)', beds: '6 Extra Floor Mattresses / Dorm Style' }
    ],
    houseRules: [
      'Check-in 14:00 WIB, Check-out 12:00 WIB',
      'Non-halal items & loud sound systems outside past 22:00 are prohibited',
      'Pets allowed with prior approval in outdoor garden only',
      'Free 19L mineral water gallons and LPG gas provided'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'the-glasshouse-puncak',
    name: 'The Glasshouse Sanctuary',
    slug: 'the-glasshouse-sanctuary',
    tagline: 'Modern architectural masterpiece nestled in Cisarua tea hills',
    whyThisVilla: 'Pilihan utama pencinta estetika modern kontemporer dengan dinding kaca tinggi berlatar bukit teh & private heated plunge pool.',
    intentCategory: ['family', 'heated-pool', 'mountain-view', 'romantic'],
    location: {
      area: 'Cisarua',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '85 menit dari Gerbang Tol Ciawi',
    },
    pricePerNightWeekday: 4100000,
    pricePerNightWeekend: 5800000,
    securityDeposit: 500000,
    extraGuestFee: 100000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 16,
    recommendedGuests: '8 - 14 Guests',
    rating: 4.98,
    reviewCount: 36,
    isFeatured: true,
    popularFor: 'luxury',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Panoramic Glass Walls', 'Warm Plunge Pool', 'Fireplace Lounge', 'Fiber WiFi 100Mbps'],
    amenities: {
      hasHeatedPool: true,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: true,
      hasKaraoke: false,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: false,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 6
    },
    description: 'Designed for discerning travelers who appreciate modernist architecture. The Glasshouse features 6-meter-high double-glazed floor-to-ceiling windows overlooking private tea slopes and pine groves. Cozy up by the indoor fireplace lounge or enjoy an outdoor heated plunge pool with built-in jacuzzi jets. High-speed 100 Mbps fiber optic internet makes it ideal for executive workations or tranquil family gatherings.',
    highlights: [
      'Stunning modern glass aesthetic with abundant natural sunlight & mist views',
      'Semi-indoor heated jacuzzi plunge pool overlooking private pine trees',
      'Chef-grade open kitchen complete with microwave, oven, and espresso machine',
      'Complimentary campfire wood bundle for evening bonfire gathering'
    ],
    bedConfigurations: [
      { room: 'Suite 1 (Glass Corner)', beds: '1 King Bed + Freestanding Soak Tub' },
      { room: 'Suite 2 (Garden View)', beds: '1 King Bed + Ensuite Bath' },
      { room: 'Suite 3 (Loft)', beds: '2 Queen Beds + Mountain View' },
      { room: 'Bedroom 4', beds: '2 Single Twin Beds' }
    ],
    houseRules: [
      'Check-in 14:00, Check-out 12:00',
      'Strictly non-smoking inside the glass pavilion (smoking permitted in patio)',
      'Respect the tranquil surrounding nature; no loud amplifiers',
      'Security deposit of Rp 500.000 upon arrival (fully refundable at checkout)'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'villa-pine-forest-sanctuary',
    name: 'Villa Pine Forest Chalet',
    slug: 'villa-pine-forest-chalet',
    tagline: 'Warm Scandinavian wooden lodge surrounded by fragrant pine woods',
    whyThisVilla: 'Pilihan terbaik untuk suasana sejuk damai bernuansa kayu Skandinavia, api unggun malam, dan privasi penuh di kelilingi pohon pinus.',
    intentCategory: ['romantic', 'mountain-view', 'family'],
    location: {
      area: 'Tugu Selatan',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '95 menit via Gadog',
    },
    pricePerNightWeekday: 2800000,
    pricePerNightWeekend: 3900000,
    securityDeposit: 500000,
    extraGuestFee: 50000,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 12,
    recommendedGuests: '6 - 10 Guests',
    rating: 4.91,
    reviewCount: 52,
    isFeatured: false,
    popularFor: 'romantic',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Teak Wood Architecture', 'Outdoor Sunken Fire Pit', 'Private Spring Pool', 'Pine Forest Trail'],
    amenities: {
      hasHeatedPool: false,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: false,
      hasKaraoke: false,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: false,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 4
    },
    description: 'An authentic Nordic-inspired chalet built with cured Indonesian teak and volcanic stone. Located in an elevated private enclave in Tugu Selatan where temperatures consistently hover between 17°C and 21°C. Guests love sitting around the sunken outdoor fire pit roasting marshmallows under the stars while listening to the wind whistling through towering pine trees.',
    highlights: [
      'Direct private foot trail leading to secret Tugu pine forest viewpoints',
      'Natural fresh mountain spring swimming pool with timber sundeck',
      'Handcrafted artisan coffee station with local West Java single-origin beans',
      'Serene atmosphere far removed from roadside motorcycle noise'
    ],
    bedConfigurations: [
      { room: 'Loft Bedroom 1', beds: '1 King Bed + Skylight Stargazing Roof' },
      { room: 'Bedroom 2', beds: '1 Queen Bed + Forest View' },
      { room: 'Bedroom 3', beds: '2 Single Beds + 2 Extra Daybeds' }
    ],
    houseRules: [
      'Check-in 14:00, Check-out 12:00',
      'Campfire must be attended and extinguished by caretaker before midnight',
      'Eco-conscious property: please conserve water and minimize plastic'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'villa-kayu-manis-estate',
    name: 'Villa Kayu Manis Grand Estate',
    slug: 'villa-kayu-manis-grand-estate',
    tagline: 'Expansive luxury compound for large family gatherings & company retreats',
    whyThisVilla: 'Pilihan terbaik untuk rombongan besar & arisan keluarga (20-40 tamu) dengan lapangan 2.000m², aula makan besar & akses bus mudah.',
    intentCategory: ['gathering', 'family'],
    location: {
      area: 'Cisarua',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '80 menit via Ciawi',
    },
    pricePerNightWeekday: 5200000,
    pricePerNightWeekend: 7400000,
    securityDeposit: 1000000,
    extraGuestFee: 50000,
    bedrooms: 7,
    bathrooms: 8,
    maxGuests: 40,
    recommendedGuests: '20 - 35 Guests',
    rating: 4.96,
    reviewCount: 64,
    isFeatured: true,
    popularFor: 'gathering',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Olympic Size Pool + Kids Pool', 'Badminton Court', 'Karaoke Hall', 'Large Dining Hall (40 pax)'],
    amenities: {
      hasHeatedPool: false,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: true,
      hasKaraoke: true,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: true,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 14
    },
    description: 'The ultimate private estate in Cisarua for family reunions (arisan keluarga), office outings, and wedding anniversaries. Spans over 3,000 square meters of manicured rolling lawns, featuring a semi-Olympic pool with a secure shallow kids pool, professional badminton court, full karaoke sound system with 2 wireless mics, and parking space for up to 14 MPVs/SUVs or mini buses.',
    highlights: [
      'Enormous 2,000 sqm flat green lawn perfect for family outbound games & fun activities',
      'Separate commercial-size kitchen equipped to cater for 40+ people',
      'Dual pool: deep swimming pool + safe heated water for children',
      'Easy bus & long vehicle access without steep narrow alleys'
    ],
    bedConfigurations: [
      { room: 'Main Villa - Room 1 & 2', beds: '2 King Beds each + Ensuites' },
      { room: 'Main Villa - Room 3 & 4', beds: '2 Queen Beds each + Ensuites' },
      { room: 'Garden Pavilion 5 & 6', beds: '3 Queen Beds total + Ensuites' },
      { room: 'Gathering Hall Dorm 7', beds: '12 Plush Single Mattresses with bedding' }
    ],
    houseRules: [
      'Check-in 14:00, Check-out 12:00',
      'Sound system inside hall allowed until 23:00 WIB',
      'Catering coordination available through villa admin'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'villa-aruna-hillside',
    name: 'Villa Aruna Japandi Hillside',
    slug: 'villa-aruna-japandi-hillside',
    tagline: 'Serene warm Japanese-Scandinavian aesthetics with infinity heated pool',
    whyThisVilla: 'Pilihan utama keluarga pencinta ketenangan minimalis Japandi dengan kolam infinity air hangat 31°C & sunken conversation lounge.',
    intentCategory: ['family', 'heated-pool', 'mountain-view'],
    location: {
      area: 'Tugu Selatan',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '90 menit via jalur alternatif Megamendung',
    },
    pricePerNightWeekday: 3200000,
    pricePerNightWeekend: 4500000,
    securityDeposit: 500000,
    extraGuestFee: 75000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 18,
    recommendedGuests: '10 - 15 Guests',
    rating: 4.97,
    reviewCount: 39,
    isFeatured: true,
    popularFor: 'family',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Heated Pool with Sunken Lounge', 'Tatami Reading Corner', 'Open Concept Kitchen', 'Sunset Ridge View'],
    amenities: {
      hasHeatedPool: true,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: true,
      hasKaraoke: true,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: false,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 6
    },
    description: 'Immerse yourself in tranquil Japandi simplicity. Villa Aruna harmoniously blends light birch timber, tactile linen, and sliding shoji-inspired screens with crisp mountain vistas. The heated infinity pool features a sunken conversation lounge where you can sip warm ginger tea while watching the sun dip behind the Pangrango ridge.',
    highlights: [
      'Modern heated pool with automated warm water control (31°C)',
      'Minimalist zen interior curated for deep rest, mindfulness & aesthetic photography',
      'Custom BBQ stone grill on timber patio overlooking Cisarua valley',
      'Free high-speed WiFi, Netflix 4K on 65-inch Smart TV, and soundbar'
    ],
    bedConfigurations: [
      { room: 'Room 1 (Garden Facing)', beds: '1 King Bed + Ensuite' },
      { room: 'Room 2 (Mountain Facing)', beds: '1 King Bed + Ensuite' },
      { room: 'Room 3 (Tatami Loft)', beds: '2 Queen Futon Beds on raised wood deck' },
      { room: 'Room 4 (Family Quad)', beds: '2 Queen Beds + Ensuite' }
    ],
    houseRules: [
      'Check-in 14:00, Check-out 12:00',
      'No footwear inside wooden floored living areas',
      'Family-focused villa; respect quiet hours after 22:00'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'villa-grand-tea-garden',
    name: 'Villa Grand Gunung Mas View',
    slug: 'villa-grand-gunung-mas-view',
    tagline: 'Direct borders with Gunung Mas tea estate & panoramic paragliding hill views',
    whyThisVilla: 'Pilihan terbaik untuk jalan pagi langsung ke hamparan kebun teh Gunung Mas, kolam air hangat, dan gazebo rooftop.',
    intentCategory: ['family', 'heated-pool', 'mountain-view', 'gathering'],
    location: {
      area: 'Tugu Selatan',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '90 menit',
    },
    pricePerNightWeekday: 3700000,
    pricePerNightWeekend: 5100000,
    securityDeposit: 500000,
    extraGuestFee: 75000,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 26,
    recommendedGuests: '14 - 24 Guests',
    rating: 4.93,
    reviewCount: 42,
    isFeatured: false,
    popularFor: 'family',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622781867-1c5c0d297ffb?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Direct Tea Walk Access', 'Heated Pool', 'Rooftop Gazebo', 'Billiard Table'],
    amenities: {
      hasHeatedPool: true,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: true,
      hasKaraoke: true,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: true,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 8
    },
    description: 'Wake up to the iconic landscape of Puncak tea plantations right at your doorstep. Step out of the backyard directly onto the morning tea walk trails of Gunung Mas. The villa boasts a heated pool overlooking the colorful paragliding flight paths, rooftop viewing tower, and spacious family gathering hall with complete cookware and barbecue gear.',
    highlights: [
      'Step directly into tea gardens for fresh morning walks and family photos',
      'Heated pool with gentle mountain breeze',
      'Covered rooftop gazebo for stargazing and cool evening coffee',
      'Caretaker provides complimentary fresh local tea leaves during stay'
    ],
    bedConfigurations: [
      { room: 'Master Room 1', beds: '1 King Bed + Ensuite' },
      { room: 'Family Room 2', beds: '2 Queen Beds + Ensuite' },
      { room: 'Family Room 3', beds: '2 Queen Beds + Ensuite' },
      { room: 'Mountain Room 4', beds: '1 King Bed' },
      { room: 'Loft Room 5', beds: '4 Single Beds' }
    ],
    houseRules: [
      'Check-in 14:00, Check-out 12:00',
      'Tea plantation area is protected; please do not litter while walking',
      'Quiet hours 22:30 WIB onwards'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'villa-lavender-haven',
    name: 'Villa Lavender Romantic Cottage',
    slug: 'villa-lavender-romantic-cottage',
    tagline: 'Charming European countryside cottage with warm private pool',
    whyThisVilla: 'Pilihan terbaik untuk pasangan atau keluarga kecil (2-6 tamu) yang mendambakan suasana cottage privat dengan kolam plunge hangat dekat Taman Safari.',
    intentCategory: ['romantic', 'heated-pool', 'family'],
    location: {
      area: 'Cisarua',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '85 menit',
    },
    pricePerNightWeekday: 1950000,
    pricePerNightWeekend: 2750000,
    securityDeposit: 500000,
    extraGuestFee: 50000,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    recommendedGuests: '2 - 6 Guests',
    rating: 4.97,
    reviewCount: 31,
    isFeatured: false,
    popularFor: 'romantic',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Heated Plunge Pool', 'Flower Garden Picnic', 'Cozy Romantic Fireplace', 'Complimentary Breakfast'],
    amenities: {
      hasHeatedPool: true,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: false,
      hasKaraoke: false,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: false,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 3
    },
    description: 'An intimate 2-bedroom sanctuary tailored for couples, small families, or peaceful honeymoons. Built in English cottage style with flowering hydrangeas, manicured lavender garden, and a private heated plunge pool. Complete with an intimate picnic setup, cozy fireplace nook, and curated wine glasses.',
    highlights: [
      'Intimate private heated plunge pool surrounded by flowering bushes',
      'Complimentary fresh bakery breakfast basket & local mountain coffee',
      'High privacy: secluded wall enclosure with zero overlooking neighbors',
      '10 minutes drive to Taman Safari Indonesia and Cisarua market'
    ],
    bedConfigurations: [
      { room: 'Master Suite', beds: '1 Plush King Bed with goose-down duvet' },
      { room: 'Garden Bedroom', beds: '1 Queen Bed' }
    ],
    houseRules: [
      'Check-in 14:00, Check-out 12:00',
      'Intended for quiet retreats; no loud music permitted',
      'No smoking indoors'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'villa-senja-panorama',
    name: 'Villa Senja Panorama Cliff',
    slug: 'villa-senja-panorama-cliff',
    tagline: 'Perched on a cliff edge with unobstructed sunset & twinkling Bogor city lights',
    whyThisVilla: 'Pilihan terbaik untuk pengagum golden hour sunset & gemerlap lampu malam dari kolam infinity tebing air hangat.',
    intentCategory: ['family', 'heated-pool', 'mountain-view', 'gathering'],
    location: {
      area: 'Cisarua',
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      distanceFromJakarta: '85 menit',
    },
    pricePerNightWeekday: 3100000,
    pricePerNightWeekend: 4350000,
    securityDeposit: 500000,
    extraGuestFee: 75000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 20,
    recommendedGuests: '10 - 18 Guests',
    rating: 4.94,
    reviewCount: 45,
    isFeatured: false,
    popularFor: 'family',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    features: ['Cliff-Edge Infinity Pool', 'Rooftop Sunset Lounge', 'Billiard Room', 'Karaoke Set'],
    amenities: {
      hasHeatedPool: true,
      hasPrivatePool: true,
      hasMountainView: true,
      hasBilliard: true,
      hasKaraoke: true,
      hasBBQ: true,
      hasWifi: true,
      hasKitchen: true,
      hasWaterHeater: true,
      hasLargeGarden: true,
      hasBasketballOrBadminton: false,
      hasSmartTv: true,
      hasBonfire: true,
      hasVillaAttendant: true,
      parkingCapacityCars: 6
    },
    description: 'Renowned for its breathtaking golden hour views and sparkling city lights at night. Villa Senja Panorama is situated on a safe elevated cliff shelf in Cisarua. Features a heated cantilevered pool, expansive rooftop BBQ deck, and entertainment room with billiards and karaoke.',
    highlights: [
      'Spectacular sunset horizon view followed by evening city lights panorama',
      'Heated pool with glass viewing edge',
      'Spacious rooftop barbecue deck with outdoor sound system',
      'Dedicated standby caretaker ready to assist with coal lighting and dishes'
    ],
    bedConfigurations: [
      { room: 'Bedroom 1 (Upper Cliff)', beds: '1 King Bed + Ensuite' },
      { room: 'Bedroom 2 (Pool Access)', beds: '1 King Bed + Ensuite' },
      { room: 'Bedroom 3 (Garden)', beds: '2 Queen Beds' },
      { room: 'Bedroom 4 (Sunset View)', beds: '2 Queen Beds + Ensuite' }
    ],
    houseRules: [
      'Check-in 14:00, Check-out 12:00',
      'Children must be supervised around cliff fence and pool areas at all times',
      'Respect quiet hours after 22:00'
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  }
];

