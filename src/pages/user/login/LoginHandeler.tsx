import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const LoginHandler = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`;

    axios
      .post(url, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        getUserInfo(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getUserInfo = (accessToken: string) => {
    const url2 = `http://${process.env.REACT_APP_BESERVERURI}/api/user/login`;
    const data = {
      accessToken: accessToken,
    };

    axios
      .get(url2, { params: data })
      .then((response) => {
        console.log(response);
        const { userIdx, name, email, profile } = response.data.data;
        localStorage.setItem('userIdx', userIdx);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('profile', profile); // 프로필 사진 URL 저장

        // 회원가입 일때는 계좌 생성 페이지로 이동
        if (name) {
          navigate('/');
        } else {
          navigate('/deposit');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='LoginHandler'>
      <div className='notice'>
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요...</p>
        <div className='spinner'></div>
      </div>
    </div>
  );
};

export default LoginHandler;
