import React from 'react';
import './SwapRequestCard.css';

export default function SwapRequestCard({ request, onAccept, onReject }) {
  return (
    <div className="card custom-layout">
      {/* Left section - Profile */}
      <div className="left-block">
      <div
        className="profile-pic"
        style={{ backgroundImage: `url(${request.profilePic || 'https://via.placeholder.com/120'})` }}
      />

        <div className="user-rating">⭐ {request.rating || '4.5'}</div>
      </div>

      {/* Middle section - Info */}
      <div className="middle-content">
        <div className="user-info">
          <h3>{request.name}</h3>
          <p><span className="label offered">Skills Offered:</span> {request.skillsOffered.join(', ')}</p>
          <p><span className="label wanted">Skills Wanted:</span> {request.skillsWanted.join(', ')}</p>
        </div>
      </div>

      {/* Right section - Status/Buttons aligned with rating */}
      <div className="status-actions">
        <p className={`status ${request.status.toLowerCase()}`}>Status: {request.status}</p>
        {request.status === 'Pending' && (
          <div className="actions">
            <button onClick={() => onAccept(request.id)} className="accept">Accept</button>
            <button onClick={() => onReject(request.id)} className="reject">Reject</button>
          </div>
        )}
      </div>
    </div>
  );
}
