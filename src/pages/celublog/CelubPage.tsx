import React from 'react';
import axios from 'axios';
import bgImg from '../../assets/images/celub/CelubBack.png';
import logo from '../../assets/images/celub/heart.png'; 
import CommonBtn from '../../components/button/CommonBtn';
import './CelublogStyle.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18next import
import '../../i18n'; // i18n 설정 파일 import

interface Language {
  nativeName: string;
}

const lngs: { [key: string]: Language } = { // 언어 구분을 위한 객체
  en: { nativeName: 'English' },
  ko: { nativeName: '한국어' },
  ch: { nativeName: '中文' }
};

const CelubPage: React.FC = () => {
    const userIdx = localStorage.getItem("userIdx");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // useTranslation hook 선언

    const selectCelub = () => {
        axios.get(`${process.env.REACT_APP_BESERVERURI}/api/celub/list`, {
            params: {
                userIdx: userIdx
            }
        }).then((res) => {
            console.log("최애리슽", res.data.data);
            navigate('/celub/search', { state: res.data.data });
        }).catch((error) => {
            alert("실패");
        });
    }

    return (
        <div className="celubBox">
            <div id="celubBox1">
                <div id="celubContainer">
                    <img id="celubBgImg" src={bgImg} alt="Background" />
                    <div id="celubLogo">
                        <img src={logo} alt="Logo" />
                        <h2>{t('title')}</h2>
                        <h4>{t('subtitle')}</h4>
                    </div>
                </div>
            </div>
            <div id="celubBox2">
                <p>{t('description')}</p>
                <CommonBtn type='pink' value={t('startButton')} onClick={selectCelub} />
                <div>
                  {Object.keys(lngs).map((lng) => (
                    <button
                      key={lng}
                      style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
                      type="button"
                      onClick={() => i18n.changeLanguage(lng)}
                    >
                      {lngs[lng].nativeName}
                    </button>
                  ))}
                </div>
            </div>
        </div>
    )
}

export default CelubPage;
