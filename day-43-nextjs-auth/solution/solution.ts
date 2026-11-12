export function validateSessionToken(
  token: string,
  secret: string
): { user: string; role: string } | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, payload, sig] = parts;
  if (sig !== `${header}_${payload}_${secret}`) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64').toString());
    if (data.exp && Date.now() > data.exp) return null;
    return { user: data.sub, role: data.role };
  } catch {
    return null;
  }
}
