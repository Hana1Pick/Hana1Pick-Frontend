import Header from "../../../components/Header";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/common/CircleLogo.png";
import KakaoLoginButton from "../../../assets/images/kakao/kakao_login.png";

import axios from "axios";
import "./style.scss";

const handleLogin = () => {
  const url = `http://${process.env.REACT_APP_BESERVERURI}/api/user/login`;

  axios
    .get(url)
    .then((response) => {
      console.log("로그인 성공~", response.data);
      window.location.href = response.data; // 응답받은 URL로 이동
      // TODO: response 객체의 email로 사용자 정보를 가져와서 회원 유무 판단 백엔드 로직 추가 필요

    })
    .catch((error) => {
      console.error("Login failed:", error);
      // 로그인 실패 시 추가 작업을 여기에 작성
    });
};

function KakaoLoginPage() {
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

        <button className="LoginButton" onClick={handleLogin}>
<img
          src={KakaoLoginButton}
          alt="kakao-login-button"
          style={{ height: "50px" }}
        />
</button>
       
      </div>
    </>
  );
}

export default KakaoLoginPage;
