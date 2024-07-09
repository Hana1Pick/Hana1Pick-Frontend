import React, { useState, useEffect, ChangeEvent } from 'react';
import CelubHeader3 from '../../layouts/MoaclubHeader3';
import {
	CelubHistoryType,
	CelubRuleType,
	CelubAccountInfo,
	CelubHisType
} from '../../type/commonType';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/button/CommonBtn';
import './CelublogStyle.scss';
import axios from 'axios';
import qs from 'qs';
import CommonModal1 from '../../components/modal/CommonModal3';
import PageLoadingSpinner from '../../components/pageLoding/pageLoading';
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${month}.${day}`;
  }
const CelubDetail: React.FC = () => {
	interface DateDisplayProps {
		dateString: string;
	  }
	const navigate = useNavigate();
	const [hisList, setHisList] = useState<CelubHisType[]>([]);
 	const [look, setLook] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [startY, setStartY] = useState(0);
	const [startHeight, setStartHeight] = useState(0);
	const [isRule, setIsRule] = useState(true);
	const [isHistory, setIsHistory] = useState(false);
	const [isHashTag, setIsHashTag] = useState(true);
	const [ruleList, setRuleList] = useState<CelubRuleType[]>([]);
	const [historyList, setHistoryList] = useState<CelubHistoryType[]>([]);
	const [accountInfo, setAccountInfo] = useState<CelubAccountInfo>({
		accountId: '',
		balance: 0,
		name: '',
		imgSrc: '',
		outAccId: '',
		celebrityIdx: 0,
		duration: 0,
		createDate: '',
	});

	const [selectRule, setSelectRule] = useState('');
	const [selectRuleMoney, setSelectRuleMoney] = useState(0);
	const [isBoxVisible, setIsBoxVisible] = useState(false);
	const [selectedValue, setSelectedValue] = useState('#공통');
	const location = useLocation();
	const accountId = location.state;
	const [outBalance, setOutBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [minLoadingTimeReached, setMinLoadingTimeReached] = useState(false);

	useEffect(() => {
		const minLoadingTime = 1000;
		const timer = setTimeout(() => {
			setMinLoadingTimeReached(true);
		}, minLoadingTime);

		axios
			.post(
				`${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
				qs.stringify({ accountId: accountId })
			)
			.then((res) => {
				console.log(res.data.data);
				setRuleList(res.data.data.ruleInfo);
				setHistoryList(res.data.data.accountReport);
				setAccountInfo(res.data.data.accountInfo);
				setOutBalance(res.data.data.accountInfo.outAccBalance);
				setIsLoading(false);
			})
			.catch((error) => {
				alert('실패');
				setIsLoading(false);
			});

			axios.post(`${process.env.REACT_APP_BESERVERURI}/api/account`,
				{ accountId }			
			).then((res) => {
				setHisList(res.data.data);
				console.log(hisList);
			})

		return () => clearTimeout(timer);
	}, [isHistory]);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setStartY(e.touches[0].clientY);
		setStartHeight(
			document.documentElement.clientHeight -
				e.currentTarget.getBoundingClientRect().top
		);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		const currentY = e.touches[0].clientY;
		const deltaY = currentY - startY;
		const newHeight = startHeight - deltaY;

		if (newHeight >= document.documentElement.clientHeight) {
			setIsExpanded(true);
		} else {
			setIsExpanded(false);
		}
	};

	const handleTouchEnd = () => {
		if (isExpanded) {
			setIsExpanded(true);
		} else {
			setIsExpanded(false);
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('ko-KR').format(amount);
	};

	const rule = () => {
		setIsHistory(false);
		setIsRule(true);
	};
	const history = () => {
		setIsHistory(true);
		setIsRule(false);
	};
	const goMakeRule = () => {
		navigate('/celub/rule', { state: { accountId, ruleList } });
	};
	const setting = () => {
		navigate('/celub/setting', { state: accountId });
	};

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setIsHashTag(false);
		setSelectedValue(e.target.value);
	};
	const insertMoney = (ruleName: string, ruleMoney: number) => {
		setSelectRule(ruleName);
		setSelectRuleMoney(ruleMoney);
		setIsBoxVisible(true);
	};
	const sendMoney = () => {
		const data = {
			accountId: accountId,
			amount: selectRuleMoney,
			memo: selectRule,
			hashtag: selectedValue,
		};
		axios
			.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/in`, data)
			.then((res) => {
				setIsBoxVisible(false);
				console.log(res);
				axios
					.post(
						`${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
						qs.stringify({ accountId: accountId })
					)
					.then((res) => {
						setHistoryList(res.data.data.accountReport);
						setLook(true);
					})
					.catch((error) => {
						alert('실패');
					});
			})
			.catch((error) => {
				alert('실패');
			});
	};
	const completeChange = () => {
		setIsBoxVisible(false);
		history();
		setLook(false);
	};
	const extractContent = (str: string, type: 'MEMO' | 'HASHTAG'): string => {
		if (type === 'MEMO') {
		  const match = str.match(/규칙: ([^,]*)/);
		  return match ? match[1] : '';
		} else {
		  const match = str.match(/해시태그: (.*)/);
		  return match ? match[1] : '';
		}
	  };

	if (isLoading || !minLoadingTimeReached) {
		return <PageLoadingSpinner />;
	}
	return (
		<>
			<CelubHeader3 value='' disabled={false} onClick={setting} />
			<div id='celubBox1'>
				<div className='celub-detail-box1' id='celubContainer'>
					<img id='celubBgImg' src={accountInfo.imgSrc} alt='Background' />
					<div className='celub-detail'>
						<p>D+{accountInfo.duration}</p>
						<div className='celub-detail-title'>
							<h4>{accountInfo.name}</h4>
							<h2>{formatCurrency(accountInfo.balance)}원</h2>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`celub-detail-box2 ${isExpanded ? 'expanded' : ''}`}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div className='celub-detail-box3'>
					<div className='celub-detail-deco'></div>
					<button
						className={`celub-rule-btn ${isRule ? 'celub-click-event' : ''}`}
						onClick={rule}
					>
						규칙
					</button>
					<button
						className={`celub-history-btn ${isHistory ? 'celub-click-event' : ''}`}
						onClick={history}
					>
						내역
					</button>
					<div id='detail-text-box'>
						{isRule ? (
							ruleList.length == 0 ? (
								<>
									<div className='celub-rule-box1'>
										아직 규칙이 없어요.
										<br />
										규칙을 설정해볼까요?
									</div>
									<button id='basicBtn1' onClick={goMakeRule}>
										규칙 설정하기
									</button>
								</>
							) : (
								ruleList.map((rule, index) => (
									<div
										key={index}
										onClick={() => insertMoney(rule.ruleName, rule.ruleMoney)}
									>
										<div className='celub-rule-box2'>
											{rule.ruleName} : {formatCurrency(rule.ruleMoney)}원
										</div>
									</div>
								))
							)
						) : hisList.length == 0 ? (
							<>
								<div className='celub-rule-box1'>
									<p>
										아직 거래내역이 없어요
										<br />
										최애적금을 이용해보세요!
									</p>
								</div>
							</>
						) : (
							hisList.map((his, idx) => (
								<div key={idx}>
									<table className='celub-history-table'>
										<tr>
											<td>
												{formatDate(his.transDate)}
											</td>
											<td>
											{his.transType === 'DEPOSIT' ? extractContent(his.target, 'MEMO') : '셀럽로그 출금'} <br />{' '}
												<div className='celub-hashtag'>{his.transType === 'DEPOSIT' ? "# " + extractContent(his.target, 'HASHTAG') : '# 출금'}</div>{' '}
											</td>
											<td className="celub-income-money"  style={{ color: his.transType === 'DEPOSIT' ? '#0083D1' : '#f16100' }}>
											{his.transType == 'DEPOSIT' ? `+${formatCurrency(+his.transAmount)}원` :`${formatCurrency(his.transAmount)}원` } <br />{' '}
												<div className='celub-totalmoney'>
													{formatCurrency(his.balance)}원
												</div>
											</td>
										</tr>
									</table>
								</div>
							))
						)}
					</div>
				</div>
			</div>
			{isBoxVisible && (
				<div className='celub-detail-box2 add-box'>
					<div className='celub-detail-box3'>
						<div className='celub-detail-deco' />
						<div className='celub-deposit-box'>
							<p>
								{selectRule}의 내역으로
								<br /> {formatCurrency(selectRuleMoney)}원을 입금할게요.
							</p>
							<select value={selectedValue} onChange={handleSelectChange}>
								<option value='공통'># 해시태그를 선택하세요</option>
								<option value='공카댓글'># 공카댓글</option>
								<option value='이달의생일'># 이달의생일</option>
								<option value='개인셀카'># 개인셀카</option>
								<option value='라이브방송'># 라이브방송</option>
								<option value='활동'># 활동</option>
							</select>
						</div>
						<div className='celub-deposic-balance'>
							{outBalance < selectRuleMoney && (
								<div style={{ color: 'red', fontSize: '1.3rem' }}>
									⚠️ 계좌 잔액이 부족합니다.
								</div>
							)}
							입금 전 입출금통장 잔액: {formatCurrency(outBalance)}원 <br />
							입금 후 입출금통장 잔액:{' '}
							{formatCurrency(outBalance - selectRuleMoney)}원
						</div>
						<CommonBtn
							type='pink'
							value='입금하기'
							onClick={sendMoney}
							disabled={isHashTag || outBalance - selectRuleMoney < 0}
						/>
					</div>
				</div>
			)}
			<CommonModal1
				msg=' 입금 되었습니다.'
				show={look}
				onConfirm={completeChange}
			/>
		</>
	);
};

export default CelubDetail;
