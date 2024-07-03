import React from "react";
import "./style.scss";
import { To, useNavigate } from "react-router-dom";

import beHomeIcon from "../../assets/images/menubar/b_home.png";
import beQrIcon from "../../assets/images/menubar/b_qr.png";
import beUserIcon from "../../assets/images/menubar/b_my.png";
import beServiceIcon from "../../assets/images/menubar/b_service.png";

const MenuBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  return (
    <div className="menu-bar">
      <div
        className="menu-item home"
        onClick={() => handleNavigate("/")}
      >
        <img src={beHomeIcon} alt="home-icon" style={{ width: "2.5rem" }} />
      </div>
      <div
        className="menu-item qr"
        onClick={() => handleNavigate("qr/cash-in")}
      >
        <img
          src={beQrIcon}
          alt="qr-icon"
          style={{ width: "3rem", marginTop: "0.2rem" }}
        />
      </div>
      <div
        className="menu-item service"
        onClick={() => handleNavigate("/service/")}
      >
        <img
          src={beServiceIcon}
          alt="service-icon"
          style={{ width: "2.5rem", marginTop: "0.2rem" }}
        />
      </div>
      <div
        className="menu-item user"
      >
        <img
          src={beUserIcon}
          alt="user-icon"
          style={{ width: "2.1rem", marginTop: "0.4rem" }}
        />
      </div>
    </div>
  );
};

export default MenuBar;
