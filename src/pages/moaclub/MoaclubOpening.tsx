import Header from "../../layouts/MoaclubHeader";
import banner from "../../assets/images/moaclub/moaclub-banner.png";
import righticon from "../../assets/images/common/righticon.png";
import checkicon from "../../assets/images/common/checkicon.png";
import CommonBtn from "../../components/button/CommonBtn";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'

function MoaclubOpening() {
  return(
      <>
        <Header/>
        <div className="content">
          <img className="banner" src={banner} />
        </div>
        
        <div>
          <div className="allAgreeBox">
            <div className="allAgree">
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

        <CommonBtn msg="다음" id="basicBtn1"/>
      </>
  )
}

export default MoaclubOpening;