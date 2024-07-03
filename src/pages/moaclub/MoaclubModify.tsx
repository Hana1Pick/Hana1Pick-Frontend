import Header from '../../layouts/MoaclubHeader1';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import { MoaclubInfo } from '../../type/commonType';
import axios from 'axios';

function MoaclubModify() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
	const [name, setName] = useState<string>('');
	const [clubFee, setClubFee] = useState<string>('');
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [candidateIdx, setCandidateIdx] = useState<string>('');

	const getMoaclubInfo = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
				{
					userIdx,
					accountId,
				}
			);
			console.log('1', response.data.data);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchMoaclubInfo = async () => {
			if (userIdx && accountId) {
				const moaClubInfoRes = await getMoaclubInfo(userIdx, accountId);
				setMoaclub(moaClubInfoRes);
				setName(moaClubInfoRes.name);
				setSelectedDate(moaClubInfoRes.atDate);
				setClubFee(moaClubInfoRes.clubFee);
			}
		};
		fetchMoaclubInfo();
	}, [userIdx, accountId]);

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

	const currencyValue = getCurrencySymbol(moaclub?.currency!);
	const manager = moaclub?.memberList.find(
		(member) => member.role === 'MANAGER'
	);

	const handleSelectChange = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedDate(event.target.value);
	};

	const handleSelectManager = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCandidateIdx(event.target.value);
	};

	const next = () => {
		const updateUrl = `http://${process.env.REACT_APP_BESERVERURI}/api/moaclub`;

		const updateData = {
			accountId: accountId,
			userIdx: userIdx,
			name: name,
			clubFee: parseInt(clubFee),
			atDate: parseInt(selectedDate),
		};

		if (
			candidateIdx !== manager?.userIdx &&
			candidateIdx !== null &&
			candidateIdx != ''
		) {
			const requestUrl = `http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/request-manager`;

			const requestData = {
				accountId: accountId,
				userIdx: userIdx,
				candidateIdx: candidateIdx,
			};

			axios
				.post(requestUrl, requestData, {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((res) => {
					if (res.data.status === 200) {
						console.log('요청완료');
						// 메세지 모달 (이미 요청)
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}

		axios
			.put(updateUrl, updateData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					console.log('수정완료');
					window.location.reload();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Header value='모아클럽 수정' disabled={false} />
			<div className='content'>
				<div className='moaclubModify'>
					<label>모아클럽 이름 수정</label>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						defaultValue={moaclub?.name}
					/>

					<label className='moaclubModifyElement'>회비 설정</label>
					<div className='feeSettings'>
						<span>매월</span>
						<select value={selectedDate} onChange={handleSelectChange}>
							{[...Array(31)].map((_, index) => (
								<option key={index + 1} value={index + 1}>
									{index + 1}일
								</option>
							))}
						</select>
						<span>일</span>
						<input
							type='text'
							value={clubFee}
							onChange={(e) => setClubFee(e.target.value)}
							defaultValue={moaclub?.clubFee}
						/>
						<span>{currencyValue}</span>
					</div>

					<label className='moaclubModifyElement'>관리자 변경</label>
					<select className='managerSelect' onChange={handleSelectManager}>
						<option selected disabled>
							{manager?.userName}
						</option>
						{moaclub?.memberList
							.filter((member) => member.role !== 'MANAGER')
							.map((member) => (
								<option key={member.userName} value={member.userIdx}>
									{member.userName}
								</option>
							))}
					</select>
				</div>
			</div>

			<div className='buttonContainer'>
				<CommonBtn type='pink' value='완료' onClick={next} disabled={false} />
			</div>
		</>
	);
}

export default MoaclubModify;
