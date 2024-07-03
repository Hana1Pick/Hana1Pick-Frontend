import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import bgImg from '../../assets/images/celub/CelubBack.png';
import logo from '../../assets/images/celub/heart.png'; 
import CommonBtn from "../../components/button/CommonBtn";
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
    
    return (
      <>
          {/* <Header value="셀럽로그 이름설정" /> */}
          <div id="celubBox1">
                <div id="celubContainer">
                    <img id="celubBgImg" src={bgImg}/>
                    <div id="celubLogo">
                        <img src={logo}/>
                        <input type="text" className="accountNameInput" onChange={handleInputChange} placeholder="사용할 이름을 작성해주세요" style={{"marginTop":"30%"}} />
                    </div>
                </div>
            </div>
            <div id="celubBox2">
                <h3>마지막으로 셀럽로그에 사용할 이름을 정해주세요</h3>
                <CommonBtn type='pink' value='셀럽로그 시작하기' onClick={celubStart}/>
            </div>  
      </>
  );

}

export default CelubName;
