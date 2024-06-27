import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';

import Header from '../../components/Header';
import AccountCard from '../../components/card/AccountCard';
import './AccountStyle.scss';
import { AccountContext } from '../../contexts/AccountContextProvider';

function SelectAccountPage() {
  const { userIdx, outAccId }: any = useContext(AccountContext);
  const [myAccId, setMyAccId] = useState([]);
  const [recentAccId, setRecentAccId] = useState([]);

  const url = `http://${process.env.REACT_APP_BESERVERURI}/api/account/cash-out`;
  const data = {
    userIdx: userIdx,
    outAccId: outAccId,
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
  const search = () => {
    navigate('/cash-out/account-query');
  };

  const next = () => {
    navigate('/cash-out/amount');
  };

  return (
    <div>
      <Header value='이체' />
      <div>
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
