import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: Project } = await vite.ssrLoadModule('/src/components/Projects/Projects.tsx');
  const { LocaleProvider } = await vite.ssrLoadModule('/src/i18n/Locale.tsx');
  const { projectsAr } = await vite.ssrLoadModule('/src/i18n/projects-ar.ts');
  const { projectDetailsAr } = await vite.ssrLoadModule('/src/i18n/project-details-ar.ts');
  const { default: projectsSnapshot } = await vite.ssrLoadModule('/src/data/projects.json');
  const html = renderToStaticMarkup(React.createElement(Project));
  const arabicHtml = renderToStaticMarkup(React.createElement(LocaleProvider, { initialLocale: 'ar' }, React.createElement(Project)));
  const visibleCards = (html.match(/class="project__entry"/g) || []).length;
  if (visibleCards !== 8 || !html.includes('Elsawady') || html.includes('Failed to fetch')) {
    throw new Error(`Expected 8 project cards with Elsawady; found ${visibleCards}.`);
  }
  if (!arabicHtml.includes('مشاريعي') || !arabicHtml.includes('السوادي')) throw new Error('Arabic project content was not rendered.');
  const missing = projectsSnapshot.data.filter(({ slug }) => !projectsAr[slug] || !projectDetailsAr[slug]);
  if (missing.length) throw new Error(`Missing Arabic copy for: ${missing.map(({ slug }) => slug).join(', ')}`);
  for (const { slug } of projectsSnapshot.data) {
    const detail = projectDetailsAr[slug];
    if (!detail.features.length || [detail.description, detail.challenge, detail.solution, ...detail.features].some((value) => !/[\u0600-\u06ff]/.test(value))) {
      throw new Error(`Incomplete Arabic details for ${slug}.`);
    }
  }
  console.log(`Rendered ${visibleCards} project cards and checked ${projectsSnapshot.data.length} Arabic translations.`);
} finally {
  await vite.close();
}
