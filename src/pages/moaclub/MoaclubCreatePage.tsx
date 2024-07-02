import { useContext, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import Header from '../../layouts/MoaclubHeader1';
import deleteicon from '../../assets/images/common/deleteicon.png';
import Picker from './Picker';
import { useNavigate } from 'react-router-dom';
import { MoaclubContext } from '../../contexts/MoaclubContextProvider';

function MoaclubCreatePage() {
	const navigate = useNavigate();
	const [accountName, setAccountName] = useState<string>('');
	const [currency, setCurrency] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [selectedDay, setSelectedDay] = useState(0);
	const [amount, setAmount] = useState<string>('');

	const { setName, setCurrencyProvider, setClubFee, setAtDate }: any =
		useContext(MoaclubContext);

	const daysOfMonth = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAccountName(event.target.value);
		setName(event.target.value);
	};

	const handleCurrencyChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCurrency(event.target.value);
		setCurrencyProvider(event.target.value);
	};

	const handleDayChange = (selected: string | number) => {
		const day = Number(String(selected).replace(/[^0-9]/g, ''));
		setSelectedDay(day);
		setAtDate(day);
		console.log(selectedDay);
	};

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const numericValue = value.replace(/[^0-9]/g, '');
		setAmount(numericValue);
		setClubFee(numericValue);
	};

	const nextNextNextStage = () => {
		const div2 = document.getElementById('celub-withdraw-overlay');
		const div3 = document.getElementById('withdraw-box8');
		const div1 = document.getElementById('withdraw-box7');
		if (div1) {
			div1.style.display = 'none';
		}
		if (div2) {
			div2.style.display = 'block';
		}
		if (div3) {
			div3.style.display = 'block';
		}
		setIsDisabled(true);
	};

	const nextNextStage = () => {
		const div2 = document.getElementById('celub-withdraw-overlay');
		const div3 = document.getElementById('withdraw-box7');

		if (div2) {
			div2.style.display = 'block';
		}
		if (div3) {
			div3.style.display = 'block';
		}
		setIsDisabled(true);
	};
	const nextStage = () => {
		const div1 = document.getElementById('withdraw-box4');
		const div2 = document.getElementById('celub-withdraw-overlay');

		if (div1) {
			div1.style.display = 'block';
		}
		if (div2) {
			div2.style.display = 'block';
		}

		setIsDisabled(true);
	};
	const beforeStage = () => {
		const div1 = document.getElementById('withdraw-box4');
		const div2 = document.getElementById('celub-withdraw-overlay');
		const div3 = document.getElementById('withdraw-box7');
		const div4 = document.getElementById('withdraw-box8');

		if (div1) {
			div1.style.display = 'none';
		}
		if (div2) {
			div2.style.display = 'none';
		}
		if (div3) {
			div3.style.display = 'none';
		}
		if (div4) {
			div4.style.display = 'none';
		}
		setIsDisabled(false);
	};

	const getCurrencySymbol = (currency: string) => {
		switch (currency) {
			case 'KRW':
				return '₩';
			case 'CNY':
				return '¥';
			case 'JPY':
				return '¥';
			case 'USD':
				return '$';
		}
	};

	const next = () => {
		navigate('/moaclub/pattern');
	};

	return (
		<>
			<div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
			<Header value='모아클럽' disabled={isDisabled} />

			<div className='content'>
				<h4 className='moaclubTitleSetting'>
					멤버들과 함께 볼<br />
					계좌 이름을 지어주세요.
				</h4>
			</div>
			<input
				type='text'
				value={accountName}
				onChange={handleInputChange}
				className='accountNameInput'
				placeholder='모아클럽 이름을 입력하세요'
			/>
			<div className='buttonContainer'>
				<CommonBtn
					type='pink'
					value='다음'
					onClick={nextStage}
					disabled={accountName === ''}
				/>
			</div>

			<div>
				<div className='withdraw-box4' id='withdraw-box4'>
					<div className='withdraw-box6'>
						<img
							className='deleteicon'
							src={deleteicon}
							onClick={beforeStage}
						/>
						<h4 className='leftAlignedText'>
							모아클럽 이용 통화는 무엇인가요?
						</h4>
						<span className='leftAlignedText'>
							설정한 통화로 실시간 환전되어 돈을 모을 수 있어요.
						</span>
						<select
							className='currencySelect'
							value={currency}
							onChange={handleCurrencyChange}
						>
							<option value='' disabled selected>
								통화를 선택해 주세요.
							</option>
							<option value='KRW'>🇰🇷 KRW</option>
							<option value='CNY'>🇨🇳 CNY</option>
							<option value='JPY'>🇯🇵 JPY</option>
							<option value='USD'>🇺🇸 USD</option>
						</select>
					</div>
					<div className='withdraw-box5'>
						<CommonBtn
							type='pink'
							value='다음'
							onClick={nextNextStage}
							disabled={currency === ''}
						/>
					</div>
				</div>
			</div>

			<div>
				<div className='withdraw-box7' id='withdraw-box7'>
					<div className='moaclub-box6'>
						<img
							className='deleteicon'
							src={deleteicon}
							onClick={beforeStage}
						/>
						<h4 className='leftAlignedText'>회비 내는 날은 언제인가요?</h4>
						<div className='datePicker'>
							<h2 className='leftAlignedText centeredText'>매월</h2>
							<div className='picker'>
								<Picker list={daysOfMonth} onSelectedChange={handleDayChange} />
							</div>
						</div>
					</div>
					<div className='moaclub-box5'>
						<CommonBtn
							type='pink'
							value='다음'
							onClick={nextNextNextStage}
							disabled={selectedDay === 0}
						/>
					</div>
				</div>
			</div>

			<div>
				<div className='withdraw-box4' id='withdraw-box8'>
					<div className='moaclub-box6'>
						<img
							className='deleteicon'
							src={deleteicon}
							onClick={beforeStage}
						/>
						<h4 className='leftAlignedText'>회비 금액은 얼마인가요?</h4>
						<div className='clubFeeBox'>
							<h2 className='leftAlignedText'>매월</h2>
							<div className='picker'>
								<input
									className='clubFeeText'
									type=''
									value={amount}
									onChange={handleAmountChange}
									placeholder='금액을 입력하세요.'
								/>
								<span className='currencySymbol'>
									{getCurrencySymbol(currency)}
								</span>
							</div>
						</div>
					</div>
					<div className='moaclub-box5'>
						<CommonBtn
							type='pink'
							value='완료'
							onClick={next}
							disabled={amount === ''}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default MoaclubCreatePage;
