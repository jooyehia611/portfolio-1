import React, { useEffect, useState } from 'react';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';
import './work.scss';

type Role = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

const ROLES: Role[] = [
  {
    title: 'Backend Developer',
    company: 'RFID Saudi Trading',
    period: 'Dec 2024 – Present',
    bullets: [
      'Laravel procurement platform: purchase requests, RFQs, POs, suppliers, clients, delivery, payments/invoicing, and operational/financial reporting.',
      'Property management web app for real-estate records, multi-owner structures, and legal paperwork.',
      'RESTful APIs for CarLog (fleet tracking, odometer, usage logging, inspection checklists) and a 3PL warehouse system with RFID-based operations.',
      'Public marketing and product catalog site on Laravel; Python automation scripts to reduce manual work.',
    ],
  },
  {
    title: 'Full Stack Web Developer',
    company: 'Triple Agency',
    period: 'Jun 2023 – Dec 2024',
    bullets: [
      'Clinic operations platform: multi-branch scheduling, reservations, patient intake, billing, and referral-source analytics.',
      'Healthcare admin dashboards for enterprises, staff, patients, appointments, and billing; WordPress sites with custom themes and plugins.',
      'Venue and dining platform with role-based admin, reservations, orders, and Sanctum/JWT APIs.',
      'Real estate APIs: listings, search, OTP auth, favorites, referrals, and wallet flows for brokers and end users.',
    ],
  },
  {
    title: 'Backend Developer',
    company: 'Medicamall',
    period: 'Jul 2022 – Jun 2023',
    bullets: [
      'Magento 2 e-commerce for medical and surgical supplies: theme customization, catalog, and performance tuning.',
    ],
  },
  {
    title: 'Full Stack Web Developer (Freelance)',
    company: 'Independent',
    period: 'Feb 2021 – Present',
    bullets: [
      'Multi-vendor marketplace: Laravel, Passport APIs, payments, Firebase, SMS (Twilio), realtime (Reverb/Pusher), modular tax/VAT and AI-related packages.',
      'Multi-branch freelancer/client platform with CRM-style lead sources, referrals, commissions, and financial dashboards.',
      'Umrah/Hajj booking, sport membership/access APIs, and Eyadty (Laravel clinic and dental practice management).',
    ],
  },
];

const Work = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const nameArray = [...'02. Work Experience'];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
  });

  return (
    <div className='work' id='work'>
      <span className='sectiontag'>&lt;section&gt;</span>
      <h1 className='about__headingPrimary'>
        <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
      </h1>
      <p className='work__lede'>
        Backend and full-stack engineer delivering scalable Laravel platforms, secure REST APIs, and high-impact e-commerce solutions across healthcare, logistics, and enterprise domains.
      </p>
      <ol className='work__timeline'>
        {ROLES.map((role) => (
          <li key={`${role.company}-${role.period}`} className='work__item'>
            <div className='work__marker' aria-hidden />
            <div className='work__card'>
              <div className='work__cardHeader'>
                <h2 className='work__title'>{role.title}</h2>
                <span className='work__company'>{role.company}</span>
                <span className='work__period'>{role.period}</span>
              </div>
              <ul className='work__bullets'>
                {role.bullets.map((b, i) => (
                  <li key={`${role.company}-${i}`}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <span className='sectiontag'>&lt;/section&gt;</span>
    </div>
  );
};

export default Work;
