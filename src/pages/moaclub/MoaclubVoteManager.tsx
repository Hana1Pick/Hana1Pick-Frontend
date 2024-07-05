import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import checkSelect from '../../assets/images/moaclub/check-fill-select.png';
import checkUnselect from '../../assets/images/moaclub/check-fill-unselect.png';
import xSelect from '../../assets/images/moaclub/x-fill-select.png';
import xUnselect from '../../assets/images/moaclub/x-fill-unselect.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { memberList, MoaClubVoteResult } from '../../type/commonType';
import CommonBtn from '../../components/button/CommonBtn';
import MoaclubModal from '../../components/modal/MoaClubModal';
import CommonModal2 from '../../components/button/CommonModal2';
import CommonModal3 from '../../components/button/\bCommonModal3';

function MoaclubVoteManager() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [voteResult, setVoteResult] = useState<MoaClubVoteResult | null>(null);
	const [memberList, setMemberList] = useState<memberList[] | null>(null);
	const [hasVoted, setHasVoted] = useState<boolean | null>(null);
	const [selectVote, setSelectVote] = useState<boolean | null>(null);
	const [isManager, setIsManager] = useState<boolean>(false);
	const [myProfile, setMyProfile] = useState<memberList | null>(null);
	const [timeLeft, setTimeLeft] = useState<string>('');
	const [manager, setManager] = useState<memberList | null>(null);
	const [look, setLook] = useState(false);
	const [look2, setLook2] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [moaName, setMoaName] = useState('');
	const alarm = 'true';
	const alarmValue = '관리자 변경 요청';

	const getMoaClubInfo = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
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

	const getManagerCheck = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/manager-check`,
				{
					userIdx,
					accountId,
				}
			);
			return response.data.data.check;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const getMoaClubRequest = async (accountId: string, userIdx: string) => {
		try {
			const response = await axios.post(
				`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/vote-result`,
				{
					accountId,
					userIdx,
				},
				{
					params: {
						type: 0,
					},
				}
			);
			console.log(response.data.data);
			if (response.data.status === 202) {
				console.log('요청이 아직 없습니다.');
			} else {
				return response.data.data;
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const getMemberList = async (accountId: string) => {
		try {
			const response = await axios.get(
				`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/member`,
				{
					params: {
						accountId,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchMoaclubInfo = async () => {
			if (userIdx && accountId) {
				const moaClubReqRes = await getMoaClubRequest(accountId, userIdx);
				const memberListRes = await getMemberList(accountId);
				const isManager = await getManagerCheck(userIdx, accountId);
				const moaClubInfoRes = await getMoaClubInfo(userIdx, accountId);
				setIsManager(isManager);
				setVoteResult(moaClubReqRes);
				setMemberList(memberListRes);
				setMoaName(moaClubInfoRes);

				if (memberListRes) {
					const myInfo = memberListRes.find(
						(m: memberList) => m.userIdx === userIdx
					);
					if (myInfo) {
						setMyProfile(myInfo);
						if (moaClubReqRes.votes) {
							const myVote = moaClubReqRes.votes.hasOwnProperty(
								myInfo.userName
							);
							setHasVoted(myVote);
						}
					}

					const managerInfo = memberListRes.find(
						(m: memberList) => m.role === 'MANAGER'
					);
					setManager(managerInfo);
				}
			}
		};
		fetchMoaclubInfo();
	}, [userIdx, accountId]);

	const getProfile = (name: string) => {
		if (voteResult && memberList) {
			const member = memberList.find((m) => m.userName === name);
			if (member) {
				return member.profile;
			}
		}
	};

	const next = () => {
		console.log('modal');
		setLook(true);
		setDisabled(true);
	};

	const goConfirm = () => {
		setLook(false);
		setLook2(true);
		setDisabled(true);
	};

	const goVote = () => {
		const url = `http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/vote`;
		const data = {
			accountId: accountId,
			userIdx: userIdx,
			agree: selectVote,
		};
		axios
			.post(url, data, {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					type: 0,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					const checkVoteResult = async () => {
						const moaClubReqRes = await getMoaClubRequest(accountId!, userIdx);
						// 모두 동의했고 나도 동의했을 때 > 반영 알림
						const allAgree = () => {
							return memberList!
								.filter((member) => member.role !== 'MANAGER')
								.every(
									(member) => moaClubReqRes.votes[member.userName] === true
								);
						};
						if (selectVote && allAgree()) {
							console.log('agree');
							const alarmMessage = `${moaName}에서 관리자가 변경되었어요.`;
							localStorage.setItem('alarm', alarm);
							localStorage.setItem('alarmMessage', alarmMessage);
						}

						// 동의하지 않았을 때 > 무조건 거절 > 거절 알림
						if (!selectVote) {
							const alarmMessage = `${moaName}의 관리자 변경 요청이 거절되었어요.`;
							localStorage.setItem('alarm', alarm);
							localStorage.setItem('alarmMessage', alarmMessage);
						}
						navigate(`/moaclub/main/${accountId}`);
					};
					checkVoteResult();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getVoteStatus = (name: string) => {
		if (voteResult && voteResult.votes.hasOwnProperty(name)) {
			return voteResult.votes[name] ? checkSelect : xSelect;
		}
		return '-';
	};

	const isButtonDisabled = () => {
		if (isManager || hasVoted || selectVote === null) {
			return true;
		}
		return false;
	};

	const calculateTimeLeft = () => {
		if (!voteResult) return '';

		const endTime = new Date(
			new Date(voteResult.requestTime).getTime() + 24 * 60 * 60 * 1000
		);
		const now = new Date();
		const difference = endTime.getTime() - now.getTime();

		if (difference <= 0) {
			return '00:00:00';
		}

		const hours = String(Math.floor(difference / (1000 * 60 * 60))).padStart(
			2,
			'0'
		);
		const minutes = String(
			Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
		).padStart(2, '0');
		const seconds = String(
			Math.floor((difference % (1000 * 60)) / 1000)
		).padStart(2, '0');

		return `${hours}:${minutes}:${seconds}`;
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [voteResult]);

	const handleVote = (vote: boolean) => {
		setSelectVote(vote);
	};

	return (
		<>
			<Header value='모아클럽 관리자 변경' disabled={disabled} />
			<div className='content'>
				<div>관리자 변경에 동의하십니까?</div>
				<div className='candidateContainer'>
					<div className='managerWrapper'>
						<img
							src={manager?.profile}
							alt='관리자 프로필 사진'
							className='voteProfile'
						/>
						<span className='moaVoteProfileDesc'>{manager?.userName}</span>
					</div>
					<div className='mintTxt'>→</div>
					<div className='candidateWrapper'>
						<span>👑</span>
						<img
							src={getProfile(voteResult?.candidateName!)}
							alt='관리자 후보 프로필 사진'
							className='voteProfile'
						/>
						<span className='moaVoteProfileDesc'>
							{voteResult?.candidateName}
						</span>
					</div>
				</div>
			</div>

			<div className='moaclubVoteStatusContent'>
				<span className='voteTimeTxt'>투표 현황</span>
				<table className='moaclubFeeTable'>
					{memberList &&
						memberList
							.filter((member) => member.userIdx != userIdx)
							.filter((member) => member.role != 'MANAGER')
							.map((member: memberList, index: number) => (
								<tr key={index}>
									<td className='voteTableFirstTd'>
										<img
											src={member.profile}
											alt={`${member.userName} 프로필`}
											className='voteProfile'
										/>
									</td>
									<td className='voteMemberTxt'>{member.userName}</td>
									<td className='voteTableLastTd'>
										{getVoteStatus(member.userName) === '-' ? (
											<span className='voteStatusIcon'>-</span>
										) : (
											<img
												src={getVoteStatus(member.userName)}
												alt='투표 상태 아이콘'
												className='voteStatusIcon'
											/>
										)}
									</td>
								</tr>
							))}
				</table>
			</div>

			<div className='moaclubVoteContent'>
				{isManager ? (
					<div className='timeLeft'>관리자는 투표 권한이 없습니다.</div>
				) : hasVoted ? (
					<div className='timeLeft'>이미 투표했습니다.</div>
				) : (
					<>
						<span className='voteTimeTxt'>
							투표까지 남은 기간 <span className='timeLeft'>{timeLeft}</span>
						</span>
						<table className='voteTable'>
							<tr>
								<td>
									<img
										src={myProfile?.profile}
										alt='myProfile'
										className='voteProfile'
									/>
								</td>
								<td className='moaclubTarget'>{myProfile?.userName}</td>
								<td>
									<img
										src={selectVote === true ? checkSelect : checkUnselect}
										alt='찬성 아이콘'
										className='voteStatusIcon'
										onClick={() => handleVote(true)}
									/>
									<img
										src={selectVote === false ? xSelect : xUnselect}
										alt='반대 아이콘'
										className='voteStatusIcon'
										onClick={() => handleVote(false)}
									/>
								</td>
							</tr>
						</table>
					</>
				)}
			</div>

			<div className='buttonContainer'>
				<CommonBtn
					type='pink'
					value='완료'
					onClick={next}
					disabled={isButtonDisabled()}
				/>
			</div>

			<CommonModal2
				msg={`재투표가 불가합니다.\n 투표를 진행하시겠습니까?`}
				show={look}
				onCancle={() => {
					setLook(false);
				}}
				onConfirm={goConfirm}
			/>

			<CommonModal3
				msg={`투표가 완료되었습니다.`}
				show={look2}
				onConfirm={goVote}
			/>
		</>
	);
}

export default MoaclubVoteManager;
