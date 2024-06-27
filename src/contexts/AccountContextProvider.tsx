import React, { createContext, useState } from 'react';

// Context 생성
const AccountContext = createContext({});

// Context 내용 설정
const AccountContextProvider = ({ children }: { children: any }) => {
  // 변수
  /* TODO */
  const [userIdx, setUserIdx] = useState(
    '550e8400-e29b-41d4-a716-446655440000'
  );
  const [amount, setAmount] = useState(0);
  const [outAccId, setOutAccId] = useState('02-00-0010124');
  const [outAccBalance, setOutBalance] = useState(100000);
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
