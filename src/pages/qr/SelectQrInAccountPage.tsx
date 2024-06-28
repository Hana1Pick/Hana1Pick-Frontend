import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AccountCard from '../../components/account/AccountCard';
import './QrStyle.scss';
import { QrContext } from '../../contexts/QrContextProvider';

function CreateQrPage() {
  const { setInAccId }: any = useContext(QrContext);

  const userIdx = '550e8400-e29b-41d4-a716-446655440000';
  /* TODO
    const userIdx = localStorage.getItem('userIdx');
    */
  const [myAccId, setMyAccId] = useState([]);
  const url = `http://${process.env.REACT_APP_BESERVERURI}/api/user/accounts/list`;
  const data = {
    userIdx: userIdx,
  };

  useEffect(() => {
    axios
      .get(url, { params: data })
      .then((res) => {
        setMyAccId(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const next = (value: any) => {
    setInAccId(value.accountId);
    navigate('/qr/cash-in/amount');
  };

  const renderAccounts = (title: string, accounts: any[]) => {
    return (
      <div className='block'>
        <span className='blockSpan'>{title}</span>
        <div className='blockContent'>
          {accounts && accounts.length > 0 ? (
            accounts.map((item, index) => (
              <AccountCard
                key={index}
                value={item}
                onClick={() => next(item)}
              />
            ))
          ) : (
            <span className='blockContentSpan'>
              데이터가 존재하지 않습니다.
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header value='QR 코드 발급' />
      <div id='main'>
        <div id='mainInfo'>QR 코드로 송금받아보세요.</div>
        {renderAccounts('입금받을 계좌', myAccId)}
      </div>
    </div>
  );
}

export default CreateQrPage;