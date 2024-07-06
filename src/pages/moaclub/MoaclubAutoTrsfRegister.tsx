import React, { useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import Header from '../../layouts/MoaclubHeader1';
import deleteicon from '../../assets/images/common/deleteicon.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Account, MoaclubInfo } from '../../type/commonType';

// API 호출 함수 정의
const getAccountListByType = async (userIdx: string, type: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BESERVERURI}/api/user/account-list`,
      {
        params: { userIdx, type },
      }
    );
    return response.data.data[0]; // 데이터를 직접 반환 (첫 번째 요소)
  } catch (error) {
    console.error(error);
    return null; // 오류 발생 시 null 반환
  }
};

function MoaclubAutoTrsfRegister() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const type = 'DEPOSIT';
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
  const [inAccId, setInAccId] = useState('');

  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;

  const getMoaClubInfo = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
        {
          userIdx,
          accountId,
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountData = await getAccountListByType(userIdx, type);
      setAccount(accountData);
      if (userIdx && accountId) {
        const moaClubInfoRes = await getMoaClubInfo(userIdx, accountId);
        setMoaclub(moaClubInfoRes);
        setInAccId(moaClubInfoRes.accountId);
      }
    };

    fetchAccounts();
  }, [userIdx, type]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(event.target.value);
  };

  const next = () => {
    console.log(selectedAccount);
    navigate('/moaclub/autotrsf/pw', {
      state: { selectedAccount, inAccId, moaclub },
    });
  };

  const getAccCode = (accountId: string) => {
    return accountId.slice(-7);
  };

  const nextStage = () => {
    const div1 = document.getElementById('withdraw-box4');
    const div2 = document.getElementById('celub-withdraw-overlay');

    if (div1) {
      div1.style.display = 'block';
    }
    if (div2) {
      div2.style.display = 'block';
    }

    setIsDisabled(true);
  };

  const beforeStage = () => {
    const div1 = document.getElementById('withdraw-box4');
    const div2 = document.getElementById('celub-withdraw-overlay');

    if (div1) {
      div1.style.display = 'none';
    }
    if (div2) {
      div2.style.display = 'none';
    }

    setIsDisabled(false);
  };

  const getCurrencyValue = (currency: string) => {
    switch (currency) {
      case 'KRW':
        return '원';
      case 'CNY':
        return '위안';
      case 'JPY':
        return '엔';
      case 'USD':
        return '달러';
    }
  };

  const currencyValue = getCurrencyValue(moaclub?.currency!);

  return (
    <>
      <div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
      <Header value='자동이체 설정' disabled={isDisabled} />
      <div className='content'>
        <div>
          <div className='withdrawMsg'>
            <div>
              <h3 className='narrowLine'>
                앞으로 아래 계좌에서
                <br />
                출금할요.
              </h3>
            </div>
            <div>
              <h4>
                모아클럽에 설정된 회비 규칙이
                <br />
                적용됩니다.
              </h4>
            </div>
          </div>
        </div>
        <div className='withdraw-box1'>
          <h4>출금계좌</h4>
          <div className='withdraw-box2'>
            <label htmlFor='lang' style={{ fontSize: '12px' }}>
              출금계좌
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
          onClick={nextStage}
          disabled={!selectedAccount}
        />
      </div>

      <div>
        <div className='withdraw-box7' id='withdraw-box4'>
          <div className='moaclub-box6'>
            <img
              className='deleteicon'
              src={deleteicon}
              onClick={beforeStage}
              alt='deleteIcon'
            />
          </div>
          <div>
            <div>아래 내용의 자동이체를</div>
            <div>&nbsp;등록하시겠습니까?</div>
            <div className='moaAutoTrsfDetailPopUp'>
              <table className='moaAutoTrsfDetailPopUpTable'>
                <tbody>
                  <tr>
                    <th>은행명</th>
                    <td>하나원픽</td>
                  </tr>
                  <tr>
                    <th>출금계좌</th>
                    <td>{selectedAccount}</td>
                  </tr>
                  <tr>
                    <th>이체정보</th>
                    <td>
                      매월 {moaclub?.atDate}일 {moaclub?.clubFee}
                      {currencyValue}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='moaclub-box5'>
            <CommonBtn
              type='pink'
              value='등록하기'
              onClick={next}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MoaclubAutoTrsfRegister;
