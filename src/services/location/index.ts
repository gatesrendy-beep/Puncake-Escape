import { LocationProvider } from './types';
import { MockLocationProvider } from './MockLocationProvider';

export * from './types';
export * from './MockLocationProvider';
export * from './GooglePlacesProvider';
export * from './GeoapifyProvider';

/**
 * Active Location Provider
 * 
 * Phase 1: Uses MockLocationProvider (local parsing, no external API keys required).
 * Phase 2: Can be swapped with GooglePlacesProvider or GeoapifyProvider without rewriting the villa system.
 */
export const activeLocationProvider: LocationProvider = new MockLocationProvider();
