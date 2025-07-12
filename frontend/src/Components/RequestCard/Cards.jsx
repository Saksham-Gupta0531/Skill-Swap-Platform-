import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.css';
import { isAuthenticated } from '../utils/auth';

const Cards = ({ userData }) => {
  const navigate = useNavigate();

  const defaultData = {
    id: 0,
    name: "Joe Wills",
    profilePhoto: "Profile Photo",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["ReactJS", "Graphic Designer"],
    rating: "4.0/5"
  };

  const data = userData || defaultData;

  const handleClick = () => {
    if (isAuthenticated()) {
      navigate(`/card/${data.id}`, { state: { userData: data } });
    } else {
      navigate('/Auth');
    }
  };

  return (
    <div className='CardsMaindiv' onClick={handleClick}>
      <div className="Cardsdiv">
        <div className="profilePhoto">
          <div className='CircleShape'>
            <div className='Profiltitle'>{data.profilePhoto}</div>
            <div className="edit">
              <i className="ri-edit-2-line"></i>
            </div>
          </div>
        </div>
        <div className="nameSkill">
          <div className="userName">{data.name}</div>

          <div className="skillsSection">
            <span className="skillLabel">Skills Offered →</span>
            <div className="skillTags">
              {data.skillsOffered.map((skill, index) => (
                <span key={index} className="skillTag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="skillsSection">
            <span className="skillWantedLabel">Skill Wanted →</span>
            <div className="skillTags">
              {data.skillsWanted.map((skill, index) => (
                <span key={index} className="skillTag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="Requestbtn">
          <button className="requestButton">Request</button>
          <div className="rating">
            <div className="ratingLabel">Rating</div>
            <div className="ratingValue">{data.rating}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
