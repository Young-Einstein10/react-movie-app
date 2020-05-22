import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div id="loading-outer-container" className="spinner">
      <div id="loading-inner-container">
        <div id="loadspin">
          <div id="circle1"></div>
          <div id="circle2"></div>
        </div>
      </div>
    </div>
  )
}

export default Spinner
