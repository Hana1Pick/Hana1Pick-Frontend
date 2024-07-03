import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate, useParams } from 'react-router-dom';

function MoaclubVoteSelect() {
	const navigate = useNavigate();
	const { accountId } = useParams();

	const goMoaclubVoteManager = () => {
		navigate(`/moaclub/vote/manager/${accountId}`);
	};

	const goMoaclubVoteTrsf = () => {
		navigate(`/moaclub/vote/trsf/${accountId}`);
	};

	return (
		<>
			<Header value='모아클럽 투표' disabled={false} />
			<div className='content'>
				<div className='moaclubSettingContainer'>
					<div onClick={goMoaclubVoteManager}>
						관리자 변경
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div onClick={goMoaclubVoteTrsf}>
						출금
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
				</div>
			</div>
		</>
	);
}

export default MoaclubVoteSelect;
