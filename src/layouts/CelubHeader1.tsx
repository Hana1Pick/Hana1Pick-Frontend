import arrow from'../assets/images/celub/arrow.png';
import { useNavigate } from 'react-router-dom';

function CelubHeader1(){
    const navigate = useNavigate(); // useNavigate 훅 사용
    const handleBackClick = () => {
      navigate(-1); // 뒤로 가기
    };
    return(
        <>
            <div id="celubHeader1">
                <img id="arrow_loc" src={arrow} onClick={handleBackClick}/>
            </div>
        </>
    );
}
export default CelubHeader1;