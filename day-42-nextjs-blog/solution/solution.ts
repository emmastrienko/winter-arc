export function parseMarkdownPost(raw: string): { title: string; slug: string; body: string } {
  const match = raw.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
  if (!match) {
    return { title: 'Untitled', slug: '', body: raw.trim() };
  }
  const frontmatter = match[1];
  const body = match[2].trim();
  const title = frontmatter.match(/title:\s*"?([^\n"]+)"?/)?.[1] ?? 'Untitled';
  const slug = frontmatter.match(/slug:\s*"?([^\n"]+)"?/)?.[1] ?? '';
  return { title, slug, body };
}
