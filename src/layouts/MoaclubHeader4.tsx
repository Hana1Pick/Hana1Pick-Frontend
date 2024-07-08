import back from '../assets/images/common/backicon.png';
import { MoaClubHeaderData } from '../type/commonType';
import { useNavigate } from 'react-router-dom';

function MoaClubHeader4({ value, disabled }: MoaClubHeaderData) {
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
			<div className='moaclubHeader4' style={headerStyle}>
				<img className='back' src={back} onClick={handleBackClick} />
				<div className='title' style={{ fontWeight: '500', fontSize: '1rem' }}>
					{value}
				</div>
			</div>
		</>
	);
}

export default MoaClubHeader4;
