import React from 'react';
import './style.scss';
import bellIcon from "../../assets/images/main/bell_icon.png";
import homeIcon from "../../assets/images/main/home_icon.png";
import userIcon from "../../assets/images/main/user_icon.png";
import qrIcon from "../../assets/images/main/qr_icon.png";
import { useNavigate } from 'react-router-dom';

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <div className="menu-item">
        <img src={homeIcon} alt="home-icon" style={{width: "3rem"}}/>
      </div>
      <div className="menu-item">
        <img src={qrIcon} alt="qr-icon" style={{width: "3.4rem"}}/>
      </div>
      <div className="menu-item">
        <img src={bellIcon} alt="bell-icon" style={{width: "2.5rem"}}/>
      </div>
      <div className="menu-item">
        <img src={userIcon} alt="user-icon" style={{width: "2.5rem"}}/>
      </div>
    </div>
  );
};

export default MenuBar;
