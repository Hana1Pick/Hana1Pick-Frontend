import Header from "../../layouts/MoaclubHeader1";
import banner from "../../assets/images/moaclub/moaclub-banner.png";
import righticon from "../../assets/images/common/righticon.png";
import checkicon from "../../assets/images/common/checkicon.png";
import CommonBtn from "../../components/button/CommonBtn";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function MoaclubOpening() {
  const navigate = useNavigate();
  const [allAgreed, setAllAgreed] = useState(false);

  const handleAgreeClick = () => {
    setAllAgreed(!allAgreed);
  };

  const next = () => {
    if (allAgreed) {
      navigate('/moaclub/select-acc');
    }
  };

  return(
      <>
        <Header value="모아클럽" disabled={false}/>
        <div className="content">
          <img className="banner" src={banner} />
        </div>
        
        <div>
          <div className="allAgreeBox">
            <div className={`allAgree ${allAgreed ? 'agreed' : ''}`} onClick={handleAgreeClick}>
              <div className="leftContent">
                <img className="checkicon" src={checkicon} />
                <span>전체 동의</span>
              </div>
              <img className="righticon" src={righticon} />
            </div>
          </div>

          <div className="agreeItems">
            <div className="agreeItem">
              <div className="leftContent">
                <img className="checkicon" src={checkicon} />
                <span>모아클럽 서비스 설명서</span>
              </div>
              <img className="righticon" src={righticon} />
            </div>
            <div className="agreeItem">
              <div className="leftContent">
                <img className="checkicon" src={checkicon} />
                <span>모아클럽 서비스 이용약관</span>
              </div>
              <img className="righticon" src={righticon} />
            </div>
            <div className="agreeItem">
              <div className="leftContent">
                <img className="checkicon" src={checkicon} />
                <span>금융거래정보 제공 동의</span>
              </div>
              <img className="righticon" src={righticon} />
            </div>
          </div>
        </div>

        <div className="buttonContainer">
          <CommonBtn type='black' value="다음" onClick={next} disabled={!allAgreed}/>
        </div>
        
      </>
  )
}

export default MoaclubOpening;