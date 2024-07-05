import axios from 'axios';
import React, { useRef, useState, useContext } from 'react';
import PattrenBg from '../../assets/images/common/PatternBg.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../layouts/MoaclubHeader2';

interface PatternProps {
  nextUrl: string;
}

function CelubPattern() {
  const [attemptCnt, setAttemptCnt] = useState(0);
  const location = useLocation();
  const withdrawInfo = location.state;
  console.log('값확인', withdrawInfo);
  /* TODO
  const userPassword = localStorage.getItem('userPassword');
  */
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
  const isDrawing = useRef(false);
  const pointsRef = useRef<HTMLDivElement[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

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
        setErrorMsg('4개 이상의 점을 연결해주세요.');
        setSelectedPoints([]);
      } else {
        let password = '';
        for (let i = 0; i < selectedPoints.length; i++) {
          password += selectedPoints[i];
        }

        checkPassword(password);
      }
    }
  };

  const navigate = useNavigate();
  const next = (password: string) => {
    const url = `${process.env.REACT_APP_BESERVERURI}/api/celub/accession`;

    const data = {
      userIdx: withdrawInfo.userIdx,
      accPw: password,
      name: withdrawInfo.name,
      imgSrc: withdrawInfo.imgSrc,
      outAccId: withdrawInfo.outAccId,
      celebrityIdx: withdrawInfo.celebrityIdx,
    };

    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.status == 201) {
          navigate('/celub/complete', { state: withdrawInfo.outAccId });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkPassword = async (password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/user/password-check`,
        {
          userIdx: withdrawInfo.userIdx,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.data.check) {
        next(password);
      } else {
        setSelectedPoints([]);
        setAttemptCnt((prevCnt) => prevCnt + 1);
        setErrorMsg(`일치하지 않습니다. (${attemptCnt + 1}/5)`);
      }
    } catch (error) {
      console.error(error);
    }
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
        <Header value='비밀번호 입력' disabled={false} />
        <img src={PattrenBg} alt='Pattern Background' className='pattern-bg' />
        <div className='overlay-text'>
          비밀번호를 입력하세요.
          <div>회원 인증 패턴을 그려주세요.</div>
          {errorMsg && <div className='errorMsg'>{errorMsg}</div>}
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

export default CelubPattern;
