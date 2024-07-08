import React from 'react';
import './style.scss';
import { useNavigate, useLocation } from 'react-router-dom';

import beHomeIcon from '../../assets/images/menubar/b_home.png';
import beQrIcon from '../../assets/images/menubar/b_qr.png';
import beUserIcon from '../../assets/images/menubar/b_my.png';
import beServiceIcon from '../../assets/images/menubar/b_service.png';
import aHomeIcon from '../../assets/images/menubar/h_home.png';
import aQrIcon from '../../assets/images/menubar/h_qrcode.png';
import aUserIcon from '../../assets/images/menubar/h_my.png';
import aServiceIcon from '../../assets/images/menubar/h_service.png';

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='menu-bar'>
      <div className='menu-item home' onClick={() => navigate('/main')}>
        <img
          src={location.pathname === '/main' ? aHomeIcon : beHomeIcon}
          alt='home-icon'
          style={{ width: '2.5rem' }}
        />
      </div>
      <div className='menu-item qr' onClick={() => navigate('/cash-out/qr')}>
        <img
          src={location.pathname === '/cash-out/qr' ? aQrIcon : beQrIcon}
          alt='qr-icon'
          style={{ width: '3rem', marginTop: '0.2rem' }}
        />
      </div>
      <div className='menu-item service' onClick={() => navigate('/celub/list')}>
        <img
          src={location.pathname === '/celub/list' ? aServiceIcon : beServiceIcon}
          alt='service-icon'
          style={{ width: '2.5rem', marginTop: '0.2rem' }}
        />
      </div>
      <div className='menu-item user' onClick={() => navigate('/user/mypage')}>
        <img
          src={location.pathname === '/user/mypage' ? aUserIcon : beUserIcon}
          alt='user-icon'
          style={{ width: '2.1rem', marginTop: '0.4rem' }}
        />
      </div>
    </div>
  );
};

export default MenuBar;
