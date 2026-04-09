import React from 'react';
import Introduction from 'components/Introduction/Introduction';
import './center.scss';
import About from '@components/About/About';
import Work from '@components/Work/Work';
import Project from '@components/Projects/Projects';
import Touch from '@components/Touch/Touch';

const Center = () => (
  <div>
    <span className='tag'>&lt;body&gt;</span>
    <Introduction />
    <About />
    <Work />
    <Project />
    <Touch />

    <span className='tag'>&lt;/body&gt;</span>
  </div>
);

export default Center;
