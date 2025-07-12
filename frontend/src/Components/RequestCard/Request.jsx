import React, { useState } from 'react';
import './Request.css';

const Request = ({ onClose, onSubmit, mySkills = [], theirSkills = [] }) => {
  const [selectedMySkill, setSelectedMySkill] = useState('');
  const [selectedTheirSkill, setSelectedTheirSkill] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ selectedMySkill, selectedTheirSkill, message });
    onClose(); // Close modal after submit
  };

  return (
    <div className="requestOverlay">
      <div className="requestModal">
        <form onSubmit={handleSubmit}>
          <label>Choose one of your offered skills</label>
          <select
            required
            value={selectedMySkill}
            onChange={(e) => setSelectedMySkill(e.target.value)}
          >
            <option value="" disabled>Select skill</option>
            {mySkills.map((skill, i) => (
              <option key={i} value={skill}>{skill}</option>
            ))}
          </select>

          <label>Choose one of their wanted skills</label>
          <select
            required
            value={selectedTheirSkill}
            onChange={(e) => setSelectedTheirSkill(e.target.value)}
          >
            <option value="" disabled>Select skill</option>
            {theirSkills.map((skill, i) => (
              <option key={i} value={skill}>{skill}</option>
            ))}
          </select>

          <label>Message</label>
          <textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="submitBtn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Request;
