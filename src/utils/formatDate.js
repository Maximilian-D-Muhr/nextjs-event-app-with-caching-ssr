export function formatDate(value) {
  try {
    const date = new Date(value);
    // Use fixed locale to avoid hydration mismatch between server and client
    return date.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  } catch {
    return value;
  }
}
