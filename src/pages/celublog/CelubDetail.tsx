import React, { useState, useEffect, ChangeEvent  } from 'react';
import CelubHeader3 from "../../layouts/CelubHeader3";
import { CelubHistoryType, CelubRuleType, CelubAccountInfo } from '../../type/commonType';
import { useLocation, useNavigate } from "react-router-dom";
import CommonBtn from '../../components/button/CommonBtn';
import "./CelublogStyle.scss";
import axios from 'axios';
import qs from 'qs';
import CommonModal1 from '../../components/modal/CommonModal3';

const CelubDetail: React.FC = () => {
    const navigate = useNavigate();
    const [look, setLook] = useState(false);
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
    const [outBalance, setOutBalance] = useState(0);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
            qs.stringify({accountId:accountId}))
            .then((res)=>{
                console.log(res.data.data);
                setRuleList(res.data.data.ruleInfo);
                setHistoryList(res.data.data.accountReport);
                setAccountInfo(res.data.data.accountInfo);
                console.log(res.data.data.accountInfo.outAccBalance);
                setOutBalance(res.data.data.accountInfo.outAccBalance);
            }).catch((error)=>{
                alert("실패");
            });
    }, [isHistory]); 
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
        setIsHistory(false);
        setIsRule(true);
    }
    const history=()=>{
        setIsHistory(true);
        setIsRule(false);
    }
    const goMakeRule=()=>{
        navigate("/celub/rule",{state:{accountId, ruleList}});
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
        axios.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/in`,data)
            .then((res)=>{
                setIsBoxVisible(false);
                console.log(res);
                axios.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
                    qs.stringify({accountId: accountId}))
                    .then((res)=>{
                        setHistoryList(res.data.data.accountReport);
                        setLook(true);
                    }).catch((error)=>{
                        alert("실패");
                    });
            }).catch((error)=>{
                alert("실패");
            });
    }
    const completeChange = () => {
        setIsBoxVisible(false);
        history();
        setLook(false);
    }
    return (
        <>
            <CelubHeader3 onClick={setting} />
            <div id="celubBox1">
                <div className="celub-detail-box1" id="celubContainer">
                    <img id="celubBgImg" src={accountInfo.imgSrc} alt="Background" />
                    <div className="celub-detail">
                        <p>D+{accountInfo.duration}</p>
                        <div className="celub-detail-title">
                            <h4>{accountInfo.name}</h4>
                            <h2>{formatCurrency(accountInfo.balance)}원</h2>
                        </div>
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
                            <p>{selectRule}의 내역으로<br/> {formatCurrency(selectRuleMoney)}원을 입금할게요.</p>
                            <select value={selectedValue} onChange={handleSelectChange}>
                                <option value="공통"># 해시태그를 선택하세요</option>
                                <option value="공카댓글"># 공카댓글</option>
                                <option value="이달의생일"># 이달의생일</option>
                                <option value="개인셀카"># 개인셀카</option>
                            </select>
                        </div>
                        <div className="celub-deposic-balance">
                            {outBalance < selectRuleMoney && (
                                <div style={{ color: 'red', fontSize: '1.3rem' }}>
                                    ⚠️ 계좌 잔액이 부족합니다.
                                </div>
                            )}
                            입금 전 입출금통장 잔액: {formatCurrency(outBalance)}원 <br/>
                            입금 후 입출금통장 잔액: {formatCurrency(outBalance-selectRuleMoney)}원
                        </div>
                        <CommonBtn type='pink' value="입금하기" onClick={sendMoney} disabled={isHashTag||outBalance-selectRuleMoney<0}/>
                </div>
            </div>}
            <CommonModal1 msg=" 입금 되었습니다." show={look} onConfirm={completeChange} />
        </>
    );
};

export default CelubDetail;