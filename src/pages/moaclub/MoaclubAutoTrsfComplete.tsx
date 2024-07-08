import check from '../../assets/images/common/check-green.png';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/button/CommonBtn';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

function MoaclubAutoTrsfComplete() {
	const navigate = useNavigate();
	const userName = localStorage.getItem('name') as string;
	const currentDate = new Date().toLocaleDateString().replace(/\.$/, '');
	const location = useLocation();
	const req = location.state;
	const outAccId = req.outAccId;
	const inAccId = req.inAccId;
	const moaclub = req.moaclub;

	const next = () => {
		navigate(`/moaclub/autotrsf/${inAccId}`);
	};

	const getCurrencyValue = (currency: string) => {
		switch (currency) {
			case 'KRW':
				return '원';
			case 'CNY':
				return '¥';
			case 'JPY':
				return '¥';
			case 'USD':
				return '$';
		}
	};

	const formatCurrency = (amount: number) => {
		if (amount === undefined) {
			return '';
		}
		const currencySymbol = getCurrencyValue(moaclub?.currency!);

		if (moaclub?.currency === 'KRW') {
			return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
		} else {
			return `${currencySymbol}${amount.toFixed(2)}`;
		}
	};
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('nation') || i18n.language);
  
	useEffect(() => {
		if(language=="Korea") i18n.changeLanguage('ko');
		else i18n.changeLanguage('ch');
	}, [language, i18n]);
	return (
		<>
			<div className='completeContainer'>
			<div className='completeBox1'>
			<div className='completeBox2'>
				<img className='MoaAutoTrsfCompleteCheck' src={check} alt='moaImg' />
				<div className='textBox1'>
				<p>{t('autoTrsfComplete')}</p>
				<p>{t('settingComplete')}</p>
				</div>
			</div>
			</div>
			<div className='completeBox3'>
			<div className='tableBox'>
				<table className='completeInfo'>
				<tbody>
					<tr>
					<th>{t('depositAccount')}</th>
					<td colSpan={2}>
						{moaclub.name} <br /> {inAccId}
					</td>
					</tr>
					<tr>
					<th>{t('withdrawalAccount')}</th>
					<td colSpan={2}>
						{userName}의 입출금 통장 <br /> {outAccId}
					</td>
					</tr>
					<tr>
					<th>{t('transferInfo')}</th>
					<td colSpan={2}>
						매월 {moaclub.atDate}일 {moaclub.clubFee}
					</td>
					</tr>
					<tr>
					<th>{t('autoTrsfRegDate')}</th>
					<td colSpan={2}>{currentDate}</td>
					</tr>
				</tbody>
				</table>
			</div>
			<div className='buttonContainer'>
				<CommonBtn type='pink' value={t('complete')} onClick={next} disabled={false} />
			</div>
			</div>
		</div>
	</>
	);
  }
export default MoaclubAutoTrsfComplete;
