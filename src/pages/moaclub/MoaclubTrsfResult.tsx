import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import check from '../../assets/images/common/check.png';
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
				return '위안';
			case 'JPY':
				return '엔';
			case 'USD':
				return '달러';
		}
	};

	const currencyValue = getCurrencySymbol(trsfInfo.currency);

	return (
		<>
			<div className='moaTrsfResultContainer'>
				<img src={check} className='moaTrsfResultIcon' />
				<div className='moaTrsfResultTxt1'>"{trsfInfo.name}" 모아클럽에</div>
				<div className='moaTrsfResultTxt2'>
					<span className='moaTrsfResultMint'>
						{trsfInfo.trsfAmount}&nbsp;{currencyValue}
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
