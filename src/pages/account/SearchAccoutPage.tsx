import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';

import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';
import AccountCard from '../../components/card/AccountCard';
import './AccountStyle.scss';
import { AccountContext } from '../../contexts/AccountContextProvider';

function SearchAccountPage() {
  const { outAccId }: any = useContext(AccountContext);
  const [accId, setAccId] = useState([]);

  const handleInputChange = (event: any) => {
    const url = `http://${process.env.REACT_APP_BESERVERURI}/api/account/cash-out/history`;

    const data = {
      outAccId: outAccId,
      query: event.target.value,
    };

    axios
      .get(url, { params: data })
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
              <AccountCard key={index} value={item} />
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

  const navigate = useNavigate();
  const next = () => {
    navigate('/cash-out/amount');
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
        <CommonBtn type='black' value='다음' onClick={next} disabled={false} />
      </div>
    </div>
  );
}

export default SearchAccountPage;
