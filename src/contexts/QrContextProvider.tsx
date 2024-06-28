import React, { createContext, useState } from 'react';

// Context 생성
const QrContext = createContext({});

// Context 내용 설정
const QrContextProvider = ({ children }: { children: any }) => {
  // 변수
  const [amount, setAmount] = useState(0);
  const [inAccId, setInAccId] = useState('');

  // 반환값
  return (
    <QrContext.Provider
      value={{
        amount,
        setAmount,
        inAccId,
        setInAccId,
      }}
    >
      {children}
    </QrContext.Provider>
  );
};

export { QrContext, QrContextProvider };