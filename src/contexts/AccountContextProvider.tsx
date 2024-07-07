import React, { createContext, useState } from 'react';

// Context 생성
const AccountContext = createContext({});

// Context 내용 설정
const AccountContextProvider = ({ children }: { children: any }) => {
  // 변수
  const [userIdx, setUserIdx] = useState(localStorage.getItem('userIdx') || '');
  const [amount, setAmount] = useState(0);
  /* TODO */
  const [outAccId, setOutAccId] = useState('02-00-0010124');
  const [outAccName, setOutAccName] = useState('가원이의 입출금 통장');
  const [outAccBalance, setOutBalance] = useState(100000);
  /* TODO 끝*/
  const [inAccType, setInAccType] = useState('');
  const [inAccId, setInAccId] = useState('');
  const [inAccName, setInAccName] = useState('');

  // 반환값
  return (
    <AccountContext.Provider
      value={{
        userIdx,
        setUserIdx,
        amount,
        setAmount,
        outAccId,
        setOutAccId,
        outAccName,
        setOutAccName,
        outAccBalance,
        setOutBalance,
        inAccType,
        setInAccType,
        inAccId,
        setInAccId,
        inAccName,
        setInAccName,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountContextProvider };
