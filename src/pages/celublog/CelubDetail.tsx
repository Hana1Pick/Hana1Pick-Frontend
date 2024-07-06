import React, { useState, useEffect, ChangeEvent  } from 'react';
import CelubHeader3 from "../../layouts/CelubHeader3";
import { CelubHistoryType, CelubRuleType, CelubAccountInfo } from '../../type/commonType';
import { useLocation, useNavigate } from "react-router-dom";
import CommonBtn from '../../components/button/CommonBtn';
import "./CelublogStyle.scss";
import axios from 'axios';
import qs from 'qs';

const CelubDetail: React.FC = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startHeight, setStartHeight] = useState(0);
    const [isRule, setIsRule] = useState(true);
    const [isHistory, setIsHistory] = useState(false);
    const [isHashTag, setIsHashTag] = useState(true);
    const [ruleList, setRuleList] = useState<CelubRuleType[]>([]);
    const [historyList, setHistoryList] = useState<CelubHistoryType[]>([]);
    const [accountInfo, setAccountInfo] = useState<CelubAccountInfo>({
        accountId: "",
        balance: 0,
        name: "",
        imgSrc: "",
        outAccId: "",
        celebrityIdx: 0,
        duration: 0,
        createDate: ""
    });

    const [selectRule, setSelectRule] = useState("");
    const [selectRuleMoney, setSelectRuleMoney] = useState(0);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('#공통');
    const location = useLocation();
    const accountId = location.state;

    useEffect(() => {
        axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
            qs.stringify({accountId:accountId}))
            .then((res)=>{
                console.log(res.data.data);
                setRuleList(res.data.data.ruleInfo);
                setHistoryList(res.data.data.accountReport);
                setAccountInfo(res.data.data.accountInfo);
            }).catch((error)=>{
                alert("실패");
            });
    }, [historyList]); 
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setStartY(e.touches[0].clientY);
        setStartHeight(document.documentElement.clientHeight - e.currentTarget.getBoundingClientRect().top);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        const newHeight = startHeight - deltaY;

        if (newHeight >= document.documentElement.clientHeight) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

    const handleTouchEnd = () => {
        if(isExpanded){
            setIsExpanded(true);
        }else{
            setIsExpanded(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount);
    }

    const rule=()=>{
        // setRuleList(detailList.ruleInfo);
        setIsHistory(false);
        setIsRule(true);
    }

    const history=()=>{
        setIsHistory(true);
        setIsRule(false);
    }
    const goMakeRule=()=>{
        // navigate("/celub/rule",{state:detailList});
    }
    const goDeposit=()=>{
        navigate("/celub/deposit");
    }

    const setting =()=>{
        navigate("/celub/setting", {state: accountId});
    }

    const handleSelectChange =(e:ChangeEvent<HTMLSelectElement>)=>{
        setIsHashTag(false);
        setSelectedValue(e.target.value);
    }
    const insertMoney = (ruleName:string, ruleMoney:number) =>{
        setSelectRule(ruleName);
        setSelectRuleMoney(ruleMoney);
        setIsBoxVisible(true);
    }
    const sendMoney = () =>{
        const data={
            accountId: accountId,
            amount: selectRuleMoney,
            memo: selectRule,
            hashtag: selectedValue
        }
        axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/in`,data)
            .then((res)=>{
                setIsBoxVisible(false);
                console.log(res);
                axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
                    qs.stringify({accountId: accountId}))
                    .then((res)=>{
                        setHistoryList(res.data.data.accountReport);
                        history();
                    }).catch((error)=>{
                        alert("실패");
                    });
            }).catch((error)=>{
                alert("실패");
            });
    }
    return (
        <>
            <CelubHeader3 onClick={setting} />
            <div id="celubBox1">
                <div className="celub-detail-box1" id="celubContainer">
                    <img id="celubBgImg" src={accountInfo.imgSrc} alt="Background" />
                    <div className="celub-detail">
                        <p>D+{accountInfo.duration} ♥</p>
                        <h4>{accountInfo.name}</h4>
                        <h1>{formatCurrency(accountInfo.balance)}원</h1>
                    </div>
                </div>
            </div>
            <div
                className={`celub-detail-box2 ${isExpanded ? 'expanded' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="celub-detail-box3">
                    <div className="celub-detail-deco"></div>
                    <button className={`celub-rule-btn ${isRule? 'celub-click-event': ''}`} onClick={rule}>규칙</button>
                    <button className={`celub-history-btn ${isHistory? 'celub-click-event': ''}`} onClick={history}>내역</button>
                    <div id="detail-text-box">
                        {isRule?
                            (ruleList.length==0?
                                (
                                    <>
                                        <div className="celub-rule-box1"> 
                                            아직 규칙이 없어요.<br/>
                                            규칙을 설정해볼까요?
                                        </div>
                                        <button id="basicBtn1" onClick={goMakeRule}>규칙 설정하기</button>                               
                                    </>
                                ):
                                (
                                        ruleList.map((rule, index)=>(
                                            <div key={index} onClick={() => insertMoney(rule.ruleName, rule.ruleMoney)}>
                                                <div className="celub-rule-box2">
                                                    {rule.ruleName} :  {formatCurrency(rule.ruleMoney)}원
                                                </div>
                                            </div>
                                        ))
                                )        
                            ):
                            (historyList.length==0?(
                                <>
                                <div className="celub-rule-box1"> 
                                    <p>아직 거래내역이 없어요<br/>
                                    최애적금을 이용해보세요!</p>
                                </div>                             
                            </>
                            ):(
                                historyList.map((his, idx)=>(
                                    <div key={idx}>
                                        <table className="celub-history-table">
                                            <tr>
                                                <td>{his.transDate}</td>
                                                <td>{his.memo} <br/> <div className="celub-hashtag">#{his.hashtag}</div> </td>
                                                <td>{formatCurrency(his.transAmount)}원 <br /> <div className="celub-totalmoney">{formatCurrency(his.afterInBal)}원</div></td>
                                            </tr>
                                        </table>
                                    </div>
                                ))
                            ))}
                    </div>
                </div>
            </div>
{     isBoxVisible  &&   <div className="celub-detail-box2 add-box">
                <div className="celub-detail-box3">
                        <div className="celub-detail-deco"/>
                        <div className="celub-deposit-box">
                            <p>{selectRule} {formatCurrency(selectRuleMoney)}원을 입금할게요.</p>
                            <select value={selectedValue} onChange={handleSelectChange}>
                                <option value="공통"># 해시태그를 선택하세요</option>
                                <option value="공카댓글"># 공카댓글</option>
                                <option value="이달의생일"># 이달의생일</option>
                                <option value="개인셀카"># 개인셀카</option>
                            </select>
                        </div>
                        <CommonBtn type='pink' value="입금하기" onClick={sendMoney} disabled={isHashTag}/>
                </div>
            </div>}
        </>
    );
};

export default CelubDetail;