import React from 'react';
import './rightSidebar.scss';

const RightSideBar = () => (
  <div className='right'>
    <main className='right__main'>
      <div>
        <a href='mailto:yousefyehia159@gmail.com' className='right__email'>
          <span className='right__emailIcon' aria-hidden>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9z' />
              <path d='M4 7l8 6 8-6' />
            </svg>
          </span>
          <span className='right__emailText'>yousefyehia159@gmail.com</span>
        </a>
      </div>
      <div className='right__line' />
    </main>
  </div>
);

export default RightSideBar;
