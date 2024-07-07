import { useContext, useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import Header from '../../layouts/MoaclubHeader1';
import deleteicon from '../../assets/images/common/deleteicon.png';
import Picker from './Picker';
import { useNavigate } from 'react-router-dom';
import { MoaclubContext } from '../../contexts/MoaclubContextProvider';
import { useTranslation } from 'react-i18next';

function MoaclubCreatePage() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
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
				return '위안';
			case 'JPY':
				return '엔';
			case 'USD':
				return '달러';
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
				{t('club_name_input_title')}
				</h4>
			</div>
			<input
				type='text'
				value={accountName}
				onChange={handleInputChange}
				className='accountNameInput'
				placeholder={t('club_name_input_placeholder')}
			/>
			<div className='buttonContainer'>
				<CommonBtn
					type='pink'
					value={t('next_button_text')}
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
							{t('account_name_input_title')}
						</h4>
						<span className='leftAlignedText'>
							{t('account_name_input_description')}
						</span>
						<select
							className='currencySelect'
							value={currency}
							onChange={handleCurrencyChange}
						>
							<option value='' disabled selected>
								{t('currency_select_placeholder')}
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
							value={t('next_button_text')}
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
						<h4 className='leftAlignedText'>{t('select_day_title')}</h4>
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
							value={t('next_button_text')}
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
						<h4 className='leftAlignedText'>{t('enter_amount_title')}</h4>
						<div className='clubFeeBox'>
							<div className='leftAlignedText moaMonthTxt'>매월</div>
							<input
								className='clubFeeText'
								type=''
								value={amount}
								onChange={handleAmountChange}
								placeholder={t('enter_amount_placeholder')}
							/>
							<span className='currencySymbol'>
								{getCurrencySymbol(currency)}
							</span>
						</div>
					</div>
					<div className='moaclub-box5'>
						<CommonBtn
							type='pink'
							value={t('finish_button_text')}
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
