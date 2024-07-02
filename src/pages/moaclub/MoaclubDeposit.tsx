import Header from '../../layouts/MoaclubHeader1';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import MoaClubCircleLogo from '../../assets/images/account/MoaClubCircleLogo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CommonBtn from '../../components/button/CommonBtn';
import { Account, MoaclubInfo, MoaTrsf } from '../../type/commonType';
import { MoaclubTrsfContext } from '../../contexts/MoaclubTrsfContextProvider';

function MoaclubDeposit() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
	const [account, setAccount] = useState<Account | null>(null);
	const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
	const [amount, setAmount] = useState<string>('');
	const [amountKRW, setAmountKRW] = useState<string>('');
	const type = 'DEPOSIT';

	const { setInAccId, setOutAccId, setName, setTrsfAmount, setCurrency }: any = useContext(MoaclubTrsfContext);
	setInAccId(accountId);

	const getAccountListByType = async (userIdx: string, type: string) => {
		try {
			const response = await axios.get(`http://${process.env.REACT_APP_BESERVERURI}/api/user/account-list`, {
				params: { userIdx, type },
			});
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

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event?.target.value;
		setAmount(value);
		setTrsfAmount(value);
	};

	const getAccCode = (accountId: string) => {
		return accountId.slice(-7);
	};

	const getMoaClubInfo = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`, {
				userIdx,
				accountId,
			});
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

	return (
		<>
			<Header value='모아클럽 입금' disabled={false} />
			<div className='content'>
				<div className='moaDepositContainer'>
					<div className='moaDepositTxt'>입금계좌</div>
					<div className='moaDepositInfoBox'>
						<img src={MoaClubCircleLogo} className='moaAccCircle' />
						<div className='moaDepositDetailBox'>
							<div>모아클럽</div>
							<div>{moaclub?.accountId}</div>
						</div>
					</div>
					<div className='moaDepositSelectContainer'>
						<div className='moaDepositTxt'>출금계좌</div>
						<select name='languages' id='lang' className='moaClubDepositSelect' onChange={handleSelectChange}>
							<option value='' disabled selected>
								계좌를 선택해 주세요.
							</option>
							{account && (
								<option value={account.accountId}>
									{account.name}의 입출금 계좌 ({getAccCode(account.accountId)})
								</option>
							)}
						</select>
						{moaclub?.currency === 'KRW' ? (
							<div>
								<input className='moaDepositAmountInput' type='text' value={amount} onChange={handleAmountChange} />
								{currencyDetails?.currencySymbol}
							</div>
						) : (
							<div>
								<div className='moaExchangeTxt'>환전하기</div>
								<div className='moaDepositAmountContainer'>
									<div className='moaDepositAmountBox'>
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
											/>
											<div>{currencyDetails?.currencySymbol}</div>
										</div>
									</div>
								</div>
								<div className='moaDepositChange'>=</div>
								<div className='moaDepositAmountContainer'>
									<div className='moaDepositAmountBox'>
										<div className='moaDepositFixedBox'>
											<div className='moaDepositCountry'>🇰🇷 한국</div>
											<div className='moaDepositSymbol'>KRW</div>
										</div>
										<div className='moaDepositInputBox2'>
											<input
												className='moaDepositAmountInput2'
												type='text'
												value={amountKRW}
												onChange={(e) => setAmountKRW(e.target.value)}
											/>
											<div>원</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='buttonContainer'>
				<CommonBtn type='pink' value='다음' onClick={next} disabled={!selectedAccount} />
			</div>
		</>
	);
}

export default MoaclubDeposit;
