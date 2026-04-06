import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
import './touch.scss';

const Touch = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const nameArray = [...'Get In Touch'];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
  });
  return (
    <section className='sec'>
      <span className='sectiontag'>&lt;section&gt;</span>
      <div className='touch'>

        <label htmlFor='touchLabel' className='touch__label'>05. What&apos;s next?</label>
        <h1 className='touch__headingPrimary'>
          <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
        </h1>
        <p className='touch__description'>
          I am open to backend and full-stack Laravel roles, API-heavy products, and ecommerce platforms. If you want to talk architecture, integrations, or a new build, send a message—I typically reply within a couple of days.
        </p>
        <Link to='/contact' className='intro__button'>
          Contact Me
        </Link>

      </div>
      <span className='sectiontag'>&lt;/section&gt;</span>
    </section>

  );
};

export default Touch;
