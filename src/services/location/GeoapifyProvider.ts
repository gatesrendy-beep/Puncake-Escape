import { LocationProvider, LocationResult } from './types';

/**
 * GeoapifyProvider
 * 
 * TODO: Phase 2 - Alternative location data provider when external API keys are configured.
 */
export class GeoapifyProvider implements LocationProvider {
  readonly name = 'GeoapifyProvider';

  constructor(private apiKey?: string) {}

  async resolve(_url: string): Promise<LocationResult> {
    if (!this.apiKey) {
      throw new Error('GeoapifyProvider: API key postponed to Phase 2. Use MockLocationProvider.');
    }
    throw new Error('GeoapifyProvider integration is scheduled for Phase 2.');
  }
}
