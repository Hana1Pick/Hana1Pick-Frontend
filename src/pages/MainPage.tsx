import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { To, useNavigate } from 'react-router-dom';
import hanaLogo from '../assets/images/common/hanaBankLogo.png';
import menuIcon from '../assets/images/alarm/black_alarm_icon.png';
import celubIcon from '../assets/images/main/main_celub_icon.png';
import moaIcon from '../assets/images/main/main_moa_logo.png';
import MenuBar from '../components/menubar/MenuBar';
import './style.scss';
import { useSwipeable } from 'react-swipeable';
import NavBar from '../components/alarm/NavBar';
import Exchange from '../components/exchange';
import LoadingSpinner from '../components/loading/boxLoading'; // 로딩 스피너 컴포넌트 임포트
import moaLogoIcon from '../assets/images/main/moa_logo.png'; 

interface Account {
	id: string;
	name: string;
	accountId: string;
	accountType: string;
	balance: number;
	currency?: string;
}

const MainPage = () => {
	const [accounts, setAccounts] = useState<Account[]>([]); // 계좌 데이터
	const [currentIndex, setCurrentIndex] = useState(0); // 스와이프: 현재 계좌 인덱스
	const navigate = useNavigate();
	// 사용자 정보
	const name = localStorage.getItem('name');
	const profile = localStorage.getItem('profile');
	const [isNavOpen, setIsNavOpen] = useState(false); // 햄버거 메뉴바
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태

	const userIdx = localStorage.getItem('userIdx');
	const [notificationCount, setNotificationCount] = useState(0);

	const getNotifications = async (userIdx: string) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BESERVERURI}/api/notification/${userIdx}`
			);
			console.log(response.data.data);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchNotifications = async () => {
			if (userIdx) {
				const notificationRes = await getNotifications(userIdx);
				if (notificationRes) {
					setNotificationCount(notificationRes.length);
				}
			}
		};
		fetchNotifications();

		if (!userIdx) {
			console.error('User is not logged in or access token is missing');
			return;
		}

		const fetchAccounts = async () => {
			try {
				const url = `${process.env.REACT_APP_BESERVERURI}/api/user/accounts/list`;
				const response = await axios.get(url, {
					params: { userIdx: userIdx },
				});

				if (response.data && response.data.data) {
					const accountsWithCurrency = await Promise.all(
						response.data.data.map(async (account: Account) => {
							if (account.accountType === 'moaclub') {
								const moaClubInfo = await axios.post(
									`${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
									{
										userIdx: userIdx,
										accountId: account.accountId,
									},
									{ headers: { 'Content-Type': 'application/json' } }
								);

								if (moaClubInfo.data.status === 200) {
									account.currency = moaClubInfo.data.data.currency;
								}
							} else {
								account.currency = 'KRW';
							}

							return account;
						})
					);

					setAccounts(accountsWithCurrency);
				} else {
					console.error('No data found in response', response);
				}
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchAccounts();
	}, [userIdx]);

	// 페이지 이동 함수
	const handleNavigate = (path: To) => {
		navigate(path);
	};

	// 스와이프 이벤트 핸들러
	const handlers = useSwipeable({
		onSwipedLeft: () =>
			setCurrentIndex((prev) => Math.min(prev + 1, accounts.length - 1)),
		onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
		trackMouse: true,
	});

	// 계좌 클릭 이벤트 핸들러
	const handleAccountClick = (account: Account) => {
		switch (account.accountType) {
			case 'moaclub':
				navigate(`/moaclub/main/${account.accountId}`);
				break;
			case 'deposit':
				navigate(`/deposit/detail/${account.accountId}`);
				break;
			default:
				console.error('Unknown account type');
		}
	};

	// 보내기 버튼 클릭 이벤트 핸들러
	const handleSendClick = (account: Account) => {
		if (account.accountType === 'moaclub') {
			navigate(`/moaclub/deposit/${account.accountId}`);
		} else if (account.accountType === 'deposit') {
			navigate(`/cash-out/account`, {
				state: {
					accountId: account.accountId,
					name: account.name,
					balance: account.balance,
				},
			});
		}
	};

	const getCurrencySymbol = (currency: string) => {
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

	const formatCurrency = (amount: number, currency: string) => {
		const currencySymbol = getCurrencySymbol(currency);

		if (currency === 'KRW') {
			return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
		} else {
			return `${currencySymbol}${amount.toFixed(2)}`;
		}
	};

	return (
		<>
			<div className='mainPage'>
				<div className='header'>
					<div className='profile-pic'>
						{profile ? (
							<img className='profile-pic' src={profile} alt='profile-pic' />
						) : (
							<img className='default-pic' src={hanaLogo} alt='default-pic' />
						)}
					</div>
					<div className='user-name'>{name} 님</div>
					<div className='menu-icon' onClick={() => setIsNavOpen(true)}>
						{' '}
						{/* 햄버거 메뉴바 부분 */}
						<img src={menuIcon} alt='menu-icon' />
						{notificationCount > 0 && <div className='red-dot'></div>}
					</div>
				</div>

				<div className='account-container' {...handlers}>
					<div
						className='account-details'
						style={{
							transform:
								accounts.length > 1
									? `translateX(-${currentIndex * 100}%)`
									: 'none',
							transition:
								accounts.length > 1 ? 'transform 0.3s ease-in-out' : 'none',
						}}
					>
						{isLoading ? (
							<LoadingSpinner />
						) : (
							<>
								{accounts.filter(
									(account) => account.accountType !== 'celublog'
								).length > 0 ? (
									accounts
										.filter((account) => account.accountType !== 'celublog')
										.map((account) => {
											return (
												<div
													className='accountBox'
													key={account.accountId}
													onClick={() => handleAccountClick(account)}
												>
													<div className='imgContainer'>
														<img
															src={account.accountType === 'moaclub' ? moaLogoIcon : hanaLogo}
															alt='logo'
														/>
													</div>
													<div className='accountDetail'>
														<p className='account-type'>
															{account.name}
															{account.accountType === 'deposit'
																? '의 통장'
																: ''}
														</p>
														<p className='account-number'>
															{account.accountId}
														</p>
														<div
															className='account-balance'
															style={{
																fontWeight: 500,
																marginTop: '0.5rem',
																fontSize: '1.3rem',
															}}
														>
															{formatCurrency(
																account.balance,
																account.currency || 'KRW'
															)}
														</div>
														<button
															className='send-button'
															onClick={(e) => {
																e.stopPropagation(); // 계좌 클릭 이벤트 버블링 방지
																handleSendClick(account);
															}}
														>
															{account.accountType === 'moaclub'
																? '입금하기'
																: '이체하기'}
														</button>
													</div>
												</div>
											);
										})
								) : (
									<div className='accountBox'>
										<div>
											<img src={hanaLogo} alt='logo' />
										</div>
											<div className='accountDetail'>
												<p className='account-type'>계좌가 없습니다.</p>
												<button
													id='basicBtn1'
													className='send-button'
													onClick={() => handleNavigate('/deposit')}
												>
													계좌 추가하기
												</button>
											</div>
										</div>
									)}
								</>
							)}
						</div>
						<div className='scrollbar'>
							{accounts.filter((account) => account.accountType !== 'celublog')
								.length > 1 && (
								<div
									className='scrollbar-indicator'
									style={{
										width: `${100 / accounts.filter((account) => account.accountType !== 'celublog').length}%`,
										transform: `translateX(${currentIndex * 100}%)`,
										transition:
											accounts.length > 1 ? 'transform 0.3s ease-in-out' : 'none',
									}}
								></div>
							)}
						</div>
					</div>

					<div className='promotions'>
						<div className='promotion'>
							<img src={celubIcon} alt='celubIcon' style={{ width: '3rem' }} />

							<div className='promotionDetail'>
								<p className='promotionSubTitle'>최애와 함께 저축 습관 들이기!</p>
								<button onClick={() => handleNavigate('/celub')}>
									셀럽로그 시작하기
								</button>
							</div>
						</div>
						<div className='promotion'>
							<img src={moaIcon} alt='moaIcon' style={{ width: '3rem' }} />
							<div className='promotionDetail'>
								<p className='promotionSubTitle'>
									최애가 같다면 함께 쓰는 모임통장!
								</p>
								<button onClick={() => handleNavigate('/moaclub/opening')}>
									모아클럽 시작하기
								</button>
							</div>
						</div>

						{/* 실시간 환율 정보  */}
						<div className='exchange-container'>
							<Exchange />
						</div>
					</div>
				</div>
				<MenuBar />
				<NavBar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />{' '}
				{/* 추가된 부분 */}
			</>
		);
	};

	export default MainPage;
