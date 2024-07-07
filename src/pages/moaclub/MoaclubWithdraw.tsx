import Header from '../../layouts/MoaclubHeader1';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import MoaClubCircleLogo from '../../assets/images/account/MoaClubCircleLogo.png';
import CircleLogo from '../../assets/images/common/circle-logo.png';
import deleteicon from '../../assets/images/common/deleteicon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommonBtn from '../../components/button/CommonBtn';
import { Account, MoaclubInfo } from '../../type/commonType';
import CommonModal3 from '../../components/modal/CommonModal3';
import { useTranslation } from 'react-i18next';

function MoaclubWithdraw() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
	const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
	const [account, setAccount] = useState<Account | null>(null);
	const [amount, setAmount] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const type = 'DEPOSIT';
	const [look, setLook] = useState(false);
	const [look2, setLook2] = useState(false);
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(
		localStorage.getItem('language') || i18n.language
	);

	useEffect(() => {
		if (language == 'KOR') i18n.changeLanguage('ko');
		else i18n.changeLanguage('ch');
	}, [language, i18n]);
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

	useEffect(() => {
		const fetchAccounts = async () => {
			const accountData = await getAccountListByType(userIdx, type);
			setAccount(accountData);
		};

		fetchAccounts();
	}, [userIdx, type]);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAccount(event.target.value);
	};

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event?.target.value;
		setAmount(value);
	};

	const getAccCode = (accountId: string) => {
		return accountId.slice(-7);
	};

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
		const fetchMoaclubInfo = async () => {
			if (userIdx && accountId) {
				const moaClubInfoRes = await getMoaClubInfo(userIdx, accountId);
				setMoaclub(moaClubInfoRes);
				console.log(moaClubInfoRes);
			}
		};
		fetchMoaclubInfo();
	}, [userIdx, accountId]);

	const getCurrencyDetails = (currency: string) => {
		switch (currency) {
			case 'KRW':
				return { country: '🇰🇷 한국', symbol: 'KRW', currencySymbol: '원' };
			case 'CNY':
				return { country: '🇨🇳 중국', symbol: 'CNY', currencySymbol: '위안' };
			case 'JPY':
				return { country: '🇯🇵 일본', symbol: 'JPY', currencySymbol: '엔' };
			case 'USD':
				return { country: '🇺🇸 미국', symbol: 'USD', currencySymbol: '달러' };
		}
	};

	const currencyDetails = getCurrencyDetails(moaclub?.currency!);

	const next = () => {
		const requestUrl = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/request-withdraw`;

		const requestData = {
			accountId: accountId,
			userIdx: userIdx,
			amount: amount,
		};

		axios
			.post(requestUrl, requestData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setLook(true);
				} else {
					setLook2(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
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

	return (
		<>
			<div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
			<Header value={t('moaClubWithdraw')} disabled={isDisabled} />
			<div className='content'>
				<div className='moaDepositContainer'>
					<div className='moaDepositTxt'>{t('withdrawAccount')}</div>
					<div className='moaDepositInfoBox'>
						<img
							src={MoaClubCircleLogo}
							className='moaAccCircle'
							alt='Moa Club'
						/>
						<div className='moaDepositDetailBox'>
							<div>{t('moaClub')}</div>
							<div>{moaclub?.accountId}</div>
						</div>
						<div className='moaWithdrawBalance'>
							{moaclub?.balance}
							{currencyDetails?.currencySymbol}
						</div>
					</div>
					<div className='moaDepositSelectContainer'>
						<div className='moaDepositTxt'>{t('depositAccount')}</div>
						<select
							name='languages'
							id='lang'
							className='moaClubDepositSelect'
							onChange={handleSelectChange}
						>
							<option value='' disabled selected>
								{t('selectAccount')}
							</option>
							{account && (
								<option value={account.accountId}>
									{account.name}의 {t('transactionAccount')} (
									{getAccCode(account.accountId)})
								</option>
							)}
						</select>
						<div>
							<div className='moaWithdrawTxt'>{t('withdrawAmount')}</div>
							<input
								className='moaDepositAmountInput'
								type='text'
								value={amount}
								onChange={handleAmountChange}
							/>
							{currencyDetails?.currencySymbol}
							{moaclub?.currency !== 'KRW' && (
								<div className='moaWithdrawWarn'>
									{t('exchangeRateWarning')}
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='moaWithdrawInfoTxt'>
					* {t('usageGuide')} <br />
					{t('withdrawalNotice')}
				</div>
			</div>

			<div className='buttonContainer'>
				<CommonBtn
					type='pink'
					value={t('next')}
					onClick={nextStage}
					disabled={!selectedAccount || !amount}
				/>
			</div>

			<div>
				<div className='withdraw-box4' id='withdraw-box4'>
					<div className='moaclub-box6'>
						<img
							className='deleteicon'
							src={deleteicon}
							onClick={beforeStage}
							alt='Delete Icon'
						/>
					</div>
					<div>
						<img
							src={CircleLogo}
							className='moaAccCircle'
							alt='Circle Logo'
							style={{ marginBottom: '1rem' }}
						/>
						<div>
							"{moaclub?.name}" {t('fromMoaClub')}
						</div>
						<div>
							<span className='moaWithdrawStrong'>
								{amount}
								{currencyDetails?.currencySymbol}
							</span>
							&nbsp;{t('requestWithdrawal')}
						</div>
						<div className='moaWithdrawInAccPopUp'>
							{t('depositAccount')} 하나원픽 {selectedAccount}
						</div>
					</div>
					<div className='moaclub-box5'>
						<CommonBtn
							type='pink'
							value={t('request')}
							onClick={next}
							disabled={false}
						/>
					</div>
				</div>
			</div>

			<CommonModal3
				msg={t('withdrawalCompleted')}
				show={look}
				onConfirm={() => {
					navigate(`/moaclub/vote/trsf/${accountId}`);
				}}
			/>

			<CommonModal3
				msg={t('requestExists')}
				show={look2}
				onConfirm={() => {
					navigate(`/moaclub/vote/trsf/${accountId}`);
				}}
			/>
		</>
	);
}
export default MoaclubWithdraw;
