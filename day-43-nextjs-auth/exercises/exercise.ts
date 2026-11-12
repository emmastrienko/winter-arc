export function validateSessionToken(
  token: string,
  secret: string
): { user: string; role: string } | null {
  // TODO: Implement validateSessionToken
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, payload, sig] = parts;
  if (sig !== `${header}_${payload}_${secret}`) return null;
  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (data.exp && Date.now() > data.exp) return null;
    return { user: data.sub, role: data.role };
  } catch {
    return null;
  }
}
