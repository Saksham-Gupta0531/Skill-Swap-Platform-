import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className='NavbarMaindiv'>
            <div className="leftnav">
                <div className="Navtitle" onClick={() => navigate("/")}>SkillSwap</div>
            </div>
            <div className="rightnav">
                <ul>
                    <li>
                        <button onClick={() => navigate("/postskill")}>Post Skill</button>
                        <button onClick={() => navigate("/Auth")}>Login</button>
                        <button onClick={() => navigate("/profile")}>My Profile</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar