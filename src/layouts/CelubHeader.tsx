import arrow from'../assets/images/celub/arrow.png';
import { useNavigate } from 'react-router-dom';

interface CelubHeaderProps {
    value: string;
}
function CelubHeader({ value }: CelubHeaderProps){
    const navigate = useNavigate(); // useNavigate 훅 사용
    const handleBackClick = () => {
      navigate(-1); // 뒤로 가기
    };
    return(
        <>
            <div id="celubHeader1">
                <img className="back" src={arrow} onClick={handleBackClick}/>
               
                <div className="title" style={{fontWeight: "500", fontSize: "1.1rem"}}>{value}</div>
            </div>
        </>
    );
}
export default CelubHeader;