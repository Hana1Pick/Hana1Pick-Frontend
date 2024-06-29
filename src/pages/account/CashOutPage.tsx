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
      <div id='mainForCenter'>
        <img
          className='accountImage'
          src={getAccountType(inAccType)}
          alt='accountImage'
        />
        <div id='info1'>
          <span>{inAccName}</span>님에게
          <br />
          <span>{amount}</span>원
          <br />
          이체하시겠습니까?
        </div>
        <div id='info2'>
          <table>
            <tr>
              <td className='alignLeft'>받는 분에게 표기</td>
              <td className='alignRight'>출금 계좌 소유자명</td>
            </tr>
            <tr>
              <td className='alignLeft'>출금계좌</td>
              <td className='alignRight'>{outAccId}</td>
            </tr>
            <tr>
              <td className='alignLeft'>입금계좌</td>
              <td className='alignRight'>{inAccId}</td>
            </tr>
          </table>
        </div>
      </div>
      <div id='nextBtn'>
        <CommonBtn
          type='black'
          value='이체하기'
          onClick={next}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default CashOutPage;
