import { LocationProvider, LocationResult } from './types';

/**
 * MockLocationProvider
 * 
 * Phase 1 Provider:
 * Extracts villa metadata directly from the pasted Google Maps URL
 * without requiring any Google Places API key or external network calls.
 * 
 * Simply stores the pasted URL as `googleMapsUrl`.
 */
export class MockLocationProvider implements LocationProvider {
  readonly name = 'MockLocationProvider';

  async resolve(url: string): Promise<LocationResult> {
    const trimmed = (url || '').trim();
    if (!trimmed) {
      throw new Error('URL Google Maps tidak boleh kosong.');
    }

    // 1. Extract place name from URL path or query
    let name = '';
    const placePathMatch = trimmed.match(/\/place\/([^/@?]+)/);
    if (placePathMatch && placePathMatch[1]) {
      name = decodeURIComponent(placePathMatch[1].replace(/\+/g, ' '));
    } else {
      const qMatch = trimmed.match(/[?&]q=([^&]+)/);
      if (qMatch && qMatch[1]) {
        name = decodeURIComponent(qMatch[1].replace(/\+/g, ' '));
      }
    }

    // Clean common administrative noise in URL names
    if (name) {
      name = name
        .replace(/(,?\s*Jawa Barat.*$)|(,?\s*Kabupaten Bogor.*$)|(,?\s*Kec\..*$)/i, '')
        .trim();
    }

    if (!name || name.toLowerCase() === 'place' || name.toLowerCase().includes('maps.app')) {
      name = 'Villa Privat di Puncak';
    }

    // 2. Extract coordinates if present: /@-6.7023,106.9532,17z
    let lat = -6.7023;
    let lng = 106.9532;
    const coordMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      lat = parseFloat(coordMatch[1]);
      lng = parseFloat(coordMatch[2]);
    }

    // 3. Extract Place ID or generate deterministic local ID
    const chijMatch = trimmed.match(/(ChIJ[a-zA-Z0-9_-]{20,})/);
    const placeIdMatch = trimmed.match(/place_id=([a-zA-Z0-9_-]+)/i);
    const placeId = chijMatch
      ? chijMatch[1]
      : placeIdMatch
      ? placeIdMatch[1]
      : `mock_puncak_${Math.abs(Math.round(lat * 10000))}_${Math.abs(Math.round(lng * 10000))}`;

    // 4. Resolve Puncak area
    let area = 'Tugu Selatan';
    const lowerUrl = trimmed.toLowerCase();
    const lowerName = name.toLowerCase();
    if (lowerUrl.includes('cisarua') || lowerName.includes('cisarua')) {
      area = 'Cisarua';
    } else if (lowerUrl.includes('megamendung') || lowerName.includes('megamendung')) {
      area = 'Megamendung';
    } else if (
      lowerUrl.includes('tugu') ||
      lowerName.includes('tugu') ||
      lowerUrl.includes('gunung mas') ||
      lowerName.includes('gunung mas')
    ) {
      area = 'Tugu Selatan';
    }

    const formattedAddress = `${name}, ${area}, Kec. Cisarua, Kabupaten Bogor, Jawa Barat 16750`;

    // 5. Store exact pasted URL as `googleMapsUrl`
    const googleMapsUrl = trimmed.startsWith('http')
      ? trimmed
      : `https://maps.google.com/?q=${encodeURIComponent(name)}`;

    return {
      placeId,
      name,
      formattedAddress,
      area,
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      latitude: lat,
      longitude: lng,
      rating: 4.88,
      userRatingCount: 24,
      googleMapsUrl,
      phoneNumber: '0813-4926-7683',
      websiteUri: '',
      photos: [],
    };
  }
}
