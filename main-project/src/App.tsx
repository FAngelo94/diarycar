import { useState } from 'react';
import { CarIcon } from './components/CarIcon';
import { EntriesTable } from './components/EntriesTable';
import { EntryForm } from './components/EntryForm';
import { useEntries, type EntryInput } from './hooks/useEntries';
import type { Entry } from './types';

export default function App() {
  const { entries, addEntry, updateEntry, removeEntry, clearEntries } = useEntries();
  const [editingId, setEditingId] = useState<string | null>(null);

  const editing = entries.find((entry) => entry.id === editingId) ?? null;

  function handleSubmit(input: EntryInput) {
    if (editing) {
      updateEntry(editing.id, input);
      setEditingId(null);
    } else {
      addEntry(input);
    }
  }

  function handleDelete(entry: Entry) {
    if (!confirm('Eliminare questa registrazione?')) return;
    if (editingId === entry.id) setEditingId(null);
    removeEntry(entry.id);
  }

  function handleClearAll() {
    if (!entries.length) return;
    if (!confirm('Eliminare tutte le registrazioni?')) return;
    setEditingId(null);
    clearEntries();
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'car-maintenance.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="wrap">
      <header>
        <h1>
          <CarIcon />
          Diario Manutenzione Auto
        </h1>
        <div className="subtitle">Dati salvati localmente</div>
      </header>

      <EntryForm
        editing={editing}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingId(null)}
        onClearAll={handleClearAll}
        onExport={handleExport}
      />

      <EntriesTable
        entries={entries}
        onEdit={(entry) => setEditingId(entry.id)}
        onDelete={handleDelete}
      />

      <footer>Pagina autonoma — persistente tramite localStorage.</footer>
    </div>
  );
}
