import { useLocation, useNavigate } from 'react-router-dom';
import checkImg from '../../assets/images/celub/celubAcc.gif';
import "./CelublogStyle.scss";
import qs from 'qs';
import axios from 'axios';
function CelubComplete(){
    const navigate = useNavigate();
    const location = useLocation();
    const accNum = location.state;
        // 현재 날짜 가져오기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(today.getDate()).padStart(2, '0');
    const userName = localStorage.getItem("name");

    // 날짜 형식 설정 (예: YYYY-MM-DD)
    const formattedDate = `${year}.${month}.${day}`;
    const goList=()=>{
        const data={
            userIdx: localStorage.getItem("userIdx")
        }
        axios.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/account-list`,
            qs.stringify(data)
        )
        .then((res)=>{
            console.log(res.data.data);
            navigate("/celub/list",{state:res.data.data});
        }).catch((error)=>{
            alert("실패");
        })
    }
    return(
        <>
            <div className="completeBox1">
                <div className="completeBox2">
                    <img className="checkImg" src={checkImg} />
                    <div className="textBox1">
                        <p>최애적금</p>
                        <p>오늘부터 시작</p>
                    </div>
                </div>
            </div>
            <div className="completeBox3">
                <div className="tableBox">
                    <table className="completeInfo">
                        <tr>
                            <th>출금계좌</th>
                            <td colSpan={2}>{userName}의 통장 <br/>{accNum}</td>
                        </tr>
                        <tr>
                            <th>적용금리</th>
                            <td colSpan={2} style={{"color":"#1ABA78"}}>2.00%</td>
                        </tr>
                        <tr>
                            <th>가입일</th>
                            <td colSpan={2}>{formattedDate}</td>
                        </tr>
                    </table>
                </div>
                <button id="basicBtn1" onClick={goList}>완료</button>
            </div>
        </>
    );
}

export default CelubComplete;