import { Villa } from '../types';

const STORAGE_KEY = 'puncake_villas_catalog_v2';
const AUTH_KEY = 'puncake_admin_session';

export function getStoredAdminAuth(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === 'authenticated' || localStorage.getItem(AUTH_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function setStoredAdminAuth(authenticated: boolean): void {
  try {
    if (authenticated) {
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
      localStorage.setItem(AUTH_KEY, 'authenticated');
    } else {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (e) {
    console.error('Failed to set auth state:', e);
  }
}

export function getLocalCustomVillas(): Villa[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading local custom villas:', err);
    return [];
  }
}

export function saveLocalCustomVilla(villa: Villa): void {
  try {
    const current = getLocalCustomVillas();
    const index = current.findIndex((v) => v.id === villa.id || (villa.googlePlaceId && v.googlePlaceId === villa.googlePlaceId));
    
    if (index >= 0) {
      current[index] = { ...current[index], ...villa, updatedAt: new Date().toISOString() };
    } else {
      current.unshift(villa);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Error saving local custom villa:', err);
  }
}

export function deleteLocalCustomVilla(id: string): void {
  try {
    const current = getLocalCustomVillas();
    const filtered = current.filter((v) => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error deleting local custom villa:', err);
  }
}
