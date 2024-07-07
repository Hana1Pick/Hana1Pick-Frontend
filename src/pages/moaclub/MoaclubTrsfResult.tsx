import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import check from '../../assets/images/common/check-green.png';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/button/CommonBtn';

function MoaclubTrsfResult() {
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
		}
	};

	const formatCurrency = (amount: number) => {
		if (amount === undefined) {
			return '';
		}
		const currencySymbol = getCurrencySymbol(trsfInfo?.currency!);

		if (trsfInfo?.currency === 'KRW') {
			return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
		} else {
			return `${currencySymbol}${amount.toFixed(2)}`;
		}
	};

	return (
		<>
			<div className='moaTrsfResultContainer'>
				<img src={check} className='moaTrsfResultIcon' />
				<div className='moaTrsfResultTxt1'>"{trsfInfo.name}" 모아클럽에</div>
				<div className='moaTrsfResultTxt2'>
					<span className='moaTrsfResultMint'>
						{formatCurrency(trsfInfo.trsfAmount)}
					</span>{' '}
					입금했어요.
				</div>
				<div className='moaTrsfResultDesc'>하나원픽 {trsfInfo.outAccId}</div>
			</div>

			<div className='buttonContainer'>
				<CommonBtn type='pink' value='확인' onClick={next} disabled={false} />
			</div>
		</>
	);
}

export default MoaclubTrsfResult;
