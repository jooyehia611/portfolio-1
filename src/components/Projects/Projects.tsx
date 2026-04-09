import React, { useState, useEffect } from 'react';
import './projects.scss';
import LazyLoad from 'react-lazyload';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';

type ProjectCategory = 'company' | 'freelance';
type ProjectItem = {
  title: string;
  image: string;
  imageAlt: string;
  summary: string;
  tags: string[];
  category: ProjectCategory;
};

const PROJECT_CARDS: ProjectItem[] = [
  {
    title: 'Procurement Platform',
    image: '/images/procurement.png',
    imageAlt: 'Procurement platform dashboard',
    summary: 'End-to-end procurement platform for RFQs, purchase orders, suppliers, invoicing, and reporting to streamline approvals and reduce manual operations.',
    tags: ['Laravel', 'MySQL', 'REST APIs'],
    category: 'company',
  },
  {
    title: 'Warehouse & Logistics (3PL)',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Warehouse and logistics operations',
    summary: 'RFID-aware 3PL workflows with APIs for inbound/outbound operations, scheduling, and operational reporting.',
    tags: ['Laravel', 'RFID', 'REST APIs'],
    category: 'company',
  },
  {
    title: 'Clinic & Healthcare Suite',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Healthcare technology concept',
    summary: 'Multi-branch clinic system covering scheduling, patient intake, billing, and analytics across operations teams.',
    tags: ['Laravel', 'MySQL', 'Dashboards'],
    category: 'company',
  },
  {
    title: 'Medica Mall',
    image: '/images/medicamall.png',
    imageAlt: 'Medica Mall Magento 2 online medical store',
    summary:
      'E-commerce platform using Magento 2 for an online medical store. Handled theme customization, product management, and performance optimization.',
    tags: ['Magento 2', 'E-commerce', 'Medical'],
    category: 'company',
  },
  {
    title: 'Souq Alat',
    image: '/images/souqalat.png',
    imageAlt: 'Souq Alat surgical instruments and medical supplies storefront',
    summary:
      'E-commerce platform using Magento 2 for a surgical instruments and medical supplies store.',
    tags: ['Magento 2', 'E-commerce', 'Medical Supplies'],
    category: 'company',
  },
  {
    title: 'Multi-vendor Marketplace',
    image: '/images/xshop.png',
    imageAlt: 'Marketplace operations and order management',
    summary: 'On-demand ordering and delivery platform with vendor/admin workflows, payment gateways, Firebase, Twilio SMS, and realtime updates.',
    tags: ['Laravel', 'APIs', 'Realtime'],
    category: 'freelance',
  },
  {
    title: 'Real Estate Product',
    image: '/images/real.png',
    imageAlt: 'Real estate listings platform',
    summary: 'Listings and broker-focused platform with search, OTP auth, favorites, referrals, wallet flows, and Sanctum-secured APIs.',
    tags: ['Laravel', 'REST APIs', 'Sanctum'],
    category: 'company',
  },
  {
    title: 'Umrah & Hajj Booking',
    image: '/images/haj.png',
    imageAlt: 'Travel booking and package management',
    summary: 'Package booking and operations system with approvals, accommodation, transport, meal planning, agents, and commissions.',
    tags: ['Laravel', 'Booking', 'Backoffice'],
    category: 'freelance',
  },
  {
    title: 'Eyadty (Healthcare)',
    image: '/images/misrmodern.png',
    imageAlt: 'Eyadty healthcare platform screenshot',
    summary: 'Modular clinic and dental practice platform centralizing day-to-day clinical and administrative workflows.',
    tags: ['Laravel', 'Healthcare', 'Operations'],
    category: 'freelance',
  },
  {
    title: 'Property Management Platform',
    image: '/images/property.png',
    imageAlt: 'Property management records dashboard',
    summary: 'Web app for real-estate record management, multi-owner structures, and legal documentation in one centralized system.',
    tags: ['Laravel', 'Real Estate', 'Backoffice'],
    category: 'company',
  },
  {
    title: 'CarLog APIs',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Fleet and vehicle tracking dashboard',
    summary: 'REST APIs for company vehicles and equipment including user tracking, odometer monitoring, usage logs, and inspection checklists.',
    tags: ['REST APIs', 'Laravel', 'Fleet'],
    category: 'company',
  },
  {
    title: 'Freelancers/Clients Multi-branch Platform',
    image: '/images/easylist.png',
    imageAlt: 'Freelancers and clients multi-branch platform dashboard',
    summary: 'Platform for orders, transfers, referral/commission workflows, lead-source CRM, and financial dashboards for revenue and net profit.',
    tags: ['Laravel', 'CRM', 'Dashboards'],
    category: 'freelance',
  },
  {
    title: 'Sports Membership System',
    image: '/images/sportclub.png',
    imageAlt: 'Sports facility membership and access control',
    summary: 'Membership lifecycle and facility operations system with permissioned admin console, payments, and token-authenticated mobile APIs for attendance/access.',
    tags: ['Laravel', 'APIs', 'Access Control'],
    category: 'freelance',
  },
  {
    title: 'Fitness Pioneers',
    image: '/images/fitnesspioneers.png',
    imageAlt: 'Fitness Pioneers training and consulting platform',
    summary:
      'Fitness Pioneers is a leading organization in sports training and consulting, specializing in developing fitness professionals through accredited programs in sports science and personal training, in collaboration with international bodies such as the American College of Sports Medicine and American Council on Exercise.',
    tags: ['Sports Training', 'Consulting', 'Accredited Programs'],
    category: 'company',
  },
  {
    title: 'Venue & Dining Platform',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Venue booking and dining reservations',
    summary: 'Role-based admin platform for reservations, orders, users, and content with secure APIs (Sanctum/JWT) from auth to checkout.',
    tags: ['Laravel', 'Sanctum/JWT', 'Reservations'],
    category: 'company',
  },
];

