import { useLocation, useNavigate } from "react-router-dom";
import CelubHeader from "../../layouts/CelubHeader2";
import { CelubAccount } from '../../type/commonType';
import axios from "axios";
import qs from 'qs';
function CelubAccountList(){
    const location = useLocation();
    const navigate = useNavigate();
    const accList: CelubAccount[] = location.state;
    console.log(accList);
    const goAccount=(accountId:string)=>{
        axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
            qs.stringify({accountId:accountId}))
            .then((res)=>{
                console.log(res.data.data);
                navigate("/celub/detail", {state:res.data.data});
            }).catch((error)=>{
                alert("실패");
            });
    }

    return(
        <>
            <CelubHeader/>
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