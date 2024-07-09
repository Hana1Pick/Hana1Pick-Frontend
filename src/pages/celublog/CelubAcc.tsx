import React, { useState, ChangeEvent, useEffect } from 'react';
import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import './CelublogStyle.scss';
import axios from 'axios';
// 계좌 데이터 타입 정의
interface Account {
  accountId: string;
  name: string;
  accountType: string;
  balance: number;
}

function CelubAcc() {
  const [selectedAccount, setSelectedAccount] = useState(true);
  const [accountId, setAccountId] = useState('');
  const [account, setAccount] = useState<Account | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const celubWithdraw = location.state;
  const userIdx = location.state.userIdx;
  useEffect(() => {
    const fetchAccounts = async () => {
      const accountData = await getAccountListByType(userIdx, 'deposit');
      setAccount(accountData);
    };

    fetchAccounts();
  }, [userIdx]);
  // API 호출 함수 정의
  const getAccountListByType = async (userIdx: string, type: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BESERVERURI}/api/user/account-list`, {
        params: { userIdx, type },
      });

      return response.data.data[0]; // 데이터를 직접 반환 (첫 번째 요소)
    } catch (error) {
      console.error(error);
      return null; // 오류 발생 시 null 반환
    }
  };
  const next = () => {
    console.log('확인', accountId);
    navigate('/celub/name', {
      state: { ...celubWithdraw, outAccId: accountId },
    });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(false);
    setAccountId(event.target.value);
  };
  const getAccCode = (accountId: string) => {
    return accountId.slice(-7);
  };
  return (
    <>
      <Header value='셀럽로그 출금계좌' />

      <div className='celub-withdraw-total-box'>
        <div>
          <div className='celub-withdrawMsg'>
            <div>
              <h3 className='narrowLine'>
                셀럽로그에 연결될 계좌를
                <br />
                선택해 주세요.
              </h3>
            </div>
            <div>
              <h4>
                연결 계좌는 변경할 수 없으니
                <br />
                신중하게 선택해 주세요.
              </h4>
            </div>
          </div>
        </div>
        <div className='withdraw-box1' style={{marginBottom: '1rem'}}>
          <h4>연결계좌</h4>
          <div className='withdraw-box2'>
            <label htmlFor='lang' style={{ fontSize: '12px' }}>
              연결계좌
            </label>{' '}
            &nbsp;
            <select
              name='languages'
              id='lang'
              style={{ border: '0', width: '70%', backgroundColor: '#F8F8F9' }}
              onChange={handleSelectChange}
            >
              <option value='' disabled selected>
                계좌를 선택해 주세요.
              </option>
              {account && (
                <option value={account.accountId}>
                  {account.name}의 입출금 계좌 ({getAccCode(account.accountId)})
                </option>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className='buttonContainer'>
        <CommonBtn
          type='pink'
          value='다음'
          onClick={next}
          disabled={selectedAccount}
        />
      </div>
    </>
  );
}

export default CelubAcc;
