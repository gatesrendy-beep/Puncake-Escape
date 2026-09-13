export type VillaStatus = 'draft' | 'pending_review' | 'published' | 'archived';
export type VerificationStage = 'google_located' | 'reviewed' | 'verified';

export interface Villa {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  whyThisVilla: string; // Concise positioning statement for 2-second decision making
  intentCategory: ('family' | 'heated-pool' | 'mountain-view' | 'gathering' | 'romantic')[];
  location: {
    area: 'Tugu Selatan' | 'Cisarua' | 'Puncak Pass' | 'Megamendung' | string;
    district: string;
    city: string;
    postalCode: string;
    address?: string;
    distanceFromJakarta?: string;
    googleMapsEmbedUrl?: string;
  };
  pricePerNightWeekday: number; // in IDR
  pricePerNightWeekend: number; // in IDR
  securityDeposit?: number; // Transparent refundable deposit
  extraGuestFee?: number; // Per extra guest if applicable
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  recommendedGuests: string;
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[]; // Key selling points
  amenities: {
    hasHeatedPool: boolean;
    hasPrivatePool: boolean;
    hasMountainView: boolean;
    hasBilliard: boolean;
    hasKaraoke: boolean;
    hasBBQ: boolean;
    hasWifi: boolean;
    hasKitchen: boolean;
    hasWaterHeater: boolean;
    hasLargeGarden: boolean;
    hasBasketballOrBadminton: boolean;
    hasSmartTv: boolean;
    hasBonfire: boolean;
    hasVillaAttendant: boolean;
    parkingCapacityCars: number;
    // Additional amenities from Puncake specific list
    hasTeaGardenView?: boolean;
    hasLivingRoom?: boolean;
    hasAirConditioning?: boolean;
    hasGazebo?: boolean;
    hasFirePit?: boolean;
    hasBreakfast?: boolean;
    hasCaretaker24h?: boolean;
    isFamilyFriendly?: boolean;
    isPetFriendly?: boolean;
  };
  description: string;
  highlights: string[];
  bedConfigurations: {
    room: string;
    beds: string;
  }[];
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
  popularFor: 'family' | 'luxury' | 'gathering' | 'romantic';
  isFeatured?: boolean;

  // Lifecycle & Admin Fields
  status?: VillaStatus;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  approvedBy?: string;
  sourcePlaceId?: string;
  googlePlaceId?: string;
  googleMapsUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleRating?: number;
  googleReviewCount?: number;
  googleAttribution?: {
    name?: string;
    uri?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  verificationStage?: VerificationStage;
  whatsappNumber?: string;
}

export interface GooglePlaceImportResult {
  placeId: string;
  name: string;
  formattedAddress: string;
  area: string;
  district: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri: string;
  phoneNumber?: string;
  websiteUri?: string;
  photos?: {
    name: string;
    url: string;
    authorAttribution?: {
      displayName: string;
      uri: string;
    };
  }[];
}

export interface BookingState {
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  specialRequests?: string;
  contactName?: string;
  contactPhone?: string;
}

export interface FilterOptions {
  intent: string; // 'all' | 'family' | 'heated-pool' | 'mountain-view' | 'gathering' | 'romantic'
  area: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minGuests: number;
  onlyHeatedPool: boolean;
  onlyMountainView: boolean;
  hasBilliard: boolean;
  hasKaraoke: boolean;
  searchQuery: string;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'capacity';
}

