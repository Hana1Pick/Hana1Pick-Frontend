import { useLocation, useNavigate } from 'react-router-dom';
import CelubHeader from '../../layouts/CelubHeader';
import { CelubAccount } from '../../type/commonType';
import './CelublogStyle.scss';
import axios from 'axios';
import qs from 'qs';

function CelubAccountList() {
  const location = useLocation();
  const navigate = useNavigate();
  const accList: CelubAccount[] = location.state;
  console.log(accList);
  const goAccount = (accountId: string) => {
    axios
      .post(
        `${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
        qs.stringify({ accountId: accountId })
      )
      .then((res) => {
        navigate('/celub/detail', { state: res.data.data });
      })
      .catch((error) => {
        alert('실패');
      });
  };
  return (
    <>
      <CelubHeader value='셀럽로그 조회' />
      <div className='celubListBox1'>
        <span>조회할 계좌를 선택해주세요</span>
      </div>

      {accList.map((account: CelubAccount) => (
        <div
          className='celubCard'
          onClick={() => goAccount(account.account_id)}
        >
          <div className='celubCardInner'>
            <div
              className='celubCardFront'
              style={{ backgroundImage: `url(${account.imgSrc})` }}
            >
              <span className='celub-accountName'>{account.name}</span>
            </div>
            <div
              className='celubCardBack'
              style={{
                backgroundImage: `url(${account.imgSrc})`,
                opacity: '0.7',
              }}
            >
              <span className='celub-accountName'>{account.name}</span>
              <span className='celub-accountNum'>{account.account_id}</span>
              <span className='celub-balance'>{account.balance}원</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CelubAccountList;
