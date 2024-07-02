import React from "react";
import "../../common/styles/scss/CommonStyle.scss";
import "./DepositStyle.scss";
import Logo from "../../assets/images/common/Logo.png";
import Default from "../../assets/images/deposit/CreateDeposit.jpg";
import { useNavigate } from "react-router-dom";

function DepositCreation1() {
  const navigate = useNavigate();

  const handleButtonClick = () => navigate("/deposit2");

  return (
    <>
      <div className="image-container">
        <div className="image1-container">
          <img src={Logo} />
        </div>
        <div className="image2-container">
          <button className="button2-container" onClick={handleButtonClick}>
            <img src={Default} />
          </button>
        </div>
      </div>
    </>
  );
}

export default DepositCreation1;
