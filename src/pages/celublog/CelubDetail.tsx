import React, { useState, useEffect, ChangeEvent  } from 'react';
import CelubHeader3 from "../../layouts/CelubHeader3";
import { CelubHistoryType, CelubRuleType } from '../../type/commonType';
import { useLocation, useNavigate } from "react-router-dom";
import CommonBtn from '../../components/button/CommonBtn';
import axios from 'axios';
import qs from 'qs';

const CelubDetail: React.FC = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startHeight, setStartHeight] = useState(0);
    const [isRule, setIsRule] = useState(true);
    const [isHistory, setIsHistory] = useState(false);
    const [ruleList, setRuleList] = useState<CelubRuleType[]>([]);
    const [historyList, setHistoryList] = useState<CelubHistoryType[]>([]);
    const [selectRule, setSelectRule] = useState("");
    const [selectRuleMoney, setSelectRuleMoney] = useState(0);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('#공통');
    const location = useLocation();
    const detailList = location.state;
    const [fileInput, setFileInput] = useState<File | null>(null);
    
    console.log(detailList);
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

    const setting =()=>{
        alert('변경');
        const modal = document.getElementById("myModal")!;

        // Get the button that opens the modal
        const btn = document.getElementById("openModalBtn")!;

        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0] as HTMLElement;
        modal.style.display = "block";
        span.onclick = () => {
            modal.style.display = "none";
          }
    }
    // 첨부파일 변경시 실행
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          setFileInput(event.target.files[0]);
        }
      };

    // 사진변경
    const onSave = () =>{
        if (!fileInput) {
            alert('이미지를 선택해주세요');
            return;
          }
          const formData = new FormData();
          formData.append('accountId', detailList.accountInfo.accountId);
          formData.append('field', "imgSrc");
          formData.append('srcImg', fileInput);
          formData.append('name', detailList.accountInfo.name);

          axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/alteration`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res)=>{
            console.log(res);
          });
    }

    const handleSelectChange =(e:ChangeEvent<HTMLSelectElement>)=>{
        setSelectedValue(e.target.value);
    }
    const insertMoney = (ruleName:string, ruleMoney:number) =>{
        setSelectRule(ruleName);
        setSelectRuleMoney(ruleMoney);
        setIsBoxVisible(true);
    }
    const sendMoney = () =>{
        const data={
            accountId: detailList.accountInfo.accountId,
            amount: selectRuleMoney,
            memo: selectRule,
            hashtag: selectedValue
        }
        axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/in`,data)
            .then((res)=>{
                setIsBoxVisible(false);
                axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
                    qs.stringify({accountId:detailList.accountInfo.accountId}))
                    .then((res)=>{
                        navigate("/celub/detail", {state:res.data.data});
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
                                            <div key={index} onClick={() => insertMoney(rule.ruleName, rule.ruleMoney)}>
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
{     isBoxVisible  &&   <div className="celub-detail-box2 add-box">
                <div className="celub-detail-box3">
                        <div className="celub-detail-deco"/>
                        <div className="celub-deposit-box">
                            <p>{selectRule} {selectRuleMoney}원을 입금할게요.</p>
                            <select value={selectedValue} onChange={handleSelectChange}>
                                <option value="공통">#해시태그를 선택하세요</option>
                                <option value="공카댓글">#공카댓글</option>
                                <option value="이달의생일">#이달의생일</option>
                                <option value="개인셀카">#개인셀카</option>
                            </select>
                        </div>
                        <CommonBtn type='pink' value="입금하기" onClick={sendMoney} />
                </div>
            </div>}

            <div id="myModal" className="modal">
                <div className="modal-content">
                <span className="close">&times;</span>
                <input id="uploadImg" type="file" onChange={handleFileChange}/>
                <CommonBtn type='black' value="저장" onClick={onSave} />
                </div>
            </div>

        </>
    );
};

export default CelubDetail;