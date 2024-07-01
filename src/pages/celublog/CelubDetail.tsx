import React, { useState, useEffect } from 'react';
import CelubHeader3 from "../../layouts/CelubHeader3";
import { CelubHistoryType, CelubRuleType } from '../../type/commonType';
import { useLocation, useNavigate } from "react-router-dom";

const CelubDetail: React.FC = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startHeight, setStartHeight] = useState(0);
    const [isRule, setIsRule] = useState(true);
    const [isHistory, setIsHistory] = useState(false);
    const [ruleList, setRuleList] = useState<CelubRuleType[]>([]);
    const [historyList, setHistoryList] = useState<CelubHistoryType[]>([]);
    const location = useLocation();
    const detailList = location.state;
    useEffect(() => {
        history();
        rule();
    }, []); 
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

    const rule=()=>{
        setRuleList(detailList.ruleInfo);
        setIsHistory(false);
        setIsRule(true);
    }

    const history=()=>{
        setHistoryList(detailList.accountReport);
        setIsHistory(true);
        setIsRule(false);
    }
    const goMakeRule=()=>{
        navigate("/celub/rule",{state:detailList});
    }
    const goDeposit=()=>{
        navigate("/celub/deposit");
    }
    const share=()=>{
        alert('공유');
    }
    const setting =()=>{
        alert('변경');
    }
    return (
        <>
            <CelubHeader3 onClick1={share} onClick2={setting} />
            <div id="celubBox1">
                <div className="celub-detail-box1" id="celubContainer">
                    <img id="celubBgImg" src={detailList.accountInfo.imgSrc} alt="Background" />
                    <div className="celub-detail">
                        <p>D+{detailList.accountInfo.duration} ♥</p>
                        <h4>{detailList.accountInfo.name}</h4>
                        <h1>{detailList.accountInfo.balance}원</h1>
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
                                            <div key={index}>
                                                <div className="celub-rule-box2">
                                                    {rule.ruleName} :  {rule.ruleMoney}원
                                                </div>
                                            </div>
                                        ))
                                )        
                            ):
                            (historyList.length==0?(
                                <>
                                <div className="celub-rule-box1"> 
                                    아직 거래내역이 없어요<br/>
                                    최애적금을 이용해보세요!
                                    <button id="basicBtn1" onClick={goDeposit}>응원하러 가기</button>
                                </div>                             
                            </>
                            ):(
                                historyList.map((his, idx)=>(
                                    <div key={idx}>
                                        <table className="celub-history-table">
                                            <tr>
                                                <td>{his.transDate}</td>
                                                <td>{his.memo} <br/> <div className="celub-hashtag">#{his.hashtag}</div> </td>
                                                <td>+{his.transAmount}원 <br/> <div className="celub-totalmoney">{his.afterInBal}원</div> </td>
                                            </tr>
                                        </table>
                                    </div>
                                ))
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CelubDetail;