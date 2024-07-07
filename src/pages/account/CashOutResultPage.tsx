import check from '../../assets/images/common/check-green.png';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';
import { AccountContext } from '../../contexts/AccountContextProvider';

function CashOutResultPage() {
  const { amount, outAccId, inAccId, inAccName }: any =
    useContext(AccountContext);

  const navigate = useNavigate();
  const next = () => {
    navigate('/');
  };

  return (
    <div>
      <Header value='이체' />
      <div className='completeBox1'>
        <div className='completeBox2'>
          <img className='accountImage' src={check} alt='accountImage' />
          <div className='textBox1'>
            <p>{inAccName}님에게</p>
            <p>{amount}원</p>
            <p>이체했습니다.</p>
          </div>
        </div>
      </div>
      <div className='completeBox3'>
        <div className='tableBox'>
          <table className='completeInfo'>
            <tr>
              <th>받는 분에게 표기</th>
              <td colSpan={2}>
                {localStorage.getItem('name')} <br />
              </td>
            </tr>
            <tr>
              <th>출금계좌</th>
              <td colSpan={2}>{outAccId}</td>
            </tr>
            <tr>
              <th>입금계좌</th>
              <td colSpan={2}>{inAccId}</td>
            </tr>
          </table>
        </div>
      </div>
      <div id='nextBtn'>
        <CommonBtn type='pink' value='확인' onClick={next} disabled={false} />
      </div>
    </div>
  );
}

export default CashOutResultPage;
