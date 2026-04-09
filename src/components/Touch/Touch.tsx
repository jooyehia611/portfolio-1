import React, { useState, useEffect } from 'react';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
import './touch.scss';

const CONTACTS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+20 112 322 3217',
    href: 'https://wa.me/201123223217',
    icon: 'whatsapp',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'yousefyehia159@gmail.com',
    href: 'mailto:yousefyehia159@gmail.com',
    icon: 'mail',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'yousef-yehia-3809b9269',
    href: 'https://www.linkedin.com/in/yousef-yehia-3809b9269/',
    icon: 'linkedin',
  },
] as const;

const Touch = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const nameArray = [...'Get In Touch'];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
  });
  return (
    <section className='sec' id='contact'>
      <div className='touch'>

        <label htmlFor='touchLabel' className='touch__label'>05. What&apos;s next?</label>
        <h1 className='touch__headingPrimary'>
          <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
        </h1>
        <p className='touch__description'>
          I am open to backend and full-stack Laravel roles, API-heavy products, and ecommerce platforms. If you want to talk architecture, integrations, or a new build, send a message—I typically reply within a couple of days.
        </p>
        <div className='touch__contacts'>
          {CONTACTS.map((c) => (
            <a key={c.id} href={c.href} target='_blank' rel='noreferrer' className='touch__contactCard'>
              <span className='touch__contactIcon' aria-hidden>
                {c.icon === 'mail' ? (
                  <svg className='touch__contactIconSvg touch__contactIconSvg--mail' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9z' />
                    <path d='M4 7l8 6 8-6' />
                  </svg>
                ) : (
                  <svg className='touch__contactIconSvg touch__contactIconSvg--brand' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <use href={`/icons/symbol-defs.svg#icon-${c.icon}`} />
                  </svg>
                )}
              </span>
              <span className='touch__contactText'>
                <span className='touch__contactLabel'>{c.label}</span>
                <span className='touch__contactValue'>{c.value}</span>
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>

  );
};

export default Touch;
