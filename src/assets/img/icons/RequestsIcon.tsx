import React from 'react';

const RequestsIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11 3H17C18.1046 3 19 3.89543 19 5V7V17V19C19 20.1046 18.1046 21 17 21H11H5C3.89543 21 3 20.1046 3 19V17V7V5C3 3.89543 3.89543 3 5 3H11Z" stroke="#00140E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 3H17H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H17H11" stroke="#00140E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 12C14 13.6569 12.6569 15 11 15C9.34315 15 8 13.6569 8 12C8 10.3431 9.34315 9 11 9C12.6569 9 14 10.3431 14 12Z" stroke="#00140E" strokeWidth="2" />
    <path d="M7 21C7.42546 18.6928 8.51999 18 11 18C13.48 18 14.5745 18.6425 15 20.9497" stroke="#00140E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default RequestsIcon;