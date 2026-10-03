import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const source = (process.env.PROJECTS_EXPORT_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');
const output = join(process.cwd(), 'public', 'project-data');
const bundledOutput = join(process.cwd(), 'src', 'data');
const mediaDir = join(output, 'media');
const copiedMedia = new Map();

async function readApi(path) {
  const response = await fetch(`${source}/api/v1/projects${path}`, {
    headers: { Accept: 'application/json', 'Accept-Language': 'en' },
  });
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
    throw new Error(`Expected JSON from ${response.url}; received HTTP ${response.status} (${response.headers.get('content-type') || 'unknown type'})`);
  }
  const body = await response.json();
  if (!body.success || !body.data) throw new Error(`Invalid API response from ${response.url}`);
  return body;
}

async function copyImage(url) {
  if (!url) return url;
  if (copiedMedia.has(url)) return copiedMedia.get(url);
  const response = await fetch(url);
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
    throw new Error(`Could not export image: ${url}`);
  }
  const suffix = extname(new URL(url).pathname) || '.img';
  const name = `${createHash('sha256').update(url).digest('hex').slice(0, 16)}${suffix}`;
  await writeFile(join(mediaDir, name), Buffer.from(await response.arrayBuffer()));
  const publicUrl = `/project-data/media/${name}`;
  copiedMedia.set(url, publicUrl);
  return publicUrl;
}

async function localizeProject(project) {
  for (const field of ['cover', 'thumbnail']) {
    if (project[field]?.url) project[field].url = await copyImage(project[field].url);
  }
  if (project.gallery) {
    for (const item of project.gallery) item.url = await copyImage(item.url);
  }
  if (project.related_projects) {
    for (const related of project.related_projects) await localizeProject(related);
  }
  return project;
}

await mkdir(mediaDir, { recursive: true });
await mkdir(join(output, 'details'), { recursive: true });
await mkdir(join(bundledOutput, 'details'), { recursive: true });
const list = await readApi('');
for (const project of list.data) {
  const detail = await readApi(`/${encodeURIComponent(project.slug)}`);
  await localizeProject(project);
  await localizeProject(detail.data);
  const detailJson = JSON.stringify(detail);
  await writeFile(join(output, 'details', `${project.slug}.json`), detailJson);
  await writeFile(join(bundledOutput, 'details', `${project.slug}.json`), detailJson);
}
const listJson = JSON.stringify(list);
await writeFile(join(output, 'projects.json'), listJson);
await writeFile(join(bundledOutput, 'projects.json'), listJson);
console.log(`Exported ${list.data.length} projects and ${copiedMedia.size} images to public/project-data`);
