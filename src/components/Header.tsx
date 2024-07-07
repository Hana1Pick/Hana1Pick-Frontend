import './../common/styles/scss/CommonStyle.scss';
import back from '../assets/images/common/backicon.png';
import { useNavigate } from 'react-router-dom';

function Header({ value }: { value: string }) {
	const navigate = useNavigate(); // useNavigate 훅 사용
	const handleBackClick = () => {
		navigate(-1); // 뒤로 가기
	};

	return (
		<>
			<div className='headerContainer'>
				<img className='back-header' src={back} onClick={handleBackClick} />
				<div id='header'>{value}</div>
			</div>
		</>
	);
}

export default Header;
