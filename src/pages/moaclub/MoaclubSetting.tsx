import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function MoaclubSetting() {
	const navigate = useNavigate();

	const next = () => {};

	return (
		<>
			<Header value='모아클럽 관리' disabled={false} />
			<div className='content'>
				<div className='moaclubSettingContainer'>
					<div>
						모아클럽 투표
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
					<div>
						모아클럽 수정
						<img className='rightIcon' alt='right-icon' src={righticon} />
					</div>
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
