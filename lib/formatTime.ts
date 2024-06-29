export default function formatTime(seconds: number): string{
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = String(date.getUTCMinutes()).padStart(2,'0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return hh ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
};