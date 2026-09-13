export interface LocationResult {
  placeId: string;
  name: string;
  formattedAddress: string;
  area: string;
  district: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  rating: number;
  userRatingCount: number;
  googleMapsUrl: string;
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

export interface LocationProvider {
  readonly name: string;
  resolve(url: string): Promise<LocationResult>;
}
