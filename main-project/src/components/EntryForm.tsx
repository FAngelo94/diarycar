import { useEffect, useRef, useState } from 'react';
import type { Entry, EntryDraft } from '../types';
import type { EntryInput } from '../hooks/useEntries';

const EMPTY_DRAFT: EntryDraft = { kilometers: '', date: '', details: '' };

interface EntryFormProps {
  /** Voce in modifica, `null` quando si sta creando una nuova registrazione. */
  editing: Entry | null;
  onSubmit: (input: EntryInput) => void;
  onCancelEdit: () => void;
  onClearAll: () => void;
  onExport: () => void;
}

export function EntryForm({
  editing,
  onSubmit,
  onCancelEdit,
  onClearAll,
  onExport,
}: EntryFormProps) {
  const [draft, setDraft] = useState<EntryDraft>(EMPTY_DRAFT);
  const kmRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editing) {
      setDraft(EMPTY_DRAFT);
      return;
    }
    setDraft({
      kilometers: String(editing.kilometers),
      date: editing.date,
      details: editing.details,
    });
    kmRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [editing]);

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const km = Number(draft.kilometers);
    const details = draft.details.trim();

    if (draft.kilometers === '' || Number.isNaN(km) || km < 0) {
      alert('Inserisci un valore numerico valido per i chilometri.');
      kmRef.current?.focus();
      return;
    }
    if (!draft.date) {
      alert('Seleziona una data.');
      dateRef.current?.focus();
      return;
    }
    if (!details) {
      alert('Aggiungi dettagli sulla manutenzione.');
      detailsRef.current?.focus();
      return;
    }

    onSubmit({ kilometers: km, date: draft.date, details });

    if (!editing) {
      setDraft(EMPTY_DRAFT);
      kmRef.current?.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="km">Chilometri</label>
        <input
          id="km"
          name="kilometers"
          type="number"
          min="0"
          step="1"
          required
          placeholder="es. 12345"
          ref={kmRef}
          value={draft.kilometers}
          onChange={(e) => setDraft((d) => ({ ...d, kilometers: e.target.value }))}
        />
      </div>
      <div>
        <label htmlFor="date">Data</label>
        <input
          id="date"
          name="date"
          type="date"
          required
          ref={dateRef}
          value={draft.date}
          onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
        />
      </div>
      <div className="full">
        <label htmlFor="details">Dettagli</label>
        <textarea
          id="details"
          name="details"
          required
          placeholder="Descrivi la manutenzione o il cambio gomme"
          ref={detailsRef}
          value={draft.details}
          onChange={(e) => setDraft((d) => ({ ...d, details: e.target.value }))}
        />
      </div>
      <div className="full actions">
        <button type="submit" className="btn">
          {editing ? 'Salva modifiche' : 'Aggiungi voce'}
        </button>
        {editing && (
          <button type="button" className="btn ghost" onClick={onCancelEdit}>
            Annulla
          </button>
        )}
        <button type="button" className="btn ghost" onClick={onClearAll}>
          Svuota
        </button>
        <button type="button" className="btn ghost" onClick={onExport}>
          Esporta JSON
        </button>
      </div>
    </form>
  );
}
