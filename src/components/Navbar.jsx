// components/Navbar.js
import React from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  // These will be fetched from backend in future
  const user = {
    name: 'Anuj Saxena',
    profilePhoto: 'https://via.placeholder.com/40', // Replace with dynamic URL when backend is ready
  };

  const handleProfileClick = () => {
    // You can route to profile page or open a dropdown
    alert('Profile clicked!');
  };

  return (
    <nav className="navbar">
      <h2>Skill Swap Platform</h2>
      <div className="profile-container" onClick={handleProfileClick}>
        <div
          className="profile-photo"
          style={{ backgroundImage: `url('${user.profilePhoto}')` }}
          title="Your Profile"
        ></div>
        <div className="profile-name">{user.name}</div>
      </div>
    </nav>
  );
}
