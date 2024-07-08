import Header from '../../layouts/MoaclubHeader1';
import banner from '../../assets/images/moaclub/moaclub-banner.png';
import righticon from '../../assets/images/common/righticon.png';
import checkicon from '../../assets/images/common/checkicon.png';
import CommonBtn from '../../components/button/CommonBtn';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function MoaclubOpening() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('nation') || i18n.language);
	console.log(localStorage.getItem('nation'));
  
	useEffect(() => {
		if(language=="Korea") i18n.changeLanguage('ko');
		else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const navigate = useNavigate();
	const [allAgreed, setAllAgreed] = useState(false);

	const handleAgreeClick = () => {
		setAllAgreed(!allAgreed);
	};

	const next = () => {
		if (allAgreed) {
			navigate('/moaclub/select-acc');
		}
	};

	return (
	  <>
		<Header value={t('moaClub')} disabled={false} />
		<div className='content'>
		  <img className='banner' alt='banner' src={banner} />
		</div>
  
		<div>
		  <div className='allAgreeBox'>
			<div
			  className={`allAgree ${allAgreed ? 'agreed' : ''}`}
			  onClick={handleAgreeClick}
			>
			  <div className='leftContent'>
				<img className='checkicon' src={checkicon} />
				<span>{t('agreeAll')}</span>
			  </div>
			  <img className='righticon' src={righticon} />
			</div>
		  </div>
  
		  <div className='agreeItems'>
			<div className='agreeItem'>
			  <div className='leftContent'>
				<img className='checkicon' src={checkicon} />
				<span>{t('serviceManual')}</span>
			  </div>
			  <img className='righticon' src={righticon} />
			</div>
			<div className='agreeItem'>
			  <div className='leftContent'>
				<img className='checkicon' src={checkicon} />
				<span>{t('serviceTerms')}</span>
			  </div>
			  <img className='righticon' src={righticon} />
			</div>
			<div className='agreeItem'>
			  <div className='leftContent'>
				<img className='checkicon' src={checkicon} />
				<span>{t('financialConsent')}</span>
			  </div>
			  <img className='righticon' src={righticon} />
			</div>
		  </div>
		</div>
  
		<div className='buttonContainer'>
		  <CommonBtn
			type='black'
			value={t('next')}
			onClick={next}
			disabled={!allAgreed}
		  />
		</div>
	  </>
	);
  }
  

export default MoaclubOpening;
