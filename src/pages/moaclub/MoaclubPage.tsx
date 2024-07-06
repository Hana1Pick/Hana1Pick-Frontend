import Header from '../../layouts/MoaclubHeader3';
import hanaLogo from '../../assets/images/common/hanaBankLogo.png';
import alarmLogo from '../../assets/images/common/hanaCircleLogo.png';
import chatIcon from '../../assets/images/moaclub/moa-chat-icon.png';
import './MoaclubStyle.scss';
import './MoaclubHanaStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoaclubAccHis, MoaclubInfo } from '../../type/commonType';

const MoaclubPage = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const userIdx = localStorage.getItem('userIdx') as string;

  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
  const [accountHistory, setAccountHistory] = useState<MoaclubAccHis[] | null>(
    null
  );
  const [isManager, setIsManager] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('alarm') === 'true') {
      showAlarm(localStorage.getItem('alarmMessage')!);

      // flag 초기화
      localStorage.removeItem('alarm');
      localStorage.removeItem('alarmMessage');
    }
  }, []);

  const showAlarm = (message: String) => {
    const alarmBox = document.getElementById('moaclubTopAlarmBox');
    const alarmContent = document.getElementById('moaclubTopAlarmContent');
    if (alarmBox && alarmContent) {
      alarmContent.innerHTML = `모아클럽<br/>${message}`;
      alarmBox.style.display = 'flex';
      alarmBox.style.animation = 'slideDown 0.5s forwards';

      setTimeout(() => {
        alarmBox.style.display = 'flex';
        alarmBox.style.animation = 'slideDown 0.5s forwards';

        setTimeout(() => {
          alarmBox.style.animation = 'slideUp 0.5s forwards';
          setTimeout(() => {
            alarmBox.style.display = 'none';
          }, 500); // slideUp 애니메이션의 지속 시간
        }, 2500); // slideDown 애니메이션 지속 시간 + 알림 표시 시간
      }, 1000); // 알림이 나타나기 전 지연 시간
    }
  };

  const getManagerCheck = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/moaclub/manager-check`,
        {
          userIdx,
          accountId,
        }
      );
      return response.data.data.check;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getMoaclubInfo = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
        {
          userIdx,
          accountId,
        }
      );
      console.log('1', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAccountHistory = async (accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/account`,
        {
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
    const fetchMoaclubInfo = async () => {
      if (userIdx && accountId) {
        const moaClubInfoRes = await getMoaclubInfo(userIdx, accountId);
        const accountHistoryRes = await getAccountHistory(accountId);
        const isManager = await getManagerCheck(userIdx, accountId);
        setMoaclub(moaClubInfoRes);
        setAccountHistory(accountHistoryRes);
        setIsManager(isManager);
      }
    };
    fetchMoaclubInfo();
  }, [userIdx, accountId]);

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'KRW':
        return '원';
      case 'CNY':
        return '¥';
      case 'JPY':
        return '¥';
      case 'USD':
        return '$';
    }
  };

  const currencyValue = getCurrencySymbol(moaclub?.currency!);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate.endsWith('.')
      ? formattedDate.slice(0, -1)
      : formattedDate;
  };

  const formatCurrency = (amount: number) => {
    if (amount === undefined) {
      return '';
    }
    const currencySymbol = getCurrencySymbol(moaclub?.currency!);

    if (moaclub?.currency === 'KRW') {
      return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
    } else {
      return `${currencySymbol}${amount.toFixed(2)}`;
    }
  };

  const goSetting = () => {
    console.log(accountId);
    navigate(`/moaclub/setting/${accountId}`);
  };

  const goFeeStatus = () => {
    navigate(`/moaclub/fee/${accountId}`);
  };

  const goMoaDeposit = () => {
    navigate(`/moaclub/deposit/${accountId}`);
  };

  const goMoaWithdraw = () => {
    navigate(`/moaclub/withdraw/${accountId}`);
  };

  const goChat = () => {
    navigate(`/moaclub/chat/${moaclub?.chatRoomId}`);
  };

  return (
    <>
      <div id='moaclubTopAlarmBox'>
        <img src={alarmLogo} alt='alarmTalk' />
        <div id='moaclubTopAlarmContent'></div>
        <div className='moaclubTopAlarmTime'>지금</div>
      </div>

      <Header value='거래내역조회' disabled={true} onClick={goSetting} />
      <div className='moaHanaContainer'>
        <div className='moaHanaInfoContainer'>
          <div className='moaHanaTitle'>
            <img src={hanaLogo} alt='hanaLogo' />
            <div>{moaclub?.name}</div>
          </div>
          <div className='moaHanaAccId'>{moaclub?.accountId}</div>
          <div
            className='memberListContainerHana'
            onClick={() => {
              navigate(`/moaclub/member/${accountId}`);
            }}
          >
            {moaclub?.memberList.map((member, index) => (
              <img
                key={index}
                src={member.profile}
                alt={member.userName}
                className='memberProfile'
              />
            ))}
          </div>
          <div className='moaHanaAccBalance'>
            {formatCurrency(moaclub?.balance!)}
          </div>
          <div className='moaHanaAccInfoBtnContainer'>
            <div className='moaclubHanaMainDeposit' onClick={goMoaDeposit}>
              입금하기
            </div>
            {isManager && (
              <div className='moaclubHanaMainWithdraw' onClick={goMoaWithdraw}>
                출금하기
              </div>
            )}
          </div>
        </div>
        <div className='moaHanaFeeRuleContainer' onClick={goFeeStatus}>
          <span className='moaclubHanaFeeRule'>
            매월 {moaclub?.atDate}일 {formatCurrency(moaclub?.clubFee!)}씩
          </span>{' '}
          | 입금현황 &#62;
        </div>
      </div>

      <div className='moaclubHana'>
        <table className='moaclubAccHisTable'>
          <tbody>
            {accountHistory && accountHistory.length > 0 ? (
              accountHistory.map((history, index) => (
                <tr key={index}>
                  <td className='moaclubDate'>
                    {formatDate(history.transDate)}
                  </td>
                  <td className='moaclubTarget'>{history.target}</td>
                  <td className='transaction'>
                    <span
                      id='moaclubTransAmountTxt'
                      className={
                        history.transAmount > 0 ? 'moaclubBlueTxt' : ''
                      }
                    >
                      {history.transAmount >= 0
                        ? `+${formatCurrency(history.transAmount)}`
                        : formatCurrency(history.transAmount)}
                    </span>
                    <span className='moaclubAccHisLast'>
                      {formatCurrency(history.balance)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ borderStyle: 'none' }}>
                  거래 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <img
        className='moaHanaMainChatIcon'
        src={chatIcon}
        alt='chhaticon'
        onClick={goChat}
      />
    </>
  );
};

export default MoaclubPage;
