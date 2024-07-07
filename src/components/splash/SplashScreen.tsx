import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.scss';
import animationGif from '../../assets/images/splash/loading.GIF';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1초 후 로그인/가입 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/user/login');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <img src={animationGif} alt="Loading animation" className="animation" />
    </div>
  );
};

export default SplashScreen;
