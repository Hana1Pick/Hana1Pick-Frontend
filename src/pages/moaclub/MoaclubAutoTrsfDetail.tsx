import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import deleteicon from '../../assets/images/common/deleteicon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoaAutoTrsf } from '../../type/commonType';
import CommonBtn from '../../components/button/CommonBtn';
import CommonModal3 from '../../components/button/CommonModal3';

function MoaclubAutoTrsfDetail() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const userName = localStorage.getItem('name') as string;
	const [moaclubName, setMoaClubName] = useState('');
	const [autoTrsf, setAutoTrsf] = useState<MoaAutoTrsf | null>(null);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [look, setLook] = useState(false);

	const getMoaclubName = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
				{
					userIdx,
					accountId,
				}
			);
			return response.data.data.name;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const getAutoTrsf = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BESERVERURI}/api/moaclub/auto-transfer`,
				{
					userIdx,
					accountId,
				}
			);
			console.log(response.data);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchAutoTrsfInfo = async () => {
			if (userIdx && accountId) {
				const moaClubNameRes = await getMoaclubName(userIdx, accountId);
				const autoTrsfRes = await getAutoTrsf(userIdx, accountId);
				setMoaClubName(moaClubNameRes);
				if (autoTrsfRes) {
					setAutoTrsf(autoTrsfRes);
				}
			}
		};
		fetchAutoTrsfInfo();
	}, [userIdx, accountId]);

	const deleteAutoTrsf = () => {
		const url = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/auto-transfer`;

		axios
			.delete(url, {
				data: {
					outAccId: autoTrsf?.outAccId,
					inAccId: autoTrsf?.inAccId,
					userIdx: userIdx,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setLook(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
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

	const formatCurrency = (amount: number) => {
		if (amount === undefined) {
			return '';
		}
		const currencySymbol = getCurrencyValue(autoTrsf?.currency!);

		if (autoTrsf?.currency === 'KRW') {
			return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
		} else {
			return `${currencySymbol}${amount.toFixed(2)}`;
		}
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
			<Header value='자동이체' disabled={isDisabled} />
			<div className='content'>
				<div className='moaAutoTrsfDetail'>
					<div className='moaAutoTrsfDetailTxt'>{moaclubName} 자동이체</div>
					<table>
						<tbody className='moaAutoTrsfDetailTable'>
							<tr>
								<th>은행명</th>
								<td>하나원픽</td>
							</tr>
							<tr>
								<th>입금계좌정보</th>
								<td>
									{autoTrsf?.inAccId} <br />
									하나원픽 모아클럽
								</td>
							</tr>
							<tr>
								<th>출금계좌정보</th>
								<td>
									{autoTrsf?.outAccId} <br />
									하나원픽 입출금 통장
								</td>
							</tr>
							<tr>
								<th>예금주</th>
								<td>{userName}</td>
							</tr>
							<tr>
								<th>청구구분</th>
								<td>즉시출금</td>
							</tr>
							<tr>
								<th>적금가입통화</th>
								<td>{autoTrsf?.currency}</td>
							</tr>
							<tr>
								<th>이체기준통화</th>
								<td>{autoTrsf?.currency === 'KRW' ? '원화' : '외화'}</td>
							</tr>
							<tr>
								<th>이체금액</th>
								<td>{formatCurrency(autoTrsf?.amount!)}</td>
							</tr>
							<tr>
								<th>이체일</th>
								<td>매월 / {autoTrsf?.atDate}일</td>
							</tr>
							<tr>
								<th>납부자번호</th>
								<td>{userIdx.split('-').pop()}</td>
							</tr>
							<tr>
								<th>자동이체신청일</th>
								<td>{autoTrsf?.createDate}</td>
							</tr>
						</tbody>
					</table>
					<div className='moaAutoTrsfDelete'>
						<div className='moaAutoTrsfDeleteTxt' onClick={nextStage}>
							자동이체 해지
						</div>
					</div>
				</div>
			</div>

			<div>
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
						<div>아래 내용의 자동이체를</div>
						<div>&nbsp;해지하시겠습니까?</div>
						<div className='moaAutoTrsfDetailPopUp'>
							<table className='moaAutoTrsfDetailPopUpTable'>
								<tbody>
									<tr>
										<th>은행명</th>
										<td>하나원픽</td>
									</tr>
									<tr>
										<th>출금계좌</th>
										<td>{autoTrsf?.outAccId}</td>
									</tr>
									<tr>
										<th>이체정보</th>
										<td>
											매월 {autoTrsf?.atDate}일{' '}
											{formatCurrency(autoTrsf?.amount!)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className='moaclub-box5'>
						<CommonBtn
							type='pink'
							value='해지하기'
							onClick={deleteAutoTrsf}
							disabled={false}
						/>
					</div>
				</div>
			</div>
			<CommonModal3
				msg={`자동이체가 해지되었습니다.`}
				show={look}
				onConfirm={() => {
					navigate(`/moaclub/autotrsf/${accountId}`);
				}}
			/>
		</>
	);
}

export default MoaclubAutoTrsfDetail;
