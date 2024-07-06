import React, { useContext, useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import Header from '../../layouts/MoaclubHeader1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Account } from '../../type/commonType';
import { MoaclubContext } from '../../contexts/MoaclubContextProvider';

// API 호출 함수 정의
const getAccountListByType = async (userIdx: string, type: string) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_BESERVERURI}/api/user/account-list`,
			{
				params: { userIdx, type },
			}
		);
		return response.data.data[0]; // 데이터를 직접 반환 (첫 번째 요소)
	} catch (error) {
		console.error(error);
		return null; // 오류 발생 시 null 반환
	}
};

function MoaclubSelectAcc() {
	const navigate = useNavigate();
	const [account, setAccount] = useState<Account | null>(null);
	const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
	const type = 'DEPOSIT';

	const { userIdx, setAccountId }: any = useContext(MoaclubContext);

	useEffect(() => {
		const fetchAccounts = async () => {
			const accountData = await getAccountListByType(userIdx, type);
			setAccount(accountData);
		};

		fetchAccounts();
	}, [userIdx, type]);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAccount(event.target.value);
		setAccountId(event.target.value);
	};

	const next = () => {
		if (selectedAccount) {
			navigate('/moaclub/create');
		}
	};

	const getAccCode = (accountId: string) => {
		return accountId.slice(-7);
	};

	return (
		<>
			<Header value='모아클럽' disabled={false} />
			<div className='content'>
				<div>
					<div className='withdrawMsg'>
						<div>
							<h3 className='narrowLine'>
								모아클럽과 연결될 계좌를
								<br />
								선택해 주세요.
							</h3>
						</div>
						<div>
							<h4>
								연결 계좌는 변경할 수 없으니
								<br />
								신중하게 선택해 주세요.
							</h4>
						</div>
					</div>
				</div>
				<div className='withdraw-box1'>
					<h4>연결계좌</h4>
					<div className='withdraw-box2'>
						<label htmlFor='lang' style={{ fontSize: '12px' }}>
							연결계좌
						</label>{' '}
						&nbsp;
						<select
							name='languages'
							id='lang'
							style={{ border: '0', width: '70%', backgroundColor: '#F8F8F9' }}
							onChange={handleSelectChange}
						>
							<option value='' disabled selected>
								계좌를 선택해 주세요.
							</option>
							{account && (
								<option value={account.accountId}>
									{account.name}의 입출금 계좌 ({getAccCode(account.accountId)})
								</option>
							)}
						</select>
					</div>
				</div>
			</div>

			<div className='buttonContainer'>
				<CommonBtn
					type='pink'
					value='다음'
					onClick={next}
					disabled={!selectedAccount}
				/>
			</div>
		</>
	);
}

export default MoaclubSelectAcc;
