import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { memberList } from '../../type/commonType';
import { useTranslation } from 'react-i18next';

function MoaclubMember() {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const userIdx = localStorage.getItem('userIdx') as string;
	const userName = localStorage.getItem('name') as string;
	const [memberList, setMemberList] = useState<memberList[] | null>(null);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [look, setLook] = useState(false);
	const [isManager, setIsManager] = useState<boolean>(false);
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const getMemberList = async (accountId: string) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BESERVERURI}/api/moaclub/member`,
				{
					params: {
						accountId,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const getManagerCheck = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BESERVERURI}/api/moaclub/manager-check`,
				{
					userIdx,
					accountId,
				}
			);
			return response.data.data.check;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchMoaclubInfo = async () => {
			if (accountId) {
				const memberListRes = await getMemberList(accountId);
				const isManager = await getManagerCheck(userIdx, accountId);
				setIsManager(isManager);
				if (memberListRes) {
					memberListRes.sort((a: memberList, b: memberList) =>
						a.userName.localeCompare(b.userName)
					);
					setMemberList(memberListRes);
				}
			}
		};
		fetchMoaclubInfo();
	}, [accountId]);

	const next = () => {
		const requestUrl = `${process.env.REACT_APP_BESERVERURI}/api/moaclub`;

		axios
			.delete(requestUrl, {
				data: {
					accountId: accountId,
					userIdx: userIdx,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setLook(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	
	return (
		<>
		  <div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
		  <Header value={t('memberManagement')} disabled={isDisabled} />
		  <div className='moaclubMemberContainer'>
			<div className='moaHanaMemberInfoBox'>
			  <div>
				{memberList?.length} {t('participants')}
			  </div>
			  <div className='moaHanaMemberInviteBtn' onClick={shareToKakao}>
				{t('invite')}
			  </div>
			</div>
			<div className='moaHanaMemberListContainer'>
			  <div className='moaHanaMemberRole'>
				<div className='moaHanaMemberRoleTitle'>{t('manager')}</div>
				{memberList?.map(
				  (member) =>
					member.role === 'MANAGER' && (
					  <div key={member.userIdx} className='moaHanaMemberItem'>
						<img
						  src={member.profile}
						  alt={member.userName}
						  className='voteProfile'
						/>
						<div className='moaHanaMemberName'>{member.userName}</div>
						{isManager && (
						  <div
							className='moaHanaChangeManager'
							onClick={() => {
							  navigate(`/moaclub/manager-change/${accountId}`);
							}}
						  >
							{t('changeManager')}
						  </div>
						)}
					  </div>
					)
				)}
			  </div>
			  <div className='moaHanaMemberRole'>
				{memberList?.length !== 1 && (
				  <div className='moaHanaMemberRoleTitle'>{t('members')}</div>
				)}
	
				{memberList?.map(
				  (member) =>
					member.role === 'MEMBER' && (
					  <div key={member.userIdx} className='moaHanaMemberItem'>
						<img
						  src={member.profile}
						  alt={member.userName}
						  className='voteProfile'
						/>
						<div className='moaHanaMemberName'>{member.userName}</div>
					  </div>
					)
				)}
			  </div>
			</div>
		  </div>
		</>
	  );

	function shareToKakao() {
		const description = `${userName}님이 모아클럽에 초대했어요.`;
		const url =
			'https://hana1-pick-frontend.vercel.app//moaclub/join/' + accountId;
		console.log(url);

		if (!window.Kakao.isInitialized()) {
			window.Kakao.init(process.env.REACT_APP_KAKAO_KEY_SHARE);
		}

		window.Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: '하나1픽 모아클럽',
				description: description,
				imageUrl: 'https://ifh.cc/g/9vWPh9.png',
				link: {
					mobileWebUrl: url,
					webUrl: url,
				},
			},
			buttons: [
				{
					title: '모아클럽 바로가기',
					link: {
						mobileWebUrl: url,
						webUrl: url,
					},
				},
			],
		});
	}
}

export default MoaclubMember;
