import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';
import projectsSnapshot from '../../data/projects.json';
import './projects.scss';

type Media = { url: string; alt_text?: string | null } | null;
type NamedItem = { id: number; name?: string; title?: string };
type FeatureGroup = { title: string | null; points: string[] };
type ProjectItem = {
  id: number;
  slug: string;
  title: string;
  short_description: string | null;
  description?: string | null;
  client_name: string | null;
  year: number | string | null;
  cover: Media;
  thumbnail: Media;
  website_url: string | null;
  is_featured?: boolean;
  technologies: NamedItem[];
  services: NamedItem[];
  gallery?: { id: number; url: string; caption: string | null }[];
  challenge?: string | null;
  solution?: string | null;
  key_features?: FeatureGroup[] | null;
};

const configuredApi = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '').replace(/\/api\/v1$/, '');
// InfinityFree free hosting serves a browser challenge instead of JSON to external sites.
const apiBase = configuredApi?.includes('.infinityfreeapp.com') ? '' : configuredApi;
const detailSnapshots = import.meta.glob<{ default: { data: ProjectItem } }>('../../data/details/*.json', { eager: true });

function getSnapshot(path: string): ProjectItem | ProjectItem[] {
  if (!path) return projectsSnapshot.data as ProjectItem[];
  const slug = decodeURIComponent(path.slice(1));
  const detail = detailSnapshots[`../../data/details/${slug}.json`];
  if (!detail) throw new Error(`Project details are unavailable for ${slug}.`);
  return detail.default.data;
}

async function readProjectData(url: string, signal: AbortSignal): Promise<ProjectItem | ProjectItem[]> {
  const response = await fetch(url, {
    headers: { 'Accept-Language': 'en', Accept: 'application/json' },
    signal,
  });
  if (!response.ok) throw new Error(`Could not load projects (HTTP ${response.status}).`);
  const body = await response.json();
  if (!body.success || !body.data) throw new Error('The projects data returned an invalid response.');
  return body.data;
}

