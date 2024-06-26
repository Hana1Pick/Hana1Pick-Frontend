import Header from "../../components/Header";
import CreateComplete from "../../assets/images/CreateComplete.png";
import { useNavigate } from "react-router-dom";

function DepositComplete() {
  const navigate = useNavigate();
  const toMain = () => {
    navigate("/");
  };

  return (
    <>
      <Header value="개설 완료" />
      <div className="container">
        <div className="legal-notice-box">
          <div className="notice-header">
            <label htmlFor="agree-checkbox" className="complete-label">
              <img
                src={CreateComplete}
                alt="createcomplete"
                className="create-complete-img"
              />
              <strong className="bottom">입출금통장 개설완료</strong>
              <div>입출금 통장이 개설되었습니다.</div>
              <div className="bottom">아래의 내용을 확인해주세요.</div>
            </label>
          </div>
          <div className="notice-header2">
            <div className="legal-notice-content">
              <p className="checkbox-text">
                계좌종류
                <div className="notice_text">자유입출금(한도계좌)</div>
              </p>
              <p className="checkbox-text">
                앱 이체한도
                <div className="notice_text">1일 최대 200만원</div>
              </p>
            </div>
          </div>
          <div className="notice-final">
            <div className="to-main" onClick={toMain}>
              메인으로 가기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepositComplete;
