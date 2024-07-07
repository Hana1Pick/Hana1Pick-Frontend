import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import check from '../../assets/images/common/check-green.png';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/button/CommonBtn';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

function MoaclubTrsfResult() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
  
	useEffect(() => {
    if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const navigate = useNavigate();
	const location = useLocation();
	const trsfInfo = location.state;

	console.log(trsfInfo);
	const next = () => {
		navigate(`/moaclub/main/${trsfInfo.inAccId}`);
	};

	const getCurrencySymbol = (currency: string) => {
		switch (currency) {
			case 'KRW':
				return '원';
			case 'CNY':
				return '¥';
			case 'JPY':
				return '¥';
			case 'USD':
				return '$';
			default:
				return '';
		}
	};

	const formatCurrency = (amount: any) => {
		if (amount === undefined || amount === null) {
			return '';
		}

		const numericAmount = Number(amount);
		if (isNaN(numericAmount)) {
			return '';
		}

		const currencySymbol = getCurrencySymbol(trsfInfo?.currency!);

		if (trsfInfo?.currency === 'KRW') {
			return `${numericAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
		} else {
			return `${currencySymbol}${numericAmount.toFixed(2)}`;
		}
	};

	return (
		<>
		  <div className='moaTrsfResultContainer'>
			<img src={check} className='moaTrsfResultIcon' alt='Check Icon' />
			<div className='moaTrsfResultTxt1'>
			  "{trsfInfo.name}" {t('moaclub.depositedTo')}
			</div>
			<div className='moaTrsfResultTxt2'>
			  <span className='moaTrsfResultMint'>
				{formatCurrency(trsfInfo.trsfAmount)}
			  </span>{' '}
			  {t('moaclub.depositedMessage')}
			</div>
			<div className='moaTrsfResultDesc'>
			  {t('moaclub.bankName')} {trsfInfo.outAccId}
			</div>
		  </div>
	
		  <div className='buttonContainer'>
			<CommonBtn type='pink' value={t('common.confirm')} onClick={next} disabled={false} />
		  </div>
		</>
	  );
	}

export default MoaclubTrsfResult;
