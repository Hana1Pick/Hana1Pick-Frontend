import Header from "../../layouts/MoaclubHeader1";
import CommonBtn from "../../components/button/CommonBtn";
import inviteIcon from "../../assets/images/moaclub/inviteicon.png";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function MoaclubInvite() {
  const navigate = useNavigate();
  

  const next = () => {
    
  };

  return(
    <>
      <Header value="모아클럽" disabled={false}/>
      <div className="content">
        <h4 className="inviteTxt">함께할 멤버들에게<br/>
        초대장을 보내보세요.</h4>
      </div>
      
      <img className="inviteIcon" src={inviteIcon} onClick={shareToKakao} />
      <div className="buttonContainer">
        <CommonBtn type='black' value="다음" onClick={next} disabled={false}/>
      </div>
    </>
  )
}

function shareToKakao() {
  window.Kakao.Link.sendCustom({
    templateId: 109539,
  });
}

export default MoaclubInvite;