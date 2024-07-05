import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import deleteicon from '../../assets/images/common/deleteicon.png';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommonBtn from '../../components/button/CommonBtn';
import CommonModal3 from '../../components/button/\bCommonModal3';

function MoaclubSetting() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [isManager, setIsManager] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [look, setLook] = useState(false);
	const [look2, setLook2] = useState(false);

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

	useEffect(() => {
		const fetchMoaclubInfo = async () => {
			if (userIdx && accountId) {
				const isManager = await getManagerCheck(userIdx, accountId);
				setIsManager(isManager);
			}
		};
		fetchMoaclubInfo();
	}, [userIdx, accountId]);

	const goMoaclubModify = () => {
		navigate(`/moaclub/modify/${accountId}`);
	};

	const goMoaclubVote = () => {
		navigate(`/moaclub/vote/${accountId}`);
	};

	const goMoaclubAutoTrsf = () => {
		navigate(`/moaclub/autotrsf/${accountId}`);
	};

	const next = () => {
		const requestUrl = `http://${process.env.REACT_APP_BESERVERURI}/api/moaclub`;

		axios
			.delete(requestUrl, {
				data: {
					accountId: accountId,
					userIdx: userIdx,
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
			<Header value='모아클럽 관리' disabled={isDisabled} />
			<div className='content'>
				<div className='moaclubSettingContainer'>
					<div onClick={goMoaclubVote}>
						모아클럽 투표
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					{isManager && (
						<div onClick={goMoaclubModify}>
							모아클럽 수정
							<img className='rightIcon' alt='right-icon' src={righticon} />
						</div>
					)}
					<div onClick={goMoaclubAutoTrsf}>
						자동이체 설정
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div onClick={nextStage}>
						모아클럽 사용 종료
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
				</div>
			</div>

			<div>
				<div className='withdraw-box4' id='withdraw-box4'>
					<div className='moaclub-box6'>
						<img
							className='deleteicon'
							src={deleteicon}
							onClick={beforeStage}
						/>
					</div>
					<div>
						<div>모아클럽을 해지하시겠습니까?</div>
						<div className='moaAutoTrsfDetailPopUp'>
							<table className='moaAutoTrsfDetailPopUpTable'>
								<tbody>
									<tr>
										<th>상품명</th>
										<td>하나원픽 모아클럽</td>
									</tr>
									<tr>
										<th>계좌번호</th>
										<td>{accountId}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className='moaclub-box5'>
						<CommonBtn
							type='pink'
							value='해지하기'
							onClick={next}
							disabled={false}
						/>
					</div>
				</div>
			</div>

			<CommonModal3
				msg={`모아클럽이 해지되었습니다.`}
				show={look}
				onConfirm={() => {
					navigate('/');
				}}
			/>

			<CommonModal3
				msg={`모아클럽에 아직 멤버가 존재합니다.`}
				show={look2}
				onConfirm={() => {
					setLook2(false);
					beforeStage();
				}}
			/>
		</>
	);
}

export default MoaclubSetting;
