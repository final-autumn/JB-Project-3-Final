import React from 'react';
import './sidebar.css';

export default class Sidebar extends React.Component {
    render() {
        return (
          <div className='sidebar'>
            <h3>VacatiObserve</h3>
            <div className='down'>
              <div className='arrow'><span className='description'>Select vacation</span></div>
              <div className='arrow'><span className='description'>Tag - Follow</span></div>
              <div className='arrow'><span className='description'>Stay Updated</span></div>
            </div>
          </div>
        );
    }
  }
  