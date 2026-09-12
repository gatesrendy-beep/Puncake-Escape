export interface Villa {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  location: {
    area: 'Tugu Selatan' | 'Cisarua' | 'Puncak Pass' | 'Megamendung';
    district: string;
    city: string;
    postalCode: string;
    distanceFromJakarta?: string;
    googleMapsEmbedUrl?: string;
  };
  pricePerNightWeekday: number; // in IDR
  pricePerNightWeekend: number; // in IDR
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
