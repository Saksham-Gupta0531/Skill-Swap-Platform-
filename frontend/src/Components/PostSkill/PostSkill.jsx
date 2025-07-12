import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostSkill.css";

const PostSkill = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [availability, setAvailability] = useState("");
  const [profileStatus, setProfileStatus] = useState("public");

  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    console.log("Access token in PostSkill:", token);

    if (!token) {
      setError("Not logged in. Please login to post your skill.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/accounts/auth/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User Data:", response.data);
        setName(response.data.name || response.data.first_name || "");
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user info. Try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const removeSkill = (skill, type) => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((s) => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter((s) => s !== skill));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setError("Please login first.");
      return;
    }

    if (!imageFile) {
      setError("Please upload a profile image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("availability", availability);
    formData.append("profile_status", profileStatus);
    formData.append("skills_offered", JSON.stringify(skillsOffered));
    formData.append("skills_wanted", JSON.stringify(skillsWanted));
    formData.append("profile_photo", imageFile);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/skills/post-skill/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Skill Post Success:", res.data);
      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to post skill. Please check fields and try again.");
      setSuccess(false);
    }
  };

  const handleDiscard = () => {
    window.location.reload();
  };

  return (
    <div className="ProfileMainDiv">
      <div className="profile-container">
        <div className="header">
          <button onClick={handleSave} className="save">Save</button>
          <button onClick={handleDiscard} className="discard">Discard</button>
        </div>

        {success && <div className="success-message">✔️ Skill posted successfully!</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="profile-body">
          {/* Left Section */}
          <div className="left-section">
            <div className="form-group">
              <label>Name</label>
              <div className="readonly">{name || "Loading..."}</div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
              />
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
                    if (newSkillOffered && !skillsOffered.includes(newSkillOffered)) {
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
              <input
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="e.g., Weekends, Evenings"
              />
            </div>

            <div className="form-group">
              <label>Profile Visibility</label>
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
                    if (newSkillWanted && !skillsWanted.includes(newSkillWanted)) {
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
    </div>
  );
};

export default PostSkill;
