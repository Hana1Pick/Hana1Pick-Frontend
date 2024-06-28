import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';
import './../../common/styles/scss/AccountStyle.scss';
import { AccountContext } from '../../contexts/AccountContextProvider';

function GetAmountPage() {
  const { outAccId, outAccBalance, amount, setAmount }: any =
    useContext(AccountContext);
  const [input, setInput] = useState(0);
  const inputStyle = {
    color: input > outAccBalance ? 'red' : 'inherit',
  };
  const [outAccInfo, setOutAccInfo] = useState(
    outAccId + ' : ' + outAccBalance + '원'
  );
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

  useEffect(() => {
    if (input == 0 || input > outAccBalance) {
      setIsNextBtnDisabled(true);
    } else {
      setIsNextBtnDisabled(false);
    }
  }, [input]);

  const navigate = useNavigate();
  const next = () => {
    setAmount(input);
    navigate('/cash-out');
  };

  const calcByNumber = (value: number) => {
    setInput(input + value);
  };

  const calcByString = (value: String) => {
    if (value === '←') {
      setInput(Number(input.toString().slice(0, -1)));
    } else {
      setInput(Number(input.toString() + value));
    }
  };

  const btn1 = () => {
    const btn1Values = [
      { text: '+1만', value: 10000 },
      { text: '+5만', value: 50000 },
      { text: '+10만', value: 100000 },
      { text: '전액', value: outAccBalance },
    ];

    return (
      <div className='row'>
        {btn1Values.map((btn, index) => (
          <input
            className='amountBtn1'
            key={index}
            type='button'
            value={btn.text}
            onClick={() => calcByNumber(btn.value)}
          />
        ))}
      </div>
    );
  };

  const btn2 = () => {
    const btn2Values = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['00', '0', '←'],
    ];

    return btn2Values.map((row, rowIndex) => (
      <div key={rowIndex} className='row'>
        {row.map((value, colIndex) => (
          <input
            className='amountBtn2'
            key={colIndex}
            type='button'
            value={value}
            onClick={() => calcByString(value)}
          />
        ))}
      </div>
    ));
  };

  return (
    <div>
      <Header value='이체' />
      <div id='mainForCenter'>
        <div id='amount'>
          <span style={inputStyle}>{input}</span>원
        </div>
        <div id='accountInfo'>{outAccInfo}</div>
        <div id='calculator'>
          {btn1()}
          {btn2()}
        </div>
      </div>
      <div id='nextBtn'>
        <CommonBtn
          type='black'
          value='다음'
          onClick={next}
          disabled={isNextBtnDisabled}
        />
      </div>
    </div>
  );
}

export default GetAmountPage;
