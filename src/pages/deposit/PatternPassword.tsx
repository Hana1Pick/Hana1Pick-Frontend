// App.tsx
import React from "react";
import Header from "../../components/Header";
import PattrenBg from "../../assets/images/PatternBg.png";
import "./style.css";

function PatternPassword() {
  // 9개의 패턴 점을 렌더링하는 함수
  const renderPattern = () => {
    const patternPoints = [];
    for (let i = 0; i < 9; i++) {
      patternPoints.push(
        <div key={i} className="pattern-dot">
          {/* 패턴 점의 스타일을 여기에 적용할 수 있습니다. */}
        </div>
      );
    }
    return patternPoints;
  };

  return (
    <>
      <Header value="패턴 설정" />
      <div className="background-container">
        <img src={PattrenBg} alt="Pattern Background" className="pattern-bg" />
        <div className="overlay-text">
          인증 패턴을 등록합니다.
          <div>이체 및 모든 금융 거래시 사용됩니다.</div>
        </div>
      </div>
      <div className="pattern-container">{renderPattern()}</div>
    </>
  );
}

export default PatternPassword;
