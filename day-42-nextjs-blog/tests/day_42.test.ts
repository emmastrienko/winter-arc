import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { parseMarkdownPost } = mod;

describe('Day 42: Markdown Blog Parser', () => {
  it('extracts metadata and body from markdown files', () => {
    const raw = `---
title: "Mastering Next.js"
slug: "mastering-nextjs"
---
Welcome to the App Router guide!`;

    const post = parseMarkdownPost(raw);
    expect(post.title).toBe('Mastering Next.js');
    expect(post.slug).toBe('mastering-nextjs');
    expect(post.body).toBe('Welcome to the App Router guide!');
  });
});
