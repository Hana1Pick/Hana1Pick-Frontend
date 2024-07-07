import check from '../../assets/images/common/check-green.png';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/button/CommonBtn';

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

	return (
		<>
			<div className='completeBox1'>
				<div className='completeBox2'>
					<img className='MoaAutoTrsfCompleteCheck' src={check} alt='moaImg' />
					<div className='textBox1'>
						<p>자동이체</p>
						<p>설정 완료</p>
					</div>
				</div>
			</div>
			<div className='completeBox3'>
				<div className='tableBox'>
					<table className='completeInfo'>
						<tr>
							<th>입금계좌</th>
							<td colSpan={2}>
								{moaclub.name} <br /> {inAccId}
							</td>
						</tr>
						<tr>
							<th>출금계좌</th>
							<td colSpan={2}>
								{userName}의 입출금 통장 <br /> {outAccId}
							</td>
						</tr>
						<tr>
							<th>이체정보 </th>
							<td colSpan={2}>
								매월 {moaclub.atDate}일 {formatCurrency(moaclub.clubFee)}
							</td>
						</tr>
						<tr>
							<th>자동이체 등록일</th>
							<td colSpan={2}>{currentDate}</td>
						</tr>
					</table>
				</div>
				<div className='buttonContainer'>
					<CommonBtn type='pink' value='완료' onClick={next} disabled={false} />
				</div>
			</div>
		</>
	);
}

export default MoaclubAutoTrsfComplete;
