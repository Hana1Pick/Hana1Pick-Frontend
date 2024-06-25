import React, { useState} from 'react';
import CelubHeader3 from "../../layouts/CelubHeader3";
import bgImg from "../../assets/images/cha.png";

function CelubDeposit(){
    const [isExpanded, setIsExpanded] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startHeight, setStartHeight] = useState(0);
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
    return (
        <>
            <CelubHeader3 />
            <div id="celubBox1">
                <div className="celub-detail-box1" id="celubContainer">
                    <img id="celubBgImg" src={bgImg} alt="Background" />
                    <div className="celub-detail">
                        <p>D+100 ♥</p>
                        <h4>은우적금</h4>
                        <h1>600,900원</h1>
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
                    <div className="celub-detail-deco"/>
                    <div className="celub-deposit-box">
                        <p>댓글 달아줄 때 5000원을 입금할게요.</p>
                        <span>해시태그가 비어있으면 입금회차를 기록합니다.</span>
                        <button>#해시태그 남기기</button>
                    </div>
                    <button id="basicBtn1">입금하기</button>
                </div>
            </div>
        </>
    );
};

export default CelubDeposit;