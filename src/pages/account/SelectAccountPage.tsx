import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import Header from '../../components/Header';
import AccountCard from '../../components/card/AccountCard';
import './../../common/styles/scss/AccountStyle.css';

function SelectAccountPage() {
  const [myAccId, setMyAccId] = useState([]);
  const [recentAccId, setRecentAccId] = useState([]);

  const url = `http://${process.env.REACT_APP_BE_SERVER_URI}/api/account/cash-out`;

  /* TODO */
  const data = {
    userIdx: '550e8400-e29b-41d4-a716-446655440000',
    outAccId: '02-00-0010124',
  };

  useEffect(() => {
    axios
      .get(url, { params: data })
      .then((res) => {
        console.log(res.data);
        setMyAccId(res.data.data.myAccId);
        setRecentAccId(res.data.data.recentAccId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderAccounts = (title: string, accounts: any[]) => {
    return (
      <div className='block'>
        <span className='blockSpan'>{title}</span>
        <div className='blockContent'>
          {accounts && accounts.length > 0 ? (
            accounts.map((item, index) => (
              <AccountCard key={index} value={item} onClick={next} />
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

  const search = () => {
    window.location.href = `http://${process.env.REACT_APP_FE_SERVER_URI}/cash-out/account-query`;
  };

  const next = () => {
    window.location.href = `http://${process.env.REACT_APP_FE_SERVER_URI}/cash-out/amount`;
  };

  return (
    <div>
      <Header value='이체' />
      <div id='main'>
        <div id='searchbar' onClick={search}>
          <IoSearchOutline id='searchIcon' />
          <span id='searchSpan'>받는 사람 이름 또는 계좌번호</span>
        </div>
        {renderAccounts('내 계좌', myAccId)}
        {renderAccounts('최근 보낸 계좌', recentAccId)}
      </div>
    </div>
  );
}

export default SelectAccountPage;
