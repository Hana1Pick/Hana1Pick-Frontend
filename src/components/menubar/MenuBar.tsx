import React, { useState } from "react";
import "./style.scss";
import { To, useNavigate } from "react-router-dom";

import beHomeIcon from "../../assets/images/menubar/b_home.png";
import beQrIcon from "../../assets/images/menubar/b_qr.png";
import beUserIcon from "../../assets/images/menubar/b_my.png";
import beServiceIcon from "../../assets/images/menubar/b_service.png";

import afHomeIcon from "../../assets/images/menubar/a_home.png";
import afQrIcon from "../../assets/images/menubar/a_qr.png";
import afUserIcon from "../../assets/images/menubar/a_my.png";
import afServiceIcon from "../../assets/images/menubar/a_service.png";

const MenuBar = () => {
  const [icons, setIcons] = useState({
    home: beHomeIcon,
    qr: beQrIcon,
    service: beServiceIcon,
    user: beUserIcon,
  });

  const handleMouseEnter = (icon: string) => {
    switch (icon) {
      case "home":
        setIcons((prev) => ({ ...prev, home: afHomeIcon }));
        break;
      case "qr":
        setIcons((prev) => ({ ...prev, qr: afQrIcon }));
        break;
      case "service":
        setIcons((prev) => ({ ...prev, service: afServiceIcon }));
        break;
      case "user":
        setIcons((prev) => ({ ...prev, user: afUserIcon }));
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (icon: string) => {
    switch (icon) {
      case "home":
        setIcons((prev) => ({ ...prev, home: beHomeIcon }));
        break;
      case "qr":
        setIcons((prev) => ({ ...prev, qr: beQrIcon }));
        break;
      case "service":
        setIcons((prev) => ({ ...prev, service: beServiceIcon }));
        break;
      case "user":
        setIcons((prev) => ({ ...prev, user: beUserIcon }));
        break;
      default:
        break;
    }
  };
  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };
  return (
    <div className="menu-bar">
      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter("home")}
        onMouseLeave={() => handleMouseLeave("home")}
      >
        <img src={icons.home} alt="home-icon" style={{ width: "2.5rem" }} />
      </div>
      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter("qr")}
        onMouseLeave={() => handleMouseLeave("qr")}
      >
        <img
          src={icons.qr}
          alt="qr-icon"
          style={{ width: "3rem", marginTop: "0.2rem" }}
        />
      </div>
      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter("service")}
        onMouseLeave={() => handleMouseLeave("service")}
        onClick={() => handleNavigate("/service/")}
      >
        {" "}
        <img
          src={icons.service}
          alt="service-icon"
          style={{ width: "2.5rem", marginTop: "0.2rem" }}
        />
      </div>
      <div
        className="menu-item"
        onMouseEnter={() => handleMouseEnter("user")}
        onMouseLeave={() => handleMouseLeave("user")}
      >
        <img
          src={icons.user}
          alt="user-icon"
          style={{ width: "2.1rem", marginTop: "0.4rem" }}
        />
      </div>
    </div>
  );
};

export default MenuBar;
