import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';
import React, { useState, useEffect } from 'react';
import './otherProjects.scss';

const OtherProjects = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const nameArray = [...'04. More builds'];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
  });

  const cards = [
    {
      title: 'Multi-vendor marketplace',
      body: 'On-demand ordering and delivery with vendor and admin workflows, Passport-backed APIs, payment gateways, Firebase, Twilio SMS, and realtime updates (Reverb/Pusher).',
      tags: 'Laravel',
    },
    {
      title: 'Real estate product',
      body: 'Laravel and Sanctum APIs for listings, search, OTP auth, favorites, referrals, and wallet flows including transactions, deals, and broker tooling.',
      tags: 'Laravel · REST APIs',
    },
    {
      title: 'Umrah & Hajj booking',
      body: 'Package discovery, booking, confirmations, and invoicing with admin flows for approvals, accommodation, transport, meals, agents, and commissions.',
      tags: 'Laravel · APIs · Booking workflows',
    },
    {
      title: 'Eyadty (healthcare)',
      body: 'Modular clinic and dental practice management: day-to-day clinical and administrative work in one Laravel application.',
      tags: 'Laravel · Healthcare',
    },
    {
      title: 'Magento 2 medical commerce',
      body: 'Customized Magento storefronts for medical and surgical supply catalogs with theme work, catalog management, and performance tuning.',
      tags: 'Magento 2 · E-commerce · PHP',
    },
  ];

  return (
    <div className='other'>
      <span className='sectiontag'>&lt;section&gt;</span>
      <div className='other__container'>
        <h1 className='other__headingPrimary'>
          <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
        </h1>
      </div>

      <ul className='other__list'>
        {cards.map((c) => (
          <li key={c.title} className='other__items'>
            <div className='other__card'>
              <div className='other__cardTop'>
                <svg className='other__cardFolder'>
                  <use href='icons/symbol-defs.svg#icon-folder' />
                </svg>
              </div>
              <div className='other__cardBody'>
                <div className='other__cardBodyHeading'>{c.title}</div>
                <p className='other__cardBodyDescription'>{c.body}</p>
              </div>
              <div className='other__cardFooter'>
                <div className='other__tags'>{c.tags}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <span className='sectiontag'>&lt;/section&gt;</span>
    </div>
  );
};

export default OtherProjects;
