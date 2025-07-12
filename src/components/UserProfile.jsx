import React, { useState } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const name = "John Doe"; // Static, non-editable
  const [location, setLocation] = useState("New York");
  const [skillsOffered, setSkillsOffered] = useState(["React", "HTML"]);
  const [skillsWanted, setSkillsWanted] = useState(["Node.js", "Python"]);
  const [availability, setAvailability] = useState("Weekends");
  const [profileStatus, setProfileStatus] = useState("public");

  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const removeSkill = (skill, type) => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((s) => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter((s) => s !== skill));
    }
  };

  const handleSave = () => {
    alert("Profile saved!");
    // Send data to backend
  };

  const handleDiscard = () => {
    alert("Changes discarded.");
    // Reset to original values
  };

  return (
    <div className="profile-container">
      <div className="header">
        <button onClick={handleSave} className="save">Save</button>
        <button onClick={handleDiscard} className="discard">Discard</button>
      </div>

      <div className="profile-body">
        {/* Left Section */}
        <div className="left-section">
          <div className="form-group">
            <label>Name</label>
            <div className="readonly">{name}</div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Skills Offered</label>
            <div className="tag-container">
              {skillsOffered.map((skill, idx) => (
                <span className="tag" key={idx}>
                  {skill}
                  <button className="remove-btn" onClick={() => removeSkill(skill, "offered")}>×</button>
                </span>
              ))}
            </div>
            <div className="skill-input">
              <input
                type="text"
                placeholder="Add a skill"
                value={newSkillOffered}
                onChange={(e) => setNewSkillOffered(e.target.value)}
              />
              <button
                onClick={() => {
                  if (
                    newSkillOffered &&
                    !skillsOffered.includes(newSkillOffered)
                  ) {
                    setSkillsOffered([...skillsOffered, newSkillOffered]);
                    setNewSkillOffered("");
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Availability</label>
            <input value={availability} onChange={(e) => setAvailability(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Profile</label>
            <select value={profileStatus} onChange={(e) => setProfileStatus(e.target.value)}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="photo-upload">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-pic" />
            ) : (
              <div className="profile-placeholder">Profile Photo</div>
            )}
            <div className="file-input">
            <label className="upload-btn">
            Profile Picture
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
            </label>

            </div>  
          </div>

          <div className="form-group">
            <label>Skills Wanted</label>
            <div className="tag-container">
              {skillsWanted.map((skill, idx) => (
                <span className="tag" key={idx}>
                  {skill}
                  <button className="remove-btn" onClick={() => removeSkill(skill, "wanted")}>×</button>
                </span>
              ))}
            </div>
            <div className="skill-input">
              <input
                type="text"
                placeholder="Add a skill"
                value={newSkillWanted}
                onChange={(e) => setNewSkillWanted(e.target.value)}
              />
              <button
                onClick={() => {
                  if (
                    newSkillWanted &&
                    !skillsWanted.includes(newSkillWanted)
                  ) {
                    setSkillsWanted([...skillsWanted, newSkillWanted]);
                    setNewSkillWanted("");
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
