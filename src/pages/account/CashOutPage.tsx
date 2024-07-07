import CircleLogo from '../../assets/images/common/CircleLogo.png';
import CelublogCircleLogo from '../../assets/images/account/CelublogCircleLogo.png';
import MoaClubCircleLogo from '../../assets/images/account/MoaClubCircleLogo.png';
import DepositCircleLogo from '../../assets/images/account/DepositCircleLogo.png';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';
import { AccountContext } from '../../contexts/AccountContextProvider';

function CashOutPage() {
  const { amount, outAccId, inAccType, inAccId, inAccName }: any =
    useContext(AccountContext);

  const navigate = useNavigate();
  const next = () => {
    navigate('/cash-out/pattern');
  };

  const accountTypeMap: { [key: string]: string } = {
    default: CircleLogo,
    deposit: DepositCircleLogo,
    celublog: CelublogCircleLogo,
    moaclub: MoaClubCircleLogo,
  };

  function getAccountType(accountType: string) {
    return accountTypeMap[accountType] || '';
  }

  return (
    <div>
      <Header value='이체' />
      <div className='completeBox1'>
        <div className='completeBox2'>
          <img
            className='accountImage'
            src={getAccountType(inAccType)}
            alt='accountImage'
          />
          <div className='textBox1'>
            <p>{inAccName}님에게</p>
            <p>{amount}원</p>
            <p>이체하시겠습니까?</p>
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
        <div id='nextBtn'>
          <CommonBtn
            type='pink'
            value='이체하기'
            onClick={next}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default CashOutPage;
