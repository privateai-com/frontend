import React from 'react';

const MyProfileIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15.024 3C19.9452 3 21 4.05476 21 8.976L21 15.024C21 19.9452 19.9452 21 15.024 21L8.976 21C4.05476 21 3 19.9452 3 15.024L3 8.976C3 4.05476 4.05476 3 8.976 3L15.024 3Z" stroke="#00140E" strokeWidth="2" />
    <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="#00140E" strokeWidth="2" />
    <path d="M6 19C6.63819 16.6928 8.27998 16 12 16C15.72 16 17.3618 16.6928 18 19" stroke="#00140E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default MyProfileIcon;
