import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Cards.css'

const Cards = ({ userData }) => {
  const defaultData = {
    name: "Joe Wills",
    profilePhoto: "Profile Photo",
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["ReactJS", "Graphic Designer"],
    rating: "4.0/5"
  };

    const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/card/${userData.id}`, { state: { userData } });
  };

  const data = userData || defaultData;

  return (
    <div className='CardsMaindiv' onClick={handleClick}>
        <div className="Cardsdiv">
            <div className="profilePhoto">
                <div className='CircleShape'>
                    <div className='Profiltitle'>{data.profilePhoto}</div>
                </div>
            </div>
            <div className="nameSkill">
                <div className="userName">{data.name}</div>
                
                <div className="skillsSection">
                    <span className="skillLabel">Skills Offered &rarr;</span>
                    <div className="skillTags">
                        {data.skillsOffered.map((skill, index) => (
                            <span key={index} className="skillTag">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="skillsSection">
                    <span className="skillWantedLabel">Skill wanted &rarr;</span>
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
                    <div className="ratingLabel">rating</div>
                    <div className="ratingValue">{data.rating}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cards