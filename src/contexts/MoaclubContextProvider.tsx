import React, { createContext, useState } from 'react';

// Context 생성
const MoaclubContext = createContext({});

// Context 내용 설정
const MoaclubContextProvider = ({ children }: { children: any }) => {
  // 변수
  /* TODO */
  const [userIdx, setUserIdx] = useState(
    '550e8400-e29b-41d4-a716-446655440000'
  );
  const [accountId, setAccountId] = useState('');
  const [name, setName] = useState('');
  const [clubFee, setClubFee] = useState(0);
  const [atDate, setAtDate] = useState(1);
  const [currency, setCurrencyProvider] = useState('');
  const [moaclub, setMoaclub] = useState('');

  // 반환값
  return (
    <MoaclubContext.Provider
      value={{
        accountId,
        setAccountId,
        userIdx,
        setUserIdx,
        name,
        setName,
        clubFee,
        setClubFee,
        atDate,
        setAtDate,
        currency,
        setCurrencyProvider,
        moaclub,
        setMoaclub
      }}
    >
      {children}
    </MoaclubContext.Provider>
  );
};

export { MoaclubContext, MoaclubContextProvider };
