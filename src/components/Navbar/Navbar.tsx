import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useLocale } from '../../i18n/Locale';
import './navbar.scss';

const Navbar = () => {
  const { locale, setLocale } = useLocale();
  const ar = locale === 'ar';
  const links = [
    { id: 'about', number: '01', en: 'About', ar: 'عني' },
    { id: 'work', number: '02', en: 'Work', ar: 'الخبرات' },
    { id: 'projects', number: '03', en: 'Projects', ar: 'المشاريع' },
    { id: 'contact', number: '04', en: 'Contact', ar: 'تواصل' },
  ];

  return (
    <nav className='navbar' aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'}>
      <Link to='/' className='navbar__brand' aria-label={ar ? 'الصفحة الرئيسية' : 'Home'}>
        <img alt='' src='/favicon/favicon-32x32.png' className='navbar__img' />
      </Link>

      <div className='navbar__right'>
        <ul className='navbar__list'>
          {links.map((link) => (
            <li className='navbar__items' key={link.id}>
              <HashLink to={`/#${link.id}`} className='navbar__itemsLink'>
                <span className='navbar__itemsLinkNumeric' dir='ltr'>{link.number}.</span>
                <span>{ar ? link.ar : link.en}</span>
              </HashLink>
            </li>
          ))}
        </ul>
        <a href='/Senior Backend Developer (PHP - Laravel).pdf' target='_blank' rel='noreferrer' className='navbar__button'>{ar ? 'السيرة الذاتية' : 'Resume'}</a>
      </div>

      <div className='navbar__language' role='group' aria-label={ar ? 'اختيار اللغة' : 'Choose language'}>
        <svg className='navbar__languageIcon' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <circle cx='12' cy='12' r='9' />
          <path d='M3 12h18M12 3c2.6 2.5 4 5.5 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.5-4-9s1.4-6.5 4-9Z' />
        </svg>
        <button type='button' className={`navbar__languageOption${!ar ? ' navbar__languageOption--active' : ''}`} onClick={() => setLocale('en')} aria-pressed={!ar} lang='en'>EN</button>
        <button type='button' className={`navbar__languageOption${ar ? ' navbar__languageOption--active' : ''}`} onClick={() => setLocale('ar')} aria-pressed={ar} lang='ar'>عربي</button>
      </div>
    </nav>
  );
};

export default Navbar;
