import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './navbar.scss';
import { useLocale } from '../../i18n/Locale';

const Navbar = () => {
  const { locale, setLocale } = useLocale();
  const ar = locale === 'ar';
  return (
  <nav className='navbar'>
    <div className='navbar__left'>
      <Link to='/' className='navbar__link'>
        <img alt='logo' src='/favicon/favicon-32x32.png' className='navbar__img' />
      </Link>
    </div>
    <div className='navbar__right'>
      <ul className='navbar__list'>
        <li className='navbar__items'>
          <HashLink to='/#about' className='navbar__itemsLink'>
            <span className='navbar__itemsLinkNumeric'>01.</span>
            {ar ? 'عني' : 'About'}
          </HashLink>
        </li>
        <li className='navbar__items'>
          <HashLink to='/#work' className='navbar__itemsLink'>
            <span className='navbar__itemsLinkNumeric'>02.</span>
            {ar ? 'الخبرات' : 'Work'}
          </HashLink>
        </li>
        <li className='navbar__items'>
          <HashLink to='/#projects' className='navbar__itemsLink'>
            <span className='navbar__itemsLinkNumeric'>03.</span>
            {ar ? 'المشاريع' : 'Projects'}
          </HashLink>
        </li>
        <li className='navbar__items'>
          <HashLink to='/#contact' className='navbar__itemsLink'>
            <span className='navbar__itemsLinkNumeric'>04.</span>
            {ar ? 'تواصل' : 'Contact'}
          </HashLink>
        </li>
      </ul>
      <a href='/Senior Backend Developer (PHP - Laravel).pdf' target='_blank' rel='noreferrer' className='navbar__button'>{ar ? 'السيرة الذاتية' : 'Resume'}</a>
    </div>
    <button type='button' className='navbar__language' onClick={() => setLocale(ar ? 'en' : 'ar')} aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'} lang={ar ? 'en' : 'ar'}>{ar ? 'English' : 'العربية'}</button>
  </nav>
  );
};

export default Navbar;
