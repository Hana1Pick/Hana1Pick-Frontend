import React, { useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import Header from '../../layouts/MoaclubHeader1';
import deleteicon from '../../assets/images/common/deleteicon.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Account, MoaclubInfo } from '../../type/commonType';
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

function MoaclubAutoTrsfRegister() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const navigate = useNavigate();
	const [account, setAccount] = useState<Account | null>(null);
	const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
	const type = 'DEPOSIT';
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
	const [inAccId, setInAccId] = useState('');

	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;

	const getMoaClubInfo = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
				{
					userIdx,
					accountId,
				}
			);
			console.log(response.data.data);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchAccounts = async () => {
			const accountData = await getAccountListByType(userIdx, type);
			setAccount(accountData);
			if (userIdx && accountId) {
				const moaClubInfoRes = await getMoaClubInfo(userIdx, accountId);
				setMoaclub(moaClubInfoRes);
				setInAccId(moaClubInfoRes.accountId);
			}
		};

		fetchAccounts();
	}, [userIdx, type]);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAccount(event.target.value);
	};

	const next = () => {
		console.log(selectedAccount);
		navigate('/moaclub/autotrsf/pw', {
			state: { selectedAccount, inAccId, moaclub },
		});
	};

	const getAccCode = (accountId: string) => {
		return accountId.slice(-7);
	};

	const nextStage = () => {
		const div1 = document.getElementById('withdraw-box4');
		const div2 = document.getElementById('celub-withdraw-overlay');

		if (div1) {
			div1.style.display = 'block';
		}
		if (div2) {
			div2.style.display = 'block';
		}

		setIsDisabled(true);
	};

	const beforeStage = () => {
		const div1 = document.getElementById('withdraw-box4');
		const div2 = document.getElementById('celub-withdraw-overlay');

		if (div1) {
			div1.style.display = 'none';
		}
		if (div2) {
			div2.style.display = 'none';
		}

		setIsDisabled(false);
	};

	const getCurrencyValue = (currency: string) => {
		switch (currency) {
			case 'KRW':
				return '원';
			case 'CNY':
				return '¥';
			case 'JPY':
				return '¥';
			case 'USD':
				return '$';
		}
	};

	const currencyValue = getCurrencyValue(moaclub?.currency!);

	const formatCurrency = (amount: number) => {
		if (amount === undefined) {
			return '';
		}
		const currencySymbol = getCurrencyValue(moaclub?.currency!);

		if (moaclub?.currency === 'KRW') {
			return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
		} else {
			return `${currencySymbol}${amount.toFixed(2)}`;
		}
	};

	return (
		<>
		  <div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
		  <Header value={t('autoTransferSetup.header')} disabled={isDisabled} />
		  <div className='content'>
			<div>
			  <div className='withdrawMsg'>
				<div>
				  <h3 className='narrowLine'>
					{t('autoTransferSetup.withdrawMsg1')}
					<br />
					{t('autoTransferSetup.withdrawMsg2')}
				  </h3>
				</div>
				<div>
				  <h4>{t('autoTransferSetup.feeRuleApplied')}</h4>
				</div>
			  </div>
			</div>
			<div className='withdraw-box1'>
			  <h4>{t('autoTransferSetup.withdrawAccount')}</h4>
			  <div className='withdraw-box2'>
				<label htmlFor='lang' style={{ fontSize: '12px' }}>
				  {t('autoTransferSetup.bankName')}
				</label>{' '}
				&nbsp;
				<select
				  name='languages'
				  id='lang'
				  style={{ border: '0', width: '70%', backgroundColor: '#F8F8F9' }}
				  onChange={handleSelectChange}
				>
				  <option value='' disabled selected>
					{t('autoTransferSetup.selectAccount')}
				  </option>
				  {/* Replace with actual logic to map account options */}
				</select>
			  </div>
			</div>
		  </div>
	
		  <div className='buttonContainer'>
			<CommonBtn
			  type='pink'
			  value={t('autoTransferSetup.registerBtn')}
			  onClick={nextStage}
			  disabled={!selectedAccount}
			/>
		  </div>
	
		  <div className='withdraw-box7' id='withdraw-box4'>
			<div className='moaclub-box6'>
			  <img
				className='deleteicon'
				src={deleteicon}
				onClick={beforeStage}
				alt='deleteIcon'
			  />
			</div>
			<div>
			  <div>{t('autoTransferSetup.transferInfo')}</div>
			  <div>{t('autoTransferSetup.registerBtn')}</div>
			  <div className='moaAutoTrsfDetailPopUp'>
				<table className='moaAutoTrsfDetailPopUpTable'>
				  <tbody>
					<tr>
					  <th>{t('autoTransferSetup.bankName')}</th>
					  <td>하나원픽</td>
					</tr>
					<tr>
					  <th>{t('autoTransferSetup.withdrawAccount')}</th>
					  <td>{selectedAccount}</td>
					</tr>
					<tr>
					  <th>{t('autoTransferSetup.transferInfo')}</th>
					  <td>
						매월 {moaclub?.atDate}일{' '}
						{formatCurrency(moaclub?.clubFee!)}
					  </td>
					</tr>
				  </tbody>
				</table>
			  </div>
			</div>
			<div className='moaclub-box5'>
			  <CommonBtn
				type='pink'
				value={t('autoTransferSetup.registerBtn')}
				onClick={next}
				disabled={false}
			  />
			</div>
		  </div>
		</>
	  );
	}

export default MoaclubAutoTrsfRegister;
