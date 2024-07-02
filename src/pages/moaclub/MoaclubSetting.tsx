import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MoaclubSetting() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [isManager, setIsManager] = useState<boolean>(false);

	const getManagerCheck = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/manager-check`, {
				userIdx,
				accountId,
			});
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

	return (
		<>
			<Header value='모아클럽 관리' disabled={false} />
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
					<div>
						자동이체 설정
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div>
						모아클럽 사용 종료
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
				</div>
			</div>
		</>
	);
}

export default MoaclubSetting;
