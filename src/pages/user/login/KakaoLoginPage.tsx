import Header from "../../../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/common/CircleLogo.png";
import KakaoLoginButton from "../../../assets/images/kakao/kakao_login.png";
import "./style.scss";

const KakaoLoginPage = () => {
const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

 const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <>
      <Header value="로그인" />

      <div className="Container">
        <img
          className="LogoImg"
          src={Logo}
          alt="logo"
          style={{ width: "100px", height: "100px", marginBottom: "60px" }}
        />

        <div className="Description">
          <p>계정과 비밀번호 입력없이</p>
          <p>카카오톡으로 로그인 해보세요.</p>
        </div>

        <a href={KAKAO_AUTH_URL} className="kakaobtn">
          <img
            src={KakaoLoginButton}
            alt="kakao-login-button"
            style={{ height: "50px" }}
          />
        </a>
      </div>
    </>
  );
};

export default KakaoLoginPage;
