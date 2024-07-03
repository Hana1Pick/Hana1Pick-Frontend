import Header from "../../components/Header";
import { To, useNavigate } from "react-router-dom";
import "./style.scss";
import React from 'react';
import rankingBanner from "../../assets/images/service/ranking_baner.png";
import photoBanner from "../../assets/images/service/love_photo_banner.png";
import Realistic from "../../components/confetti/Realistic";

const ServicePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  return (
    <>
      <Header value="상품/서비스" />
      <div className="service-box">        
        <div className="modalBody">
          <img
            src={photoBanner}
            alt="photoBanner"
            style={{ width: "300px", marginBottom: "3rem", cursor: "pointer" }}
            onClick={() => handleNavigate("/photo")}
          />
        </div>
        <div className="modalBody">
          <img src={rankingBanner} alt="rankingBanner" style={{ width: "300px" }} />
        </div>
      </div>
      {/* // 컨페티 */}
      <Realistic />
    </>
  );
};

export default ServicePage;
