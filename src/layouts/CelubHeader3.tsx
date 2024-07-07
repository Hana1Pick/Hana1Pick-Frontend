import arrow from'../assets/images/celub/arrow.png';
import { useNavigate } from 'react-router-dom';

function CelubHeader3({onClick}: {onClick: () => void }){
    const navigate = useNavigate(); // useNavigate 훅 사용
    const handleBackClick = () => {
      navigate(-1); // 뒤로 가기
    };
    return(
        <>
            <div className="celubHeader3">
                <div>
                    <img id="arrow_loc" src={arrow} onClick={handleBackClick}/>
                </div>
                <div>
                    <h4 id="setting" onClick={onClick}>설정</h4>
                </div>
            </div>
        </>
    );
}
export default CelubHeader3;