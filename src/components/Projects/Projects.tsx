import React, { useState, useEffect } from 'react';
import './projects.scss';
import LazyLoad from 'react-lazyload';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';

const imgProcurement = 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80';
const imgLogistics = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';
const imgHealthcare = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';

const Project = () => {
  const [letterClass, setLetterClass] = useState('text-animate-fast');
  const nameArray = [...'03. My Projects'];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-fast-hover');
    }, 4000);
  });
  return (
    <div className='project' id='projects'>
      <span className='sectiontag'>&lt;section&gt;</span>
      <h1 className='about__headingPrimary'>
        <AnimatedLettersFast letterClass={letterClass} strArray={nameArray} idx={15} />
      </h1>

      <LazyLoad once height={400}>
        <section className='project__section'>
          <div className='project__left'>
            <img className='project__img' src={imgProcurement} alt='Team collaborating on procurement software' />
          </div>
          <div className='project__right'>
            <h3 className='project__headingTertiary'>Featured project</h3>
            <h2 className='project__headingSecondary project__headingSecondary--static'>Procurement platform</h2>
            <div className='project__descriptionContainer'>
              <p className='project__description'>
                End-to-end procurement covering RFQs, purchase orders, suppliers, invoicing, and reporting. Built to streamline approvals, reduce manual work, and give finance and operations a single source of truth.
              </p>
              <div className='project__tags project__tags--right'>
                <span className='project__tagBadge'>Laravel</span>
                <span className='project__tagBadge'>MySQL</span>
                <span className='project__tagBadge'>REST APIs</span>
              </div>
            </div>
          </div>
        </section>
      </LazyLoad>
      <LazyLoad once height={400}>
        <section className='project__section'>
          <div className='project__left1'>
            <h3 className='project__headingTertiary'>Featured project</h3>
            <h2 className='project__headingSecondary project__headingSecondary--static'>Warehouse &amp; logistics (3PL)</h2>
            <div className='project__descriptionContainer project__descriptionContainer1'>
              <p className='project__description'>
                RFID-aware 3PL system with RESTful APIs for inbound/outbound flows, scheduling, user roles (representatives and operators), and operational reporting—built to support real warehouse teams and end users.
              </p>
              <div className='project__tags project__tags--left'>
                <span className='project__tagBadge'>Laravel</span>
                <span className='project__tagBadge'>REST APIs</span>
                <span className='project__tagBadge'>Multi-user workflows</span>
              </div>
            </div>
          </div>
          <div className='project__right'>
            <img className='project__img' src={imgLogistics} alt='Warehouse and logistics operations' />
          </div>
        </section>
      </LazyLoad>
      <LazyLoad once height={400}>
        <section className='project__section project__section3'>
          <div className='project__left'>
            <img className='project__img' src={imgHealthcare} alt='Healthcare technology concept' />
          </div>
          <div className='project__right'>
            <h3 className='project__headingTertiary'>Featured project</h3>
            <h2 className='project__headingSecondary project__headingSecondary--static'>Clinic &amp; healthcare suite</h2>
            <div className='project__descriptionContainer'>
              <p className='project__description'>
                Multi-branch clinic operations: scheduling, reservations, patient intake, billing, and analytics. Centralizes day-to-day clinical and admin work so staff spend less time on spreadsheets and more time with patients.
              </p>
              <div className='project__tags project__tags--right'>
                <span className='project__tagBadge'>Laravel</span>
                <span className='project__tagBadge'>MySQL</span>
              </div>
            </div>
          </div>
        </section>
      </LazyLoad>

      <ul className='projectResp__list'>
        <li className='projectResp__items projectResp__items1'>
          <div className='projectResp__card'>
            <div className='projectResp__cardTop'>
              <svg className='projectResp__cardFolder'>
                <use href='icons/symbol-defs.svg#icon-folder' />
              </svg>
            </div>
            <div className='projectResp__cardBody'>
              <div className='projectResp__cardBodyHeading'>Procurement platform</div>
              <p className='projectResp__cardBodyDescription'>
                RFQs, POs, suppliers, invoicing, and reporting with automation to cut manual workload across procurement and finance teams.
              </p>
            </div>
            <div className='projectResp__cardFooter'>
              <div className='projectResp__tags'>
                <span className='projectResp__tagBadge'>Laravel</span>
                <span className='projectResp__tagBadge'>MySQL</span>
                <span className='projectResp__tagBadge'>REST APIs</span>
              </div>
            </div>
          </div>
        </li>
        <li className='projectResp__items  projectResp__items2'>
          <div className='projectResp__card'>
            <div className='projectResp__cardTop'>
              <svg className='projectResp__cardFolder'>
                <use href='icons/symbol-defs.svg#icon-folder' />
              </svg>
            </div>
            <div className='projectResp__cardBody'>
              <div className='projectResp__cardBodyHeading'>Warehouse &amp; logistics (3PL)</div>
              <p className='projectResp__cardBodyDescription'>
                RFID-backed warehousing APIs, scheduling, role-based access, and reporting for inbound and outbound logistics.
              </p>
            </div>
            <div className='projectResp__cardFooter'>
              <div className='projectResp__tags'>
                <span className='projectResp__tagBadge'>Laravel</span>
                <span className='projectResp__tagBadge'>RFID</span>
                <span className='projectResp__tagBadge'>REST APIs</span>
              </div>
            </div>
          </div>
        </li>
        <li className='projectResp__items projectResp__items3'>
          <div className='projectResp__card'>
            <div className='projectResp__cardTop'>
              <svg className='projectResp__cardFolder'>
                <use href='icons/symbol-defs.svg#icon-folder' />
              </svg>
            </div>
            <div className='projectResp__cardBody'>
              <div className='projectResp__cardBodyHeading'>Clinic &amp; healthcare suite</div>
              <p className='projectResp__cardBodyDescription'>
                Multi-branch scheduling, patient records, billing, and referral analytics for clinic operations teams.
              </p>
            </div>
            <div className='projectResp__cardFooter'>
              <div className='projectResp__tags'>
                <span className='projectResp__tagBadge'>Laravel</span>
                <span className='projectResp__tagBadge'>MySQL</span>
                <span className='projectResp__tagBadge'>Dashboards</span>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <span className='sectiontag'>&lt;/section&gt;</span>

    </div>
  );
};

export default Project;
