import React, { useEffect, useState } from "react";
import KakaoLoginButton from "../../../assets/images/login/kakao_login.png";
import hanalogoUpside from "../../../assets/images/login/hanalogo_upside.png";
import hanalogoFooter from "../../../assets/images/login/hanalogo_footer.png";
import login_hana1pick_logo from "../../../assets/images/login/login_hana1pick_logo.png";

// 애니메이션 이미지
import p1 from "../../../assets/images/login/p1.png";
import p2 from "../../../assets/images/login/p2.png";
import p3 from "../../../assets/images/login/p3.png";
import p4 from "../../../assets/images/login/p4.png";

import "./KakaoLoginPage.scss";

// 애니메이션
import "../../../assets/scss/_magictime.scss";
import "../../../assets/scss/magic.scss";


const KakaoLoginPage = () => {
  const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({
    p1: false,
    p2: false,
    p3: false,
    p4: false,
  });

  useEffect(() => {
    const elements = [
      {
        selector: ".perspectiveDownReturn",
        animation: "perspectiveDownReturn",
        imageKey: "p3",
      },
      { selector: ".perspectiveUpReturn", animation: "perspectiveUpReturn", imageKey: "p1" },
      {
        selector: ".perspectiveLeftReturn",
        animation: "perspectiveLeftReturn",
        imageKey: "p4",
      },
      {
        selector: ".perspectiveRightReturn",
        animation: "perspectiveRightReturn",
        imageKey: "p2",
      },
    ];

    elements.forEach(({ selector, animation, imageKey }) => {
      const element = document.querySelector(selector);
      if (element && imagesLoaded[imageKey]) {
        setTimeout(() => {
          element.classList.add("magictime", animation);
          element.addEventListener("animationend", () => {
            element.classList.add("shine"); // 애니메이션이 끝나면 shine 클래스 추가
          });
        }, 500); // 애니메이션 시작 시간을 조절
      }
    });
  }, [imagesLoaded]);

  const handleImageLoad = (imageKey: string) => {
    setImagesLoaded((prevState) => ({ ...prevState, [imageKey]: true }));
  };

  return (
    <div className="loginContainer">
      <div className="top-logo">
        <img src={hanalogoUpside} alt="하나은행 로고" />
      </div>
      <div className="login-signup">
        <div className="mid-logo">
          <img src={login_hana1pick_logo} alt="하나원픽 로고" />
        </div>

        <div className="animation-container">
          <div className="perspectiveUpReturn">
            <img src={p1} alt="animation" onLoad={() => handleImageLoad("p1")} style={{ display: imagesLoaded.p1 ? 'block' : 'none' }} />
          </div>
          <div className="perspectiveRightReturn">
            <img src={p2} alt="animation" onLoad={() => handleImageLoad("p2")} style={{ display: imagesLoaded.p2 ? 'block' : 'none' }} />
          </div>
          <div className="perspectiveDownReturn">
            <img src={p3} alt="animation" onLoad={() => handleImageLoad("p3")} style={{ display: imagesLoaded.p3 ? 'block' : 'none' }} />
          </div>
          <div className="perspectiveLeftReturn">
            <img src={p4} alt="animation" onLoad={() => handleImageLoad("p4")} style={{ display: imagesLoaded.p4 ? 'block' : 'none' }} />
          </div>
        </div>
        <div className="buttons">
          <a href={KAKAO_AUTH_URL} className="kakaobtn">
            <img
              src={KakaoLoginButton}
              alt="kakao-login-button"
              style={{ height: "50px", borderRadius: "2rem" }}
            />
          </a>
        </div>
      </div>
      <div className="bottom-logo">
        <img src={hanalogoFooter} alt="하나은행 로고" />
      </div>
    </div>
  );
};

export default KakaoLoginPage;
