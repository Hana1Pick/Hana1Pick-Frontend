import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate, useParams } from 'react-router-dom';
import CommonModal3 from '../../components/button/CommonModal3';
import { useState } from 'react';
import axios from 'axios';

function MoaclubVoteSelect() {
	const navigate = useNavigate();
	const userIdx = localStorage.getItem('userIdx') as string;
	const { accountId } = useParams();
	const [look, setLook] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const goMoaclubVoteManager = () => {
		const url = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/vote-result`;

		axios
			.post(
				url,
				{
					accountId,
					userIdx,
				},
				{
					params: {
						type: 0,
					},
				}
			)
			.then((res) => {
				if (res.data.status === 200) {
					navigate(`/moaclub/vote/manager/${accountId}`);
				} else {
					setLook(true);
					setDisabled(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const goMoaclubVoteTrsf = () => {
		const url = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/vote-result`;

		axios
			.post(
				url,
				{
					accountId,
					userIdx,
				},
				{
					params: {
						type: 1,
					},
				}
			)
			.then((res) => {
				if (res.data.status === 200) {
					navigate(`/moaclub/vote/trsf/${accountId}`);
				} else {
					setLook(true);
					setDisabled(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Header value='모아클럽 투표' disabled={disabled} />
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

			<CommonModal3
				msg={`투표가 존재하지 않습니다.`}
				show={look}
				onConfirm={() => {
					setLook(false);
				}}
			/>
		</>
	);
}

export default MoaclubVoteSelect;
