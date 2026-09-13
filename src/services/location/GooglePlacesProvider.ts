import { LocationProvider, LocationResult } from './types';

/**
 * GooglePlacesProvider
 * 
 * TODO: Phase 2 - Implement Google Places API (New) details resolution when
 * Google Cloud credentials are provided.
 */
export class GooglePlacesProvider implements LocationProvider {
  readonly name = 'GooglePlacesProvider';

  constructor(private apiKey?: string) {}

  async resolve(_url: string): Promise<LocationResult> {
    if (!this.apiKey) {
      throw new Error(
        'GooglePlacesProvider: GOOGLE_PLACES_API_KEY is postponed to Phase 2. Use MockLocationProvider.'
      );
    }
    throw new Error('GooglePlacesProvider integration is scheduled for Phase 2.');
  }
}
