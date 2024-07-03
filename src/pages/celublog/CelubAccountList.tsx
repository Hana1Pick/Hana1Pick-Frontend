import { useLocation, useNavigate } from "react-router-dom";
import CelubHeader from "../../layouts/CelubHeader2";
import { CelubAccount } from '../../type/commonType';
import axios from "axios";
import qs from 'qs';
import CommonModal from "../../components/button/CommonModal";
import { useState } from "react";
function CelubAccountList(){
    const[look, setLook] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const accList: CelubAccount[] = location.state;
    console.log(accList);
    const goAccount=(accountId:string)=>{
        axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
            qs.stringify({accountId:accountId}))
            .then((res)=>{
                navigate("/celub/detail", {state:res.data.data});
            }).catch((error)=>{
                alert("실패");
            });
    }
    const cancle = () => {
        setLook(false);
    }
    const check = () =>{
        alert("확인");
    }
    const test = () =>{
        setLook(true);
    }
    return(
        <>
            <CelubHeader/>
            <button onClick={test}>모달테스트</button>
            <CommonModal msg="모달테스트 모달테스트 모달테스트 모달테스트 모달테스트" show={look} onCancle={cancle} onConfirm={check} />
            <div className="celubListBox1">
                <span>조회할 계좌를 선택해주세요</span>
            </div>
            
            {
                accList.map((account:CelubAccount)=>(
                    <div className="celubCard" onClick={() => goAccount(account.account_id)}>
                        <div className="celubCardInner">
                        <div className="celubCardFront" style={{"backgroundImage": `url(${account.imgSrc})`}}>
                            <span className="accountName">{account.name}</span>
                        </div>
                        <div className="celubCardBack"  style={{"backgroundImage":  `url(${account.imgSrc})`,  "opacity" : "0.5"}}>
                            <span className="accountName">{account.name}</span>
                            <span className="accountNum">{account.account_id}</span>
                            <span className="balance">{account.balance}원</span>
                        </div>
                    </div>
                </div>
                

                ))
            }      
        </>
    )
}

export default CelubAccountList;