async function getProjectData(path: string, signal: AbortSignal): Promise<ProjectItem | ProjectItem[]> {
  if (apiBase) {
    try {
      return await readProjectData(`${apiBase}/api/v1/projects${path}`, signal);
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  return getSnapshot(path);
}

const Project = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const [projects, setProjects] = useState<ProjectItem[]>(projectsSnapshot.data as ProjectItem[]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const initialVisibleCount = 8;

  useEffect(() => {
    const timer = window.setTimeout(() => setLetterClass('text-animate-fast-hover'), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!apiBase) return () => {};
    const controller = new AbortController();
    setLoading(true);
    setError('');
    getProjectData('', controller.signal)
      .then((data) => setProjects(data as ProjectItem[]))
      .catch((cause: Error) => {
        if (!controller.signal.aborted) setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    if (!selectedProject) return () => {};
    const controller = new AbortController();
    const previousOverflow = document.body.style.overflow;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscape);
    setDetailLoading(true);
    setDetailError('');
    setActiveImage(selectedProject.cover?.url || selectedProject.thumbnail?.url || '');
    getProjectData(`/${encodeURIComponent(selectedProject.slug)}`, controller.signal)
      .then((data) => setSelectedProject(data as ProjectItem))
      .catch(() => {
        if (!controller.signal.aborted) setDetailError('More details are unavailable right now.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setDetailLoading(false);
      });
    return () => {
      controller.abort();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEscape);
    };
  // Fetch only when a new project is opened, not when its details replace the summary.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject?.slug]);

  const orderedProjects = [...projects].sort((a, b) => Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)));
  const visibleProjects = showAll ? orderedProjects : orderedProjects.slice(0, initialVisibleCount);
  const selectedImages = selectedProject
    ? [selectedProject.cover?.url || selectedProject.thumbnail?.url, ...(selectedProject.gallery || []).map((item) => item.url)]
      .filter((url): url is string => Boolean(url))
    : [];

  return (
    <section className='project' id='projects'>
      <h1 className='about__headingPrimary'>
        <AnimatedLettersFast letterClass={letterClass} strArray={[...'03. My Projects']} idx={15} />
      </h1>
      <div className='project__intro'>
        <p className='project__lede'>Selected platforms and products built for real operational needs, from enterprise systems to customer-facing experiences.</p>
        <span className='project__count'>{`${String(projects.length).padStart(2, '0')} projects`}</span>
      </div>

      {loading && <p className='project__status' role='status'>Loading projects…</p>}
      {!loading && error && (
        <div className='project__status' role='alert'>
          <p>{error}</p>
          <button type='button' className='project__showMore' onClick={() => setReloadKey((key) => key + 1)}>Try again</button>
        </div>
      )}
      {!loading && !error && projects.length === 0 && <p className='project__status'>No published projects yet.</p>}

      <div className='project__list'>
        {visibleProjects.map((card, index) => {
          const image = card.cover || card.thumbnail;
          const tags = [...card.technologies.map((item) => item.name), ...card.services.map((item) => item.title)].filter(Boolean);
          return (
            <article className='project__entry' key={card.id}>
              <span className='project__number'>{String(index + 1).padStart(2, '0')}</span>
              <button type='button' className='project__cardMedia' onClick={() => setSelectedProject(card)} aria-label={`View ${card.title} details`}>
                {image?.url ? <img className='project__cardImage' src={image.url} alt={image.alt_text || card.title} loading='lazy' /> : <span className='project__imageFallback'>Project image</span>}
              </button>
              <div className='project__cardBody'>
                <div className='project__eyebrow'>
                  <span>{card.is_featured ? 'Featured project' : 'Selected work'}</span>
                  {card.year && <span>{card.year}</span>}
                </div>
                <h3 className='project__title'>{card.title}</h3>
                {card.short_description && <p className='project__summary'>{card.short_description}</p>}
                {tags.length > 0 && <div className='project__tags'>{tags.slice(0, 4).map((tag) => <span key={tag} className='project__tagBadge'>{tag}</span>)}</div>}
                <div className='project__cardActions'>
                  <button type='button' className='project__textButton' onClick={() => setSelectedProject(card)}>View details →</button>
                  {card.website_url && <a href={card.website_url} target='_blank' rel='noopener noreferrer'>Visit website ↗</a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {projects.length > initialVisibleCount && (
        <div className='project__actions'>
          <button type='button' className='project__showMore' onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'Show Less' : `Show More (${projects.length - initialVisibleCount})`}
          </button>
        </div>
      )}

      {selectedProject && createPortal((
        <div className='project__modalOverlay' role='presentation' onClick={() => setSelectedProject(null)}>
          <div className='project__modal' role='dialog' aria-modal='true' aria-label={`${selectedProject.title} details`} onClick={(event) => event.stopPropagation()}>
            <button type='button' className='project__modalClose' aria-label='Close project details' onClick={() => setSelectedProject(null)}>×</button>
            {activeImage && <img className='project__modalImage' src={activeImage} alt={selectedProject.title} />}
            {selectedImages.length > 1 && <div className='project__gallery'>{selectedImages.map((url, index) => <button type='button' className={url === activeImage ? 'project__galleryItem project__galleryItem--active' : 'project__galleryItem'} key={`${url}-${index}`} onClick={() => setActiveImage(url)} aria-label={`Show project image ${index + 1}`}><img src={url} alt='' loading='lazy' /></button>)}</div>}
            <div className='project__modalContent'>
              <h2>{selectedProject.title}</h2>
              {(selectedProject.client_name || selectedProject.year) && <p className='project__meta'>{[selectedProject.client_name, selectedProject.year].filter(Boolean).join(' · ')}</p>}
              <p>{selectedProject.description || selectedProject.short_description}</p>
              {selectedProject.challenge && <div><h3>Challenge</h3><p>{selectedProject.challenge}</p></div>}
              {selectedProject.solution && <div><h3>Solution</h3><p>{selectedProject.solution}</p></div>}
              {selectedProject.key_features && selectedProject.key_features.length > 0 && (
                <section className='project__features' aria-label='Key features'>
                  <h3>Key features</h3>
                  <div className='project__featureGroups'>
                    {selectedProject.key_features.map((group, index) => (
                      <div className='project__featureGroup' key={`${group.title || 'features'}-${index}`}>
                        {group.title && <h4>{group.title}</h4>}
                        <ul>{group.points.map((point, pointIndex) => <li key={`${point}-${pointIndex}`}>{point}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {detailLoading && <p role='status'>Loading details…</p>}
              {detailError && <p role='alert'>{detailError}</p>}
              {selectedProject.website_url && <a href={selectedProject.website_url} target='_blank' rel='noopener noreferrer'>Visit website ↗</a>}
            </div>
          </div>
        </div>
      ), document.body)}
    </section>
  );
};

export default Project;
