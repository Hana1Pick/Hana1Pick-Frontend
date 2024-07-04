import axios from 'axios';
import bgImg from '../../assets/images/celub/CelubBack.png';
import logo from '../../assets/images/celub/heart.png'; 
import CommonBtn from '../../components/button/CommonBtn';
import './CelublogStyle.scss';
import { useNavigate } from 'react-router-dom';
function CelubPage(){
    const userIdx = localStorage.getItem("userIdx");
    const navigate = useNavigate();
    const selectCelub = () =>{
        axios.get(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list`,{
            params:{
                userIdx:userIdx
            }
        }).then((res)=>{
            console.log("최애리슽",res.data.data);
            navigate('/celub/search', {state:res.data.data})
        }).catch((error)=>{
            alert("실패");
        });
    }

    return(
            <div className="celubBox">
                <div id="celubBox1">
                    <div id="celubContainer">
                        <img id="celubBgImg" src={bgImg}/>
                        <div id="celubLogo">
                            <img src={logo}/>
                            <h2>셀럽로그</h2>
                            <h4>최애와 함께 저축습관 들이기</h4>
                        </div>
                    </div>
                </div>
                <div id="celubBox2">
                    <h3>셀럽로그에서 내 최애 응원해요😍</h3>
                    <CommonBtn type='pink' value='셀럽로그 시작하기' onClick={selectCelub} />
                </div>
            </div>
    )
}
export default CelubPage;