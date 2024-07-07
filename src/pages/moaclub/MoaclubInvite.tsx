import Header from '../../layouts/MoaclubHeader1';
import CommonBtn from '../../components/button/CommonBtn';
import inviteIcon from '../../assets/images/moaclub/invite.png';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MoaclubContext } from '../../contexts/MoaclubContextProvider';
import { useTranslation } from 'react-i18next';

function MoaclubInvite() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const navigate = useNavigate();

	const userName = localStorage.getItem('name') as string;
	const [moaclub, setMoaclub] = useState<string>('');

	useEffect(() => {
		if (localStorage.getItem('moaclub') !== undefined) {
			const moaAccId = localStorage.getItem('moaclub');
			console.log(moaAccId);
			setMoaclub(moaAccId!);
		}
	}, []);

	const next = () => {
		navigate('/moaclub/main/' + moaclub);
		localStorage.removeItem('moaclub');
	};

	return (
		<>
		  <Header value={t('header_title')} disabled={false} />
		  <div className='content'>
			<h4 className='inviteTxt'>
			  {t('invite_text_line1')}
			  <br />
			  {t('invite_text_line2')}
			</h4>
		  </div>
	
		  <img
			className='inviteIcon'
			alt='invite-icon'
			src={inviteIcon}
			onClick={shareToKakao}
		  />
		  <div className='buttonContainerInvite'>
			<div className='bubble'>
			  {t('invite_button_description')}
			</div>
			<CommonBtn type='black' value={t('common_button_next')} onClick={next} disabled={false} />
		  </div>
		</>
	  );
	  function shareToKakao() {
		const description = `${userName}님이 모아클럽에 초대했어요.`;
		const url =
			'https://hana1-pick-frontend.vercel.app//moaclub/join/' + moaclub;
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



export default MoaclubInvite;
