import CreateComplete from "../../assets/images/deposit/CreateComplete.gif";
import { useNavigate } from "react-router-dom";
import CommonBtn from "../../components/button/CommonBtn";

function DepositComplete() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString().replace(/\.$/, "");
  const name = localStorage.getItem("name");
  const next = () => {
    navigate("/");
  };

  return (
    <>
      <div className="completeBox1">
        <div className="completeBox2">
          <img className="MoaImg" src={CreateComplete} alt="moaImg" />
          <div className="textBox1">
            <p>입출금통장</p>
            <p>개설완료</p>
          </div>
        </div>
      </div>
      <div className="completeBox3">
        <div className="tableBox">
          <table className="completeInfo">
            <tr>
              <th>출금계좌</th>
              <td colSpan={2}>{name} 의 입출금 계좌</td>
            </tr>
            <tr>
              <th>이체한도</th>
              <td colSpan={2}>1일 최대 200만원</td>
            </tr>
            <tr>
              <th>가입일</th>
              <td colSpan={2}>{currentDate}</td>
            </tr>
          </table>
        </div>
        <div className="buttonContainer">
          <CommonBtn type="pink" value="완료" onClick={next} disabled={false} />
        </div>
      </div>
    </>
  );
}

export default DepositComplete;
