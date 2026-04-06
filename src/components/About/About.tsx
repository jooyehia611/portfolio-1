import React, { useEffect, useState } from 'react';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
import './about.scss';

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const nameArray = [...'01. About Me'];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
  });
  return (
    <div className='about' id='about'>
      <div className='about__left'>
        <span className='sectiontag'>&lt;section&gt;</span>
        <h1 className='about__headingPrimary'>
          <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
        </h1>
        <div className='about__description'>
          Hello! My name is
          {' '}
          <span className='about__link'>Yousef Yehia Abd Elnaby</span>
          . I am a backend developer with solid experience in building and maintaining scalable web applications using PHP and
Laravel, with additional expertise in Magento 2 and WordPress systems. Proven ability to develop secure APIs,
optimize database performance, and refactor legacy code to improve efficiency and maintainability. Experienced in
Agile environments, collaborating with cross-functional teams to deliver high-quality solutions on time. Strong focus
on clean architecture, performance optimization, and creating reliable backend services that support modern web
applications.

          <br />
          <br />
          Bachelor&apos;s in Computer Science,
          {' '}
          <a href='https://www.o6u.edu.eg/' target='_blank' rel='noreferrer' className='intro__link'>6th of October University</a>
          {' '}
          (2022). Here are technologies and practices I use regularly:
          {' '}
          <br />
          <ul className='about__skillsList'>
            <li className='about__skillsItems'>PHP &amp; Laravel</li>
            <li className='about__skillsItems'>REST APIs</li>
            <li className='about__skillsItems'>MySQL</li>
            <li className='about__skillsItems'>Git</li>
            <li className='about__skillsItems'>Magento 2</li>
            <li className='about__skillsItems'>WordPress</li>
            <li className='about__skillsItems'>Python</li>
            <li className='about__skillsItems'>Agile &amp; clean architecture</li>
            <li className='about__skillsItems'>Server management</li>
            <li className='about__skillsItems'>Frontend Development</li>

          </ul>
        </div>
        <span className='sectiontag'>&lt;/section&gt;</span>
      </div>
      <div className='about__right'>
        <div className='stage-cube-cont'>
          <div className='cubespinner'>
            <div className='face1'>
              <svg className='about__icon' role='img' aria-label='Laravel'>
                <use href='icons/symbol-defs.svg#icon-laravel' />
              </svg>
            </div>
            <div className='face2'>
              <svg className='about__icon' role='img' aria-label='PHP'>
                <use href='icons/symbol-defs.svg#icon-php' />
              </svg>
            </div>
            <div className='face3'>
              <svg className='about__icon' role='img' aria-label='React'>
                <use href='icons/symbol-defs.svg#icon-react' />
              </svg>
            </div>
            <div className='face4'>
              <svg className='about__icon' role='img' aria-label='JavaScript'>
                <use href='icons/symbol-defs.svg#icon-javascript' />
              </svg>
            </div>
            <div className='face5'>
              <svg className='about__icon' role='img' aria-label='HTML5'>
                <use href='icons/symbol-defs.svg#icon-html5' />
              </svg>
            </div>
            <div className='face6'>
              <svg className='about__icon' role='img' aria-label='Laravel'>
                <use href='icons/symbol-defs.svg#icon-laravel' />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
