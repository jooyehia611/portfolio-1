import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: Project } = await vite.ssrLoadModule('/src/components/Projects/Projects.tsx');
  const html = renderToStaticMarkup(React.createElement(Project));
  const visibleCards = (html.match(/class="project__card"/g) || []).length;
  if (visibleCards !== 8 || !html.includes('Elsawady') || html.includes('Failed to fetch')) {
    throw new Error(`Expected 8 project cards with Elsawady; found ${visibleCards}.`);
  }
  console.log(`Rendered ${visibleCards} project cards without fetching data.`);
} finally {
  await vite.close();
}
