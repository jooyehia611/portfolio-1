import React from 'react';
import './leftSidebar.scss';

const LINKEDIN_URL = 'https://www.linkedin.com/in/yousef-yehia-3809b9269/';
const WHATSAPP_PHONE = '+201123223217';

const LeftSideBar = () => (
  <div className='left'>
    <main className='left__main'>
      <ul className='left__social'>
        <li className='left__linkItems'>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            className='left__links'
            target='_blank'
            rel='noreferrer'
            aria-label='WhatsApp'
          >
            <svg className='left__icon'>
              <use href='/icons/symbol-defs.svg#icon-whatsapp' />
            </svg>
          </a>
        </li>
        <li className='left__linkItems'>
          <a href={LINKEDIN_URL} target='_blank' rel='noreferrer' className='left__links' aria-label='LinkedIn'>
            <svg className='left__icon'>
              <use href='/icons/symbol-defs.svg#icon-linkedin' />
            </svg>
          </a>
        </li>
      </ul>
      <div className='left__line' />
    </main>
  </div>
);

export default LeftSideBar;
