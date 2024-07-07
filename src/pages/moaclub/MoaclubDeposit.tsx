import Header from '../../layouts/MoaclubHeader1';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import MoaClubCircleLogo from '../../assets/images/account/MoaClubCircleLogo.png';
import CircleLogo from '../../assets/images/common/circle-logo.png';
import deleteicon from '../../assets/images/common/deleteicon.png';
import exchangeIcon from '../../assets/images/moaclub/exchange.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CommonBtn from '../../components/button/CommonBtn';
import { Account, MoaclubInfo, MoaTrsf } from '../../type/commonType';
import { MoaclubTrsfContext } from '../../contexts/MoaclubTrsfContextProvider';
import PageLoadingSpinner from '../../components/pageLoding/pageLoading';
import { useTranslation } from 'react-i18next';

function MoaclubDeposit() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
	const [account, setAccount] = useState<Account | null>(null);
	const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
	const [amount, setAmount] = useState<string>('');
	const [amountKRW, setAmountKRW] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const type = 'DEPOSIT';
	const [showExchangeResult, setShowExchangeResult] = useState<boolean>(false); // 환전 결과 표시 상태 추가

	const { setInAccId, setOutAccId, setName, setTrsfAmount, setCurrency }: any =
		useContext(MoaclubTrsfContext);
	setInAccId(accountId);

	const exchangeResultRef = useRef<HTMLDivElement>(null); // 환전 결과 섹션 참조
	const amountInputRef = useRef<HTMLInputElement>(null); // amount input 참조

	const [exchangeInfo, setExchangeInfo] = useState<{
		appliedExchangeRate: string;
		exchangeFee: string;
		paymentAmount: number;
	} | null>(null);

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
		setOutAccId(event.target.value);
	};

	const handleAmountChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event?.target.value;
		setAmount(value);
		setTrsfAmount(value);

		if (moaclub?.currency && value) {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BESERVERURI}/api/exchange/calculate`,
					{
						params: {
							fromCurrency: 'KRW',
							toCurrency: moaclub.currency,
							amount: value,
						},
					}
				);
				console.log(response.data);
				setAmountKRW(response.data);
			} catch (error) {
				console.error('Error fetching converted amount:', error);
			}
		}
	};

	const handleExchange = async () => {
		setIsLoading(true); // 로딩 상태 시작
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BESERVERURI}/api/exchange/calculate`,
				{
					params: {
						fromCurrency: moaclub?.currency,
						toCurrency: 'KRW',
						amount: amount,
					},
				}
			);
			setAmountKRW(response.data.amountKRW);
			setShowExchangeResult(true); // 환전 결과 표시 상태 설정

			// 환전 수수료 정보를 가져오는 요청
			const feeInfoResponse = await axios.get(
				`${process.env.REACT_APP_BESERVERURI}/api/exchange/fee-info`,
				{
					params: {
						currency: moaclub?.currency,
						amount: amount,
					},
				}
			);
			setExchangeInfo(feeInfoResponse.data.data);

			// 로딩이 끝난 후 화면 스크롤 이동
			setTimeout(() => {
				if (exchangeResultRef.current) {
					exchangeResultRef.current.scrollIntoView({ behavior: 'smooth' });
				}
			}, 500); // 500ms 후에 스크롤 이동 (로딩 스피너가 보이도록)
		} catch (error) {
			console.error('Error fetching converted amount:', error);
		} finally {
			setIsLoading(false); // 로딩 상태 종료
		}
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
				setAmount(moaClubInfoRes.clubFee);
				console.log(moaClubInfoRes);
				setName(moaClubInfoRes.name);
				setCurrency(moaClubInfoRes.currency);
				setTrsfAmount(moaClubInfoRes.clubFee);
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
		navigate(`/moaclub/deposit/pw`);
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

	const handleAmountBoxClick = () => {
		if (amountInputRef.current) {
			amountInputRef.current.focus();
			setAmount(''); // 기존 값 초기화
		}
	};


	return (
		<>
		  <div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
		  <Header value={t('moaclub_deposit_title')} disabled={isDisabled} />
	
		  <div className='content'>
			<div className='moaDepositContainer'>
			  <div className='moaDepositTxt'>{t('deposit_account')}</div>
			  <div className='moaDepositInfoBox'>
				<img src={MoaClubCircleLogo} className='moaAccCircle' alt='Moa Club Circle Logo' />
				<div className='moaDepositDetailBox'>
				  <div>모아클럽</div>
				  <div>{moaclub?.accountId}</div>
				</div>
			  </div>
			  <div className='moaDepositSelectContainer'>
				<div className='moaDepositTxt'>{t('withdraw_account')}</div>
				<select
				  name='languages'
				  id='lang'
				  className='moaClubDepositSelect'
				  onChange={handleSelectChange}
				>
				  <option value='' disabled selected>
					{t('select_account')}
				  </option>
				  {account && (
					<option value={account.accountId}>
					  {account.name}의 입출금 계좌 ({getAccCode(account.accountId)})
					</option>
				  )}
				</select>
				{moaclub?.currency === 'KRW' ? (
				  <div className='moaDepositAmountBox' onClick={handleAmountBoxClick}>
					<input
					  className='moaDepositAmountInput'
					  type='text'
					  value={amount}
					  onChange={handleAmountChange}
					  ref={amountInputRef}
					/>
					{currencyDetails?.currencySymbol}
				  </div>
				) : (
				  <div>
					<div className='moaExchangeTxt'>{t('exchange_currency')}</div>
					<div className='moaDepositAmountContainer'>
					  <div className='moaDepositAmountBoxFx' onClick={handleAmountBoxClick}>
						<div className='moaDepositFixedBox'>
						  <div className='moaDepositCountry'>{currencyDetails?.country}</div>
						  <div className='moaDepositSymbol'>{currencyDetails?.symbol}</div>
						</div>
						<div className='moaDepositInputBox'>
						  <input
							className='moaDepositAmountInput2'
							type='text'
							value={amount}
							onChange={handleAmountChange}
							ref={amountInputRef}
						  />
						  <div>{currencyDetails?.currencySymbol}</div>
						</div>
					  </div>
					</div>
					<div className='moaDepositChange'>=</div>
					<div className='moaDepositAmountContainer'>
					  <div className='moaDepositAmountBoxFx'>
						<div className='moaDepositFixedBox'>
						  <div className='moaDepositCountry'>🇰🇷 한국</div>
						  <div className='moaDepositSymbol'>KRW</div>
						</div>
						<div className='moaDepositInputBox2'>
						  <input
							className='moaDepositAmountInput2'
							type='text'
							value={amountKRW}
							readOnly
						  />
						  <div className='moaDepositWon'>원</div>
						</div>
					  </div>
					</div>
					<div className='exchangebuttonContainer'>
					  <img
						className='moaExchangeIcon'
						src={exchangeIcon}
						alt='exchangeIcon'
						onClick={handleExchange}
					  />
					</div>
				  </div>
				)}
			  </div>
			</div>
		  </div>
	
		  <div className='buttonContainer'>
			<CommonBtn
			  type='pink'
			  value={t('next_button')}
			  onClick={nextStage}
			  disabled={!exchangeInfo}
			/>
		  </div>
	
		  <div>
			<div className='withdraw-box4' id='withdraw-box4'>
			  <div className='moaclub-box6'>
				<img className='deleteicon' src={deleteicon} onClick={beforeStage} alt='Delete Icon' />
			  </div>
			  <div>
				<img src={CircleLogo} className='moaAccCircle' style={{ marginBottom: '1rem' }} alt='Circle Logo' />
				<div>
				  <span className='moaWithdrawStrong'>{t('withdraw_confirmation', { clubName: moaclub?.name })}</span>
				  {t('deposit_amount_confirm', { amount: amount, symbol: currencyDetails?.currencySymbol })}
				</div>
				<div className='moaWithdrawInAccPopUp'>
				  {t('withdraw_account_info', { accountName: selectedAccount })}
				</div>
			  </div>
			  <div className='moaclub-box5'>
				<CommonBtn
				  type='pink'
				  value={t('deposit_button')}
				  onClick={next}
				  disabled={false}
				/>
			  </div>
			</div>
		  </div>
	
		  {isLoading && <PageLoadingSpinner />}{' '}
		  {/* Display loading spinner when loading */}
		  {!isLoading && showExchangeResult && exchangeInfo && (
			<div className='moaDepositAmountContainerFee' ref={exchangeResultRef}>
			  <div className='moaDepositFixedBoxFee'>
				<div className='moaDepositRow'>
				  <div className='moaDepositCountry'>{t('applied_exchange_rate')}</div>
				  <div className='moaDepositValue1'>{exchangeInfo.appliedExchangeRate.toLocaleString()} 원</div>
				</div>
				<div className='moaDepositRow'>
				  <div className='moaDepositCountry'>{t('exchange_fee')}</div>
				  <div className='moaDepositValue'>{exchangeInfo.exchangeFee.toLocaleString()} 원</div>
				</div>
				<div className='moaDepositRow'>
				  <div className='moaDepositCountry' style={{ color: '#000', fontWeight: '600' }}>{t('exchange_amount')}</div>
				  <div className='moaDepositValue1 large'>{exchangeInfo.paymentAmount.toLocaleString()} 원</div>
				</div>
			  </div>
			</div>
		  )}
		</>
	  );
	}

export default MoaclubDeposit;
