import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/common/CircleLogo.png";
import KakaoLoginButton from "../../../assets/images/kakao/kakao_login.png";
import axios from "axios";
import "./style.scss";

const KakaoLoginPage = () => {
  const [username, setUsername] = useState("");
  const [userIdx, setUserIdx] = useState("");
  const navigate = useNavigate();


const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

 const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//  https://kauth.kakao.com/oauth/authorize?client_id=f6582ba4504f05a707993acfc8a1d548&redirect_uri=http://localhost:3000/api/user/oauth/kakao&response_type=code`;

// http://localhost:3000/api/user/oauth/kakao?code=XJncUcqJ-GRx-eiHQ_UGHIATBcHyIHYgcOvorxPwzQJtet7U1Owv1gAAAAQKPXQRAAABkF1cy4Yicpf3YNJZ6g


  const handleLogin = () => {
     
    const KAKAO_AUTH_URL = `http://${process.env.REACT_APP_BESERVERURI}/api/user/login`;

    axios
    .get(KAKAO_AUTH_URL)
    .then((response) => {
      // response 값이 안나옴 ㅜㅜ
      console.log("로그인 성공" +  response);
      // if(response.data.message == "카카오 로그인 성공"){
      //  console.log("카카오 로그인 성공");
      // }
      window.location.href = response.data; // 응답받은 URL로 이동
  })};
  
  // https://kauth.kakao.com/oauth/authorize?client_id=undefined&redirect_uri=undefined&response_type=code
// https://kauth.kakao.com/oauth/authorize?client_id=2dRfMOBeXknUrSUVvEcI8IkW+4/p1b62TztLehKIZ8BEdqc/oaA067MLJB1uR3vh&redirect_uri=http://localhost:3000/redirect-auth&response_type=code

// https://kauth.kakao.com/oauth/authorize?client_id=2dRfMOBeXknUrSUVvEcI8IkW+4/p1b62TztLehKIZ8BEdqc/oaA067MLJB1uR3vh&redirect_uri=http://localhost:3000/redirect-auth&response_type=code


// https://kauth.kakao.com/oauth/authorize?client_id=2dRfMOBeXknUrSUVvEcI8IkW+4/p1b62TztLehKIZ8BEdqc/oaA067MLJB1uR3vh&redirect_uri=http://localhost:3000/api/user/oauth/kakao&response_type=code


// https://kauth.kakao.com/oauth/authorize?client_id=2dRfMOBeXknUrSUVvEcI8IkW+4/p1b62TztLehKIZ8BEdqc/oaA067MLJB1uR3vh&redirect_uri=http://localhost:3000/api/user/oauth/kakao&response_type=code

  // const handleKakaoCallback = async (code: string) => {
  //   const url = `http://${process.env.REACT_APP_BESERVERURI}/api/user/oauth/kakao?code=${code}`;

  //   try {
  //     const response = await axios.get(url);
  //     const userInfo = response.data.data; // Assuming success result wraps data in a "data" field

  //     console.log("로그인 성공:", userInfo);

  //     // 사용자 정보를 localStorage에 저장
  //     localStorage.setItem("user", JSON.stringify(userInfo));

  //     // 필요한 경우 로그인 후 다른 페이지로 리디렉션
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     // 로그인 실패 시 추가 작업을 여기에 작성
  //   }
  // };

  // // 카카오 로그인 콜백 처리
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const code = params.get("code");
  //   if (code) {
  //     handleKakaoCallback(code);
  //   }
  // }, []);

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
