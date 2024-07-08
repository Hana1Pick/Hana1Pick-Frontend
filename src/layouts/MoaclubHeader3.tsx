import { useNavigate } from 'react-router-dom';
import back from '../assets/images/common/backicon.png';
import setting from '../assets/images/common/settingicon.png';
import { MoaClubHeaderData } from '../type/commonType';

function MoaClubHeader3({ value, disabled, onClick }: MoaClubHeaderData) {
	const headerStyle = disabled
		? {
				backgroundColor: 'rgba(0, 0, 0, 0.009)',
				borderColor: 'rgba(0, 0, 0, 0.009)',
			}
		: {};
	const navigate = useNavigate(); // useNavigate 훅 사용
	const handleBackClick = () => {
		navigate(-1); // 뒤로 가기
	};

	return (
		<>
			<div className='moaclubHeader2' style={headerStyle}>
				<img
					className='back'
					alt='back-icon'
					src={back}
					onClick={handleBackClick}
				/>
				<div className='title' style={{ fontWeight: '500', fontSize: '1rem' }}>
					{value}
				</div>
				<img
					className='setting'
					alt='setting-icon'
					src={setting}
					onClick={onClick}
				/>
			</div>
		</>
	);
}

export default MoaClubHeader3;
