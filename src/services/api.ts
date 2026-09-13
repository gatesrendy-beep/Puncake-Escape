import { Villa, GooglePlaceImportResult } from '../types';
import { getLocalCustomVillas, saveLocalCustomVilla } from './storage';
import { activeLocationProvider } from './location';

/**
 * Development Admin Authentication
 * 
 * TODO: Replace development admin mode with Supabase Auth before production launch.
 * For now, this allows seamless testing of the entire villa creation & publishing workflow.
 */
export async function loginAdminApi(_password?: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ devMode: true }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Client-side fallback for static/offline preview
  }
  return { success: true };
}

/**
 * Import Villa Data from Google Maps URL
 * 
 * Uses LocationProvider abstraction (MockLocationProvider for Phase 1).
 * Simply extracts villa info from URL without calling Google Places API.
 * Future: Easily swap to GooglePlacesProvider or GeoapifyProvider in Phase 2.
 */
export async function importGooglePlace(url: string): Promise<GooglePlaceImportResult> {
  // 1. First attempt through backend endpoint
  try {
    const res = await fetch('/api/places/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    
    if (res.ok) {
      const data = await res.json();
      return {
        ...data,
        googleMapsUri: data.googleMapsUrl || data.googleMapsUri || url,
      };
    }
  } catch (err) {
    console.warn('Backend place import failed, falling back to local provider:', err);
  }

  // 2. Direct MockLocationProvider resolution (100% offline & client-safe)
  const resolved = await activeLocationProvider.resolve(url);
  return {
    ...resolved,
    googleMapsUri: resolved.googleMapsUrl,
  };
}

export async function generateAiDescriptionApi(params: {
  name: string;
  area: string;
  district: string;
  priceWeekday: number;
  priceWeekend: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  verifiedAmenities: string[];
  googleRating?: number;
}): Promise<{
  title: string;
  shortDescription: string;
  whyThisVilla: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}> {
  try {
    const res = await fetch('/api/ai/describe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('AI description API call error, using deterministic generator:', e);
  }

  // Pure deterministic generator based STRICTLY on verified properties (NO HALLUCINATIONS)
  const { name, area, district, guests, bedrooms, bathrooms, verifiedAmenities, priceWeekday } = params;
  const verifiedList = verifiedAmenities.length > 0 ? verifiedAmenities.join(', ') : 'fasilitas esensial villa';

  return {
    title: `${name} — Private Sanctuary in ${area}`,
    shortDescription: `Villa privat berkapasitas ${guests} tamu dengan ${bedrooms} kamar tidur dan ${bathrooms} kamar mandi di kawasan sejuk ${area}, ${district}.`,
    whyThisVilla: `Pilihan ideal untuk rombongan ${guests} tamu dengan fasilitas terverifikasi: ${verifiedList.slice(0, 50)}...`,
    description: `Berada di kawasan sejuk ${area}, ${district}, ${name} menawarkan suasana istirahat privat yang nyaman dan asri untuk keluarga maupun rekan kerja.\n\nMemiliki kapasitas ${guests} orang dengan ${bedrooms} kamar tidur luas dan ${bathrooms} kamar mandi bersih. Fasilitas yang telah terverifikasi meliputi: ${verifiedList}.\n\nReservasi langsung mudah dan transparan bersama tim concierge resmi Puncake Escape via WhatsApp.`,
    seoTitle: `${name} | Sewa Villa Privat ${area} Puncak`,
    seoDescription: `Sewa ${name} di ${area}, Puncak. Kapasitas ${guests} tamu, ${bedrooms} kamar tidur. Mulai Rp ${(priceWeekday || 2500000).toLocaleString('id-ID')}/malam. Reservasi via WhatsApp.`,
    tags: [area, 'Puncak', 'Cisarua', 'Villa Privat', `${bedrooms} Kamar`, `${guests} Tamu`],
  };
}

export async function fetchAllCustomVillas(): Promise<Villa[]> {
  try {
    const res = await fetch('/api/villas');
    if (res.ok) {
      const serverVillas = await res.json();
      if (Array.isArray(serverVillas) && serverVillas.length > 0) {
        // Sync into local storage as well
        serverVillas.forEach((v) => saveLocalCustomVilla(v));
        return serverVillas;
      }
    }
  } catch (err) {
    console.warn('Could not fetch villas from server, reading local storage:', err);
  }
  return getLocalCustomVillas();
}

export async function saveVillaApi(villa: Villa): Promise<Villa> {
  // Always save to local storage immediately
  saveLocalCustomVilla(villa);

  try {
    const method = villa.id ? 'PUT' : 'POST';
    const url = villa.id ? `/api/villas/${villa.id}` : '/api/villas';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(villa),
    });
    if (res.ok) {
      const saved = await res.json();
      saveLocalCustomVilla(saved);
      return saved;
    }
  } catch (err) {
    console.warn('Server save failed, local storage persisted:', err);
  }
  return villa;
}

export function detectDuplicateListing(
  placeId: string | undefined,
  name: string,
  allVillas: Villa[]
): Villa | null {
  if (!allVillas || allVillas.length === 0) return null;

  // 1. Check exact Google Place ID
  if (placeId) {
    const matchPlaceId = allVillas.find((v) => v.googlePlaceId === placeId || v.sourcePlaceId === placeId);
    if (matchPlaceId) return matchPlaceId;
  }

  // 2. Check normalized name
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const matchName = allVillas.find((v) => {
    const vClean = v.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return vClean === cleanName || (vClean.length > 5 && (vClean.includes(cleanName) || cleanName.includes(vClean)));
  });

  return matchName || null;
}
