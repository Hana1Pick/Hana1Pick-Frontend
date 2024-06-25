import axios from 'axios';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';
import AccountCard from '../../components/card/AccountCard';
import './../../common/styles/scss/AccountStyle.css';

function SearchAccountPage() {
  const [accId, setAccId] = useState([]);

  const handleInputChange = (event: any) => {
    const url = `http://${process.env.REACT_APP_BE_SERVER_URI}/api/account/cash-out/history`;

    /* TODO */
    console.log(event.target.value);
    const data = {
      outAccId: '02-00-0010124',
      query: event.target.value,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        setAccId(res.data.data.accId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const next = () => {
    window.location.href = `http://${process.env.REACT_APP_FE_SERVER_URI}/cash-out/amount`;
  };

  return (
    <div>
      <Header value='이체' />
      <div id='main'>
        <div id='searchbar'>
          <IoSearchOutline id='searchIcon' />
          <input
            id='accountId'
            placeholder='받는 사람 이름 또는 계좌번호'
            type='text'
            onChange={handleInputChange}
          />
        </div>
        {renderAccounts('계좌번호', accId)}
      </div>
      <div id='nextBtn'>
        <CommonBtn type='black' value='다음' onClick={next} />
      </div>
    </div>
  );
}

export default SearchAccountPage;