const Project = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const nameArray = [...'03. My Projects'];
  const initialVisibleCount = 8;

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
  });

  useEffect(() => {
    if (!selectedProject) return () => {};

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProject]);

  const visibleProjects = showAll ? PROJECT_CARDS : PROJECT_CARDS.slice(0, initialVisibleCount);
  return (
    <div className='project' id='projects'>
      <h1 className='about__headingPrimary'>
        <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
      </h1>
      <p className='project__lede'>
        Interactive 3D project showcase across company and freelance work. Hover any card to reveal stack, context, and delivery focus.
      </p>

      <div className='project__deck'>
        {visibleProjects.map((card, index) => (
          <LazyLoad once height={330} key={card.title}>
            <article className='project__card' style={{ animationDelay: `${index * 55}ms` }}>
              <button
                type='button'
                className='project__cardMedia'
                onClick={() => setSelectedProject(card)}
                aria-label={`Open ${card.title} image`}
              >
                <img className='project__cardImage' src={card.image} alt={card.imageAlt} />
              </button>
              <div className='project__cardBody'>
                <div className='project__cardTop'>
                  <h3 className='project__title'>{card.title}</h3>
                </div>
                <p className='project__summary'>{card.summary}</p>
                <div className='project__tags'>
                  {card.tags.map((tag) => (
                    <span key={`${card.title}-${tag}`} className='project__tagBadge'>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </LazyLoad>
        ))}
      </div>

      {PROJECT_CARDS.length > initialVisibleCount && (
        <div className='project__actions'>
          <button type='button' className='project__showMore' onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'Show Less' : `Show More (${PROJECT_CARDS.length - initialVisibleCount})`}
          </button>
        </div>
      )}

      {selectedProject && (
        <div className='project__modalOverlay' role='presentation' onClick={() => setSelectedProject(null)}>
          <div
            className='project__modal'
            role='dialog'
            aria-modal='true'
            aria-label={`${selectedProject.title} image preview`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type='button'
              className='project__modalClose'
              aria-label='Close image preview'
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <img className='project__modalImage' src={selectedProject.image} alt={selectedProject.imageAlt} />
            <p className='project__modalCaption'>{selectedProject.title}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Project;
