import { useLocation, useNavigate } from "react-router-dom";
import CelubHeader from "../../layouts/CelubHeader2";
import { CelubAccount } from '../../type/commonType';
import axios from "axios";
import qs from 'qs';
function CelubAccountList(){
    const location = useLocation();
    const navigate = useNavigate();
    const accList: CelubAccount[] = location.state;
    const goAccount=(accountId:string)=>{
        axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
            qs.stringify({accountId:accountId}))
            .then((res)=>{
                console.log(res.data.data);
                alert("성공");
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
            <div className="celubListBox2">
                {accList.map((account:CelubAccount)=>(
                    <button key={account.account_id} className="celub-button" onClick={()=>goAccount(account.account_id)}>
                        {account.name}
                    </button>
                ))}
            </div>
        </>
    )
}

export default CelubAccountList;