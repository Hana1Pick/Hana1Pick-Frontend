import React from 'react';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/images/alarm/close_icon.png';
import './style.scss';

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`nav-bar ${isOpen ? 'open' : ''}`}>
      <div className="nav-header">
        <img src={closeIcon} alt="close" className="close-btn" onClick={onClose} style={{width: "34px"}}/>
      </div>
      {/* // TODO: 알람 페이지로, 알람 내역 가져와서 데이터 변경 필요! */}
      <ul className="nav-links">
        <li>
          <Link to="/" >어쩌구 알림1</Link>
        </li>
        <li>
          <Link to="/ranking" >최애 실시간 랭킹</Link>
        </li>
        <li>
          <Link to="/qr" >QR 송금 만들기</Link>
        </li>
        <li>
          <Link to="/photo">최애와 한 컷</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
