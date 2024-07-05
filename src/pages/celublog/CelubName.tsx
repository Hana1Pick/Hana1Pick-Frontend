import { useLocation, useNavigate } from "react-router-dom";
import bgImg from '../../assets/images/celub/CelubBack.png';
import logo from '../../assets/images/celub/heart.png'; 
import CommonBtn from "../../components/button/CommonBtn";
import "./CelublogStyle.scss";
import { useState } from "react";

function CelubName() {
   const location = useLocation();
   const navigate = useNavigate();
   const withdrawInfo = location.state;
   const [accountName, setAccountName] = useState("");
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value); // 입력 필드 값 업데이트
  };
  console.log("이름정하는 화면 확인",withdrawInfo);
   const celubStart = ()=>{
      if(accountName==""||accountName==null){
        alert("이름을 정해주세요");
        return;
      }
      navigate('/celub/pattern',  { state: {...withdrawInfo, name: accountName}});
   }
   const beforeStage=()=>{
    const div1 = document.getElementById('withdraw-box4');
    const div2 = document.getElementById('celub-withdraw-overlay');
    if(div1){
        div1.style.display = 'none';
    }
    if(div2){
        div2.style.display = 'none';
    }
  }
  const nextStage =()=>{
    const div1 = document.getElementById('withdraw-box4');
    const div2 = document.getElementById('celub-withdraw-overlay');
     
    if(div1){
        div1.style.display = 'block';
    }
    if(div2){
        div2.style.display = 'block';
    }
}
    
    return (
      <>
          {/* <Header value="셀럽로그 이름설정" /> */}
          <div id="celubBox1">
                <div id="celubContainer">
                    <img id="celubBgImg" src={bgImg}/>
                    <div id="celubLogo">
                        <img src={logo}/>
                        <input type="text" className="CelubAccountNameInput" onChange={handleInputChange} placeholder="사용할 이름을 작성해주세요" style={{"marginTop":"30%"}} />
                    </div>
                </div>
            </div>
            <div id="celubBox2-2">
                <p>마지막으로 셀럽로그에<br/>사용할 이름을 정해주세요</p>
                <CommonBtn type='pink' value='셀럽로그 시작하기' onClick={nextStage}/>
            </div>  
            <div>
                <div className="withdraw-box4" id="withdraw-box4">
                    <div className="withdraw-box6">
                        <p>오늘부터 {accountName}을 시작할게요!</p>
                        <span>규칙을 설정할 때 까지는 저축되지 않아요.<br/>
                        사랑하는 만큼 모아주세요.</span>
                        <div className="withdraw-box5">
                            <button onClick={beforeStage}>아니요</button>
                            <button onClick={celubStart} className="withdraw-box5-btn">예</button>
                        </div>
                    </div>
                </div>
            </div>
      </>
  );

}

export default CelubName;
