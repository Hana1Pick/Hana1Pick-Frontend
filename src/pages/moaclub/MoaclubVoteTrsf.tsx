import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate, useParams } from 'react-router-dom';

function MoaclubVoteTrsf() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;

	return (
		<>
			<Header value='모아클럽 출금 동의' disabled={false} />
			<div className='content'></div>
		</>
	);
}

export default MoaclubVoteTrsf;
