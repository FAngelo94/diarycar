import type { Entry } from '../types';

export const STORAGE_KEY = 'carMaintenanceDiary.entries';

export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Legge le voci da localStorage tollerando i dati scritti dalla versione HTML,
 * che non avevano né `id` né `createdAt`.
 */
export function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item): Entry => {
      const entry = item as Partial<Entry>;
      return {
        id: entry.id ?? createId(),
        kilometers: Number(entry.kilometers ?? 0),
        date: entry.date ?? '',
        details: entry.details ?? '',
        createdAt: entry.createdAt ?? new Date().toISOString(),
        ...(entry.updatedAt ? { updatedAt: entry.updatedAt } : {}),
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function saveEntries(entries: Entry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error(e);
  }
}
