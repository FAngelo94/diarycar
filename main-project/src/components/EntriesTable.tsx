import type { Entry } from '../types';
import { formatDateDisplay, formatKm } from '../utils/format';

interface EntriesTableProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

export function EntriesTable({ entries, onEdit, onDelete }: EntriesTableProps) {
  return (
    <section className="list">
      <div className="card">
        {entries.length > 0 ? (
          <table aria-live="polite">
            <thead>
              <tr>
                <th>Data</th>
                <th>Km</th>
                <th>Dettagli</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <div>{formatDateDisplay(entry.date)}</div>
                    {entry.updatedAt && (
                      <div className="muted small">
                        modificato {formatDateDisplay(entry.updatedAt.split('T')[0])}
                      </div>
                    )}
                  </td>
                  <td>{formatKm(entry.kilometers)}</td>
                  <td>{entry.details}</td>
                  <td className="actionsCell">
                    <button
                      type="button"
                      className="btn-icon"
                      title="Modifica"
                      onClick={() => onEdit(entry)}
                    >
                      ✏️ Modifica
                    </button>
                    <button
                      type="button"
                      className="btn-icon delete"
                      title="Elimina"
                      onClick={() => onDelete(entry)}
                    >
                      🗑️ Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty">Nessuna registrazione ancora.</div>
        )}
      </div>
    </section>
  );
}
