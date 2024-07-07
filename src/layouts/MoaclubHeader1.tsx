import { useNavigate } from 'react-router-dom';
import back from '../assets/images/common/backicon.png';
import { MoaClubHeaderData } from '../type/commonType';

function MoaClubHeader({ value, disabled }: MoaClubHeaderData) {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const handleBackClick = () => {
    navigate(-1); // 뒤로 가기
  };
	const headerStyle = disabled
		? {
				backgroundColor: 'rgba(0, 0, 0, 0.009)',
				borderColor: 'rgba(0, 0, 0, 0.009)',
			}
		: {};

	return (
		<>
			<div className='moaclubHeader' style={headerStyle}>
				<img className='back' src={back} onClick={handleBackClick}/>
				<h4 className='moaclubHeaderH4'>{value}</h4>
				<h5>취소</h5>
			</div>
		</>
	);
}

export default MoaClubHeader;
