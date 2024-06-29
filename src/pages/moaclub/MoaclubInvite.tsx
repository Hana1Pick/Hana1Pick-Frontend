import Header from "../../layouts/MoaclubHeader1";
import CommonBtn from "../../components/button/CommonBtn";
import inviteIcon from "../../assets/images/moaclub/inviteicon.png";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { MoaclubContext } from "../../contexts/MoaclubContextProvider";

function MoaclubInvite() {
  const navigate = useNavigate();
  

  const userName = localStorage.getItem("name") as string;
  const { moaclub }: any = useContext(MoaclubContext);

  const next = () => {
    
  };

  return(
    <>
      <Header value="모아클럽" disabled={false}/>
      <div className="content">
        <h4 className="inviteTxt">함께할 멤버들에게<br/>
        초대장을 보내보세요.</h4>
      </div>
      
      <img className="inviteIcon" alt="invite-icon" src={inviteIcon} onClick={shareToKakao} />
      <div className="buttonContainerInvite">
        <div className="bubble">
          모임원을 초대한 뒤<br/> 버튼을 눌러주세요😊
        </div>
        <CommonBtn type='black' value="다음" onClick={next} disabled={false}/>
      </div>
    </>
  )

  function shareToKakao() {
    const description = `${userName}님이 모아클럽에 초대했어요.`;
    const url = 'http://localhost:3000/moaclub/join/' + moaclub;
    console.log(url);
  
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY_SY);
    }
  
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
        content: {
          title: '하나1픽 모아클럽',
          description: description,
          imageUrl:
            'https://ifh.cc/g/9vWPh9.png',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: '모아클럽 바로가기',
            link: {
              mobileWebUrl: url,
              webUrl: 'http://localhost:3000/moaclub/join/' + moaclub,
            },
          }
        ],
      });
  }
}

export default MoaclubInvite;