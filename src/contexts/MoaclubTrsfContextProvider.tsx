import React, { createContext, useState } from 'react';

// Context 생성
const MoaclubTrsfContext = createContext({});

// Context 내용 설정
const MoaclubTrsfContextProvider = ({ children }: { children: any }) => {
	// 변수
	const userIdx = localStorage.getItem('userIdx') as string;
	const [outAccId, setOutAccId] = useState('');
	const [inAccId, setInAccId] = useState('');
	const [name, setName] = useState('');
	const [trsfAmount, setTrsfAmount] = useState(0);
	const [currency, setCurrency] = useState('');

	// 반환값
	return (
		<MoaclubTrsfContext.Provider
			value={{
				userIdx,
				outAccId,
				setOutAccId,
				inAccId,
				setInAccId,
				name,
				setName,
				trsfAmount,
				setTrsfAmount,
				currency,
				setCurrency,
			}}
		>
			{children}
		</MoaclubTrsfContext.Provider>
	);
};

export { MoaclubTrsfContext, MoaclubTrsfContextProvider };
