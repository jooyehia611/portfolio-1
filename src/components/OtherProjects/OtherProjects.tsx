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
      icon: 'commerce',
      title: 'Multi-vendor marketplace',
      body: 'On-demand ordering and delivery with vendor and admin workflows, Passport-backed APIs, payment gateways, Firebase, Twilio SMS, and realtime updates (Reverb/Pusher).',
      tags: 'Laravel',
    },
    {
      icon: 'realestate',
      title: 'Real estate product',
      body: 'Laravel and Sanctum APIs for listings, search, OTP auth, favorites, referrals, and wallet flows including transactions, deals, and broker tooling.',
      tags: 'Laravel · REST APIs',
    },
    {
      icon: 'booking',
      title: 'Umrah & Hajj booking',
      body: 'Package discovery, booking, confirmations, and invoicing with admin flows for approvals, accommodation, transport, meals, agents, and commissions.',
      tags: 'Laravel · APIs · Booking workflows',
    },
    {
      icon: 'healthcare',
      title: 'Eyadty (healthcare)',
      body: 'Modular clinic and dental practice management: day-to-day clinical and administrative work in one Laravel application.',
      tags: 'Laravel · Healthcare',
    },
    {
      icon: 'store',
      title: 'Magento 2 medical commerce',
      body: 'Customized Magento storefronts for medical and surgical supply catalogs with theme work, catalog management, and performance tuning.',
      tags: 'Magento 2 · E-commerce · PHP',
    },
  ];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'commerce':
        return <path d='M3 6h2l2.2 9.2c0.1 0.5 0.5 0.8 1 0.8h7.8c0.5 0 0.9-0.3 1-0.8L19 8H7M9 20a1.2 1.2 0 1 0 0.001 0zM16 20a1.2 1.2 0 1 0 0.001 0z' />;
      case 'realestate':
        return <path d='M3 11.5L12 4l9 7.5M6 10v9h12v-9M10 19v-5h4v5' />;
      case 'booking':
        return <path d='M7 3v3M17 3v3M4 8h16M5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5zM9 12h6M9 15h4' />;
      case 'healthcare':
        return <path d='M12 20s-6.5-4.2-8.5-8A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8.5 5c-2 3.8-8.5 8-8.5 8zM12 9.5v5M9.5 12h5' />;
      case 'store':
        return <path d='M5 8h14l-1 11H6L5 8zM8 8V6a4 4 0 1 1 8 0v2M9 11h6' />;
      default:
        return <path d='M4 6h16v12H4z' />;
    }
  };

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
                <span className='other__cardIconWrap' aria-hidden>
                  <svg className='other__cardIcon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    {renderIcon(c.icon)}
                  </svg>
                </span>
              </div>
              <div className='other__cardBody'>
                <div className='other__cardBodyHeading'>{c.title}</div>
                <p className='other__cardBodyDescription'>{c.body}</p>
              </div>
              <div className='other__cardFooter'>
                <div className='other__tags'>
                  {c.tags.split('·').map((tag) => (
                    <span key={`${c.title}-${tag.trim()}`} className='other__tagBadge'>{tag.trim()}</span>
                  ))}
                </div>
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
