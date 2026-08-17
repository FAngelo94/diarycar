import { useCallback, useEffect, useState } from 'react';
import type { Entry } from '../types';
import { createId, loadEntries, saveEntries } from '../utils/storage';

export interface EntryInput {
  kilometers: number;
  date: string;
  details: string;
}

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>(() => loadEntries());

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const addEntry = useCallback((input: EntryInput) => {
    setEntries((prev) => [
      { ...input, id: createId(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const updateEntry = useCallback((id: string, input: EntryInput) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, ...input, updatedAt: new Date().toISOString() }
          : entry,
      ),
    );
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clearEntries = useCallback(() => setEntries([]), []);

  return { entries, addEntry, updateEntry, removeEntry, clearEntries };
}
