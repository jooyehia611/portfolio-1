import React, { useEffect, useState } from 'react';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';
import './work.scss';

type Role = {
  title: string;
  company: string;
  period: string;
  bullets: React.ReactNode[];
};

const ROLES: Role[] = [
  {
    title: 'Backend Developer',
    company: 'Myclicx',
    period: 'Feb 2026 – Present',
    bullets: [
      <>Built <strong>Tameer</strong> (CAFM System), a digital facilities and maintenance management platform designed to coordinate operations across multiple sites, buildings, assets, and operational teams.</>,
      'Developed backend workflows for maintenance requests covering issue reporting, technician assignment, execution, review, and final closure.',
      <>Implemented <strong>preventive maintenance scheduling</strong> and <strong>corrective maintenance work orders</strong> to support day-to-day facility operations.</>,
      <>Developed modules for <strong>service level tracking (SLA)</strong>, incident documentation, and work permit management.</>,
      'Built asset, location, building, and team management workflows to centralize facility and maintenance operations.',
      'Developed reporting and performance dashboards providing management with visibility into asset condition, maintenance progress, SLA performance, and team productivity.',
      'Designed scalable backend services and business logic using Laravel to support complex maintenance and facilities-management workflows.',
    ],
  },
  {
    title: 'Backend Developer',
    company: 'RFID Saudi Trading',
    period: 'Dec 2024 – Feb 2026',
    bullets: [
      <>Built a Laravel <strong>procurement management platform</strong> covering purchase requests, RFQs, purchase orders, suppliers, clients, delivery, invoicing, payments, and operational and financial reporting.</>,
      'Developed a Laravel property management platform to manage real-estate records, multi-owner structures, and legal documentation.',
      <>Developed RESTful APIs for the <strong>CarLog mobile application</strong> to manage company vehicles and equipment, including user tracking, odometer monitoring, usage logging, and inspection checklists.</>,
      <>Developed RESTful APIs for a <strong>3PL warehouse and logistics management system</strong> supporting RFID-based warehouse operations, scheduling, user management, reporting, and inbound/outbound logistics.</>,
      'Built a Laravel platform combining a public marketing website with a product catalog.',
      'Developed Python automation scripts to reduce manual workload and improve operational efficiency.',
    ],
  },
  {
    title: 'Full Stack Web Developer',
    company: 'Triple Agency',
    period: 'Jun 2023 – Dec 2024',
    bullets: [
      'Built a Laravel-based clinic operations platform supporting multi-branch scheduling, reservations, patient intake, billing, revenue reporting, expense tracking, and referral analytics.',
      'Developed a healthcare management platform with admin and clinic dashboards for managing enterprises, clinical staff, patients, appointments, and billing workflows.',
      'Built and maintained multiple WordPress websites with customized themes, plugins, and third-party integrations.',
      'Developed a Laravel-based venue and dining platform with role-based administration for managing reservations, orders, users, and content.',
      <>Implemented secure RESTful APIs using <strong>Laravel Sanctum and JWT authentication</strong>.</>,
      'Developed RESTful APIs for a real-estate platform covering property listings, projects, units, search, filters, developers, districts, OTP authentication, favorites, referrals, wallets, transactions, withdrawals, and provider workflows.',
    ],
  },
  {
    title: 'Backend Developer',
    company: 'Medicamall',
    period: 'Jul 2022 – Jun 2023',
    bullets: [
      <>Developed and customized an e-commerce platform using <strong>Magento 2</strong> for an online medical store.</>,
      'Handled Magento theme customization, product management, integrations, and performance optimization.',
      'Developed and customized an additional Magento 2 e-commerce platform for surgical instruments and medical supplies.',
    ],
  },
  {
    title: 'Full Stack Web Developer — Freelancer',
    company: '',
    period: 'Feb 2021 – Present',
    bullets: [
      <>Built a Laravel <strong>multi-vendor marketplace</strong> for on-demand ordering and delivery.</>,
      'Implemented vendor and admin workflows including catalog management, POS, orders, delivery zones, delivery staff, wallets, and marketing campaigns.',
      'Developed Passport-based APIs and integrated multiple payment gateways, Firebase, Twilio SMS, and real-time technologies including Reverb and Pusher.',
      'Built a Laravel multi-branch platform for freelancers and clients covering orders, transfers, CRM lead sources, referrals, commissions, revenue, dues, and profit dashboards.',
      'Developed a Laravel sports management system covering memberships, payments, facilities, attendance, permissions, and real-time device integrations.',
      <>Built a Laravel platform and RESTful APIs for <strong>Umrah and Hajj booking</strong>, including packages, reservations, confirmations, invoices, accommodations, transportation, meals, agents, and commissions.</>,
      <>Developed <strong>Eyadty</strong>, a modular Laravel healthcare platform for managing clinic and dental practice operations.</>,
    ],
  },
];

const Work = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const [activeRole, setActiveRole] = useState(0);
  const nameArray = [...'02. Work Experience'];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  const role = ROLES[activeRole];

  return (
    <section className='work' id='work'>
      <span className='sectiontag'>&lt;section&gt;</span>
      <h1 className='about__headingPrimary'>
        <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
      </h1>
      <p className='work__lede'>
        Backend and full-stack engineer delivering scalable Laravel platforms, secure REST APIs, and high-impact e-commerce solutions across healthcare, logistics, and enterprise domains.
      </p>
      <div className='work__experience'>
        <div className='work__roleList' role='tablist' aria-label='Work experience'>
          {ROLES.map((item, index) => (
            <button
              type='button'
              role='tab'
              id={`work-tab-${index}`}
              aria-controls='work-panel'
              aria-selected={activeRole === index}
              tabIndex={activeRole === index ? 0 : -1}
              className={`work__role${activeRole === index ? ' work__role--active' : ''}`}
              key={`${item.company}-${item.period}`}
              onClick={() => setActiveRole(index)}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
                event.preventDefault();
                const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
                const next = (index + direction + ROLES.length) % ROLES.length;
                setActiveRole(next);
                document.getElementById(`work-tab-${next}`)?.focus();
              }}
            >
              <span className='work__roleCompany'>{item.company || 'Freelance'}</span>
              <span className='work__rolePeriod'>{item.period}</span>
            </button>
          ))}
        </div>
        <div className='work__panel' id='work-panel' role='tabpanel' aria-labelledby={`work-tab-${activeRole}`} tabIndex={0}>
          <div className='work__panelHead'>
            <div>
              <span className='work__panelLabel'>Experience / {String(activeRole + 1).padStart(2, '0')}</span>
              <h2 className='work__title'>{role.title}</h2>
              <p className='work__company'>{role.company || 'Independent practice'}</p>
            </div>
            <span className='work__period'>{role.period}</span>
          </div>
          <ul className='work__bullets'>
            {role.bullets.map((bullet, index) => <li key={`${role.company}-${index}`}>{bullet}</li>)}
          </ul>
        </div>
      </div>
      <span className='sectiontag'>&lt;/section&gt;</span>
    </section>
  );
};

export default Work;
