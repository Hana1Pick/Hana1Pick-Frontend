import React, { useContext, useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import Header from '../../layouts/MoaclubHeader1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Account } from '../../type/commonType';
import { MoaclubContext } from '../../contexts/MoaclubContextProvider';
import { useTranslation } from 'react-i18next';

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
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('nation') || i18n.language);
  
	useEffect(() => {
	 if(language=="Korea") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	
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
		  <Header value={t('moaclub.header')} disabled={false} />
		  <div className='content'>
			<div className='withdrawMsg'>
			  <div>
				<h3 className='narrowLine'>{t('moaclub.withdrawMsg1')}</h3>
			  </div>
			  <div>
				<h4>{t('moaclub.withdrawMsg2')}</h4>
			  </div>
			</div>
			<div className='withdraw-box1'>
			  <h4>{t('moaclub.connectAccountLabel')}</h4>
			  <div className='withdraw-box2'>
				<label htmlFor='lang' style={{ fontSize: '12px' }}>
				  {t('moaclub.connectAccountLabel')}
				</label>{' '}
				&nbsp;
				<select
				  name='languages'
				  id='lang'
				  style={{ border: '0', width: '70%', backgroundColor: '#F8F8F9' }}
				  onChange={(e) => {
					handleSelectChange(e);
					setSelectedAccount(e.target.value);
				  }}
				>
				  <option value='' disabled selected>
					{t('moaclub.selectAccountPlaceholder')}
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
			  value={t('moaclub.nextButton')}
			  onClick={next}
			  disabled={!selectedAccount}
			/>
		  </div>
		</>
	  );
	}

export default MoaclubSelectAcc;
