import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CardDetail.css';
import Navbar from '../Navbar/Navbar.jsx'
import Request from './Request';

const CardDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const user = location.state?.userData;

    if (!user) {
        return <div className="notFound">User not found</div>;
    }

    {
        showModal && (
            <Request
                mySkills={["React", "Python"]}  // replace with real data
                theirSkills={user.skillsWanted} // from card data
                onClose={() => setShowModal(false)}
                onSubmit={(formData) => {
                    console.log("Request submitted:", formData);
                    // You can call API here
                }}
            />
        )
    }

    return (
        <div className='CarddetailMaindiv'>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="detailWrapper animate-slide-in">
                <button className="backBtn" onClick={() => navigate(-1)}>← Back</button>

                <div className="detailCard">
                    <div className="leftSection">
                        <button onClick={() => setShowModal(true)}>Request</button>
                        <h2>{user.name}</h2>
                        <div className="section">
                            <h4>Skills Offered:</h4>
                            <ul>{user.skillsOffered.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
                        </div>
                        <div className="section">
                            <h4>Skills Wanted:</h4>
                            <ul>{user.skillsWanted.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
                        </div>
                        <div className="section">
                            <h4>Rating & Feedback:</h4>
                            <p>{user.rating}</p>
                        </div>
                    </div>

                    <div className="rightSection">
                        <div className="profileCircle">
                            <span>Profile Photo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;
