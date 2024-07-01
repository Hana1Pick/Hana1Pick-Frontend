import React from 'react';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/images/main/close_Frame.png';
import './style.scss';

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`nav-bar ${isOpen ? 'open' : ''}`}>
      <div className="nav-header">
        <img src={closeIcon} alt="close" className="close-btn" onClick={onClose} />
      </div>
      {/* // TODO: 페이지에 맞는 라우팅 주소로 변경 필요! */}
      <ul className="nav-links">
        <li>
          <Link to="/" onClick={onClose}>총 자산</Link>
        </li>
        <li>
          <Link to="/ranking" onClick={onClose}>최애 실시간 랭킹</Link>
        </li>
        <li>
          <Link to="/qr" onClick={onClose}>QR 송금 만들기</Link>
        </li>
        <li>
          <Link to="/photo" onClick={onClose}>최애와 한 컷</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
