import Header from '../../layouts/MoaclubHeader4';
import '../moaclub/MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CelubSetting() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [isManager, setIsManager] = useState<boolean>(false);

	// const getManagerCheck = async (userIdx: string, accountId: string) => {
	// 	try {
	// 		const response = await axios.post(
	// 			`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/manager-check`,
	// 			{
	// 				userIdx,
	// 				accountId,
	// 			}
	// 		);
	// 		return response.data.data.check;
	// 	} catch (error) {
	// 		console.error(error);
	// 		return null;
	// 	}
	// };

	// useEffect(() => {
	// 	const fetchMoaclubInfo = async () => {
	// 		if (userIdx && accountId) {
	// 			const isManager = await getManagerCheck(userIdx, accountId);
	// 			setIsManager(isManager);
	// 		}
	// 	};
	// 	fetchMoaclubInfo();
	// }, [userIdx, accountId]);

	const goMoaclubModify = () => {
		navigate(`/moaclub/modify/${accountId}`);
	};

	const goMoaclubVote = () => {
		navigate(`/moaclub/vote/${accountId}`);
	};

	return (
		<>
			<Header value='셀럽로그 관리' disabled={false} />
			<div className='content'>
				<div className='moaclubSettingContainer'>
					<div onClick={goMoaclubVote}>
						셀럽로그 계좌명 변경
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div onClick={goMoaclubModify}>
							셀럽로그 배경
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div>
						셀럽로그 규칙 수정
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
				</div>
			</div>
		</>
	);
}

export default CelubSetting;
