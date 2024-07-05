import Header from '../../layouts/MoaclubHeader4';
import '../moaclub/MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate} from 'react-router-dom';

function CelubSetting() {
	const navigate = useNavigate();
	const userIdx = localStorage.getItem('userIdx') as string;

	const goCelubName = () => {
		
	};

	const goCelubBgImg = () => {

	};
	
	const goCelubRules = () => {

	}

	return (
		<>
			<Header value='셀럽로그 관리' disabled={false} />
			<div className='content'>
				<div className='moaclubSettingContainer'>
					<div onClick={goCelubName}>
						셀럽로그 계좌명 변경
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div onClick={goCelubBgImg}>
							셀럽로그 배경
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div onClick={goCelubRules}>
						셀럽로그 규칙 수정
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
				</div>
			</div>
		</>
	);
}

export default CelubSetting;
