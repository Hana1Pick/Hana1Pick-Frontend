import arrow from'../assets/images/celub/arrow.png';
import setting from '../assets/images/celub/setting.png';
import { useNavigate } from 'react-router-dom'; 

function CelubHeader2(){
    const navigate = useNavigate(); // useNavigate 훅 사용
    const handleBackClick = () => {
      navigate(-1); // 뒤로 가기
    };
    return(
        <div className='commonHeader'>
            <div id="celubHeader1">
                <img id="arrow_loc" src={arrow} onClick={handleBackClick}/>
                <img id="setting" src={setting}/>
            </div>
        </div>
    );
}
export default CelubHeader2;