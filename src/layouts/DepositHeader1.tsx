import back from '../assets/images/common/backicon.png';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

interface DepositHeaderProps {
    value: string;
}
function DepositHeader1({ value }: DepositHeaderProps){
  const navigate = useNavigate(); // useNavigate 훅 사용
  const handleBackClick = () => {
    navigate(-1); // 뒤로 가기
  };

    return(
      <div className='commonHeader'>
            <div id="depositHeader1">
            <img className="back" src={back} onClick={handleBackClick} alt="뒤로가기" />
            <div className="title" style={{fontWeight: "500", fontSize: "1.1rem"}}>{value}</div>
            </div>
        </div>
    );
}
export default DepositHeader1;