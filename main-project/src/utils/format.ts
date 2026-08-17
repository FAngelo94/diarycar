export function formatKm(n: number): string {
  return Number(n).toLocaleString('it-IT');
}

export function formatDateDisplay(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}
