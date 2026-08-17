export interface Entry {
  /** Identificativo stabile, usato come chiave React e per modifica/eliminazione. */
  id: string;
  kilometers: number;
  /** Formato ISO `YYYY-MM-DD`, come restituito da `<input type="date">`. */
  date: string;
  details: string;
  createdAt: string;
  updatedAt?: string;
}

/** Valori grezzi del form, prima della validazione. */
export interface EntryDraft {
  kilometers: string;
  date: string;
  details: string;
}
