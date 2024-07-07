import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QrContext } from '../../contexts/QrContextProvider';

import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';

function GetQrAmountPage() {
  const { setAmount, setInAccId }: any = useContext(QrContext);
  const [input, setInput] = useState(0);

  const location = useLocation();
  const { accountId } = location.state || {};
  useEffect(() => {
    setInAccId(accountId);
  }, []);

  const formatInput = (input: number) => {
    return input == 0 ? '받을 금액' : input + '원';
  };

  const navigate = useNavigate();
  const next = () => {
    setAmount(input);
    navigate('/qr/cash-in/result');
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
      { text: '+50만', value: 500000 },
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
      <Header value='QR 코드 발급' />
      <div id='mainForCenter'>
        <div id='amount'>
          <span>{formatInput(input)}</span>
        </div>
        <div id='calculator'>
          {btn1()}
          {btn2()}
        </div>
      </div>
      <div id='nextBtn'>
        <CommonBtn type='pink' value='생성' onClick={next} disabled={false} />
      </div>
    </div>
  );
}

export default GetQrAmountPage;
