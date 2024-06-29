import axios from 'axios';
import React, { useRef, useState, useContext } from 'react';
import PattrenBg from '../../assets/images/common/PatternBg.png';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../contexts/AccountContextProvider';

interface PatternProps {
  nextUrl: string;
}

function CashOutPatternPage() {
  const { userIdx, amount, outAccId, inAccId }: any =
    useContext(AccountContext);
  const [userPassword, setUserPassword] = useState('1236');
  /* TODO
  const userPassword = localStorage.getItem('userPassword');
  */
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
  const isDrawing = useRef(false);
  const pointsRef = useRef<HTMLDivElement[]>([]);

  const handleMouseDown = (index: number) => {
    if (!selectedPoints.includes(index)) {
      setSelectedPoints([index]);
      isDrawing.current = true;
    }
  };
  const handleTouchStart = (index: number) => {
    if (!selectedPoints.includes(index)) {
      setSelectedPoints([index]);
      isDrawing.current = true;
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDrawing.current) {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      if (element && element instanceof HTMLElement && element.dataset.index) {
        const index = parseInt(element.dataset.index, 10);
        if (!selectedPoints.includes(index)) {
          setSelectedPoints((prevSelectedPoints) => [
            ...prevSelectedPoints,
            index,
          ]);
        }
      }
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (isDrawing.current) {
      const element = document.elementFromPoint(
        event.touches[0].clientX,
        event.touches[0].clientY
      );
      if (element && element instanceof HTMLElement && element.dataset.index) {
        const index = parseInt(element.dataset.index, 10);
        if (!selectedPoints.includes(index)) {
          setSelectedPoints((prevSelectedPoints) => [
            ...prevSelectedPoints,
            index,
          ]);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (isDrawing.current) {
      isDrawing.current = false;
      console.log('Selected Pattern:', selectedPoints);
      if (selectedPoints.length < 4) {
        alert('비밀번호의 길이가 유효하지 않습니다. 다시 그려주세요');
      } else {
        let password = '';
        for (let i = 0; i < selectedPoints.length; i++) {
          password += selectedPoints[i];
        }

        if (password == userPassword) {
          next();
        }
      }
    }
  };

  const navigate = useNavigate();
  const next = () => {
    const url = `http://${process.env.REACT_APP_BESERVERURI}/api/account/cash-out`;

    const data = {
      userIdx: userIdx,
      amount: amount,
      memo: null,
      hashtag: null,
      outAccId: outAccId,
      inAccId: inAccId,
    };

    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          navigate('/cash-out/result');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderPattern = () => {
    const patternPoints = [];
    for (let i = 1; i <= 9; i++) {
      patternPoints.push(
        <div
          key={i}
          data-index={i}
          className={`pattern-dot ${selectedPoints.includes(i) ? 'selected' : ''}`}
          onMouseDown={() => handleMouseDown(i)}
          onTouchStart={() => handleTouchStart(i)}
          ref={(el) => (pointsRef.current[i] = el!)}
        />
      );
    }
    return patternPoints;
  };

  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < selectedPoints.length - 1; i++) {
      const startPoint =
        pointsRef.current[selectedPoints[i]].getBoundingClientRect();
      const endPoint =
        pointsRef.current[selectedPoints[i + 1]].getBoundingClientRect();
      const parentRect =
        pointsRef.current[1].parentElement!.getBoundingClientRect();
      const startX = startPoint.left - parentRect.left + startPoint.width / 2;
      const startY = startPoint.top - parentRect.top + startPoint.height / 2;
      const endX = endPoint.left - parentRect.left + endPoint.width / 2;
      const endY = endPoint.top - parentRect.top + endPoint.height / 2;
      lines.push(
        <line
          key={i}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke='rgb(233,198,229,0.3)'
          strokeWidth='20'
          strokeLinecap='round'
        />
      );
    }
    return lines;
  };

  return (
    <>
      <div className='background-container'>
        <img src={PattrenBg} alt='Pattern Background' className='pattern-bg' />
        <div className='overlay-text'>
          인증 패턴을 등록합니다.
          <div>이체 및 모든 금융 거래시 사용됩니다.</div>
        </div>
      </div>
      <div
        className='pattern-container'
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {renderPattern()}
        <svg className='pattern-lines'>{renderLines()}</svg>
      </div>
    </>
  );
}

export default CashOutPatternPage;
