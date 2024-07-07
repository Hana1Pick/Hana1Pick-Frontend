import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MemeberFeeStatus, MoaclubInfo } from '../../type/commonType';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

type StatusNumType = {
	unpaid: number;
	paid: number;
};

function MoaclubFeeStatus() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const { accountId } = useParams();

	const userIdx = localStorage.getItem('userIdx') as string;
	const today = new Date();
	const currentYear = today.getFullYear(); // 2024
	const currentMonth = today.getMonth() + 1; // 6

	const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
	const [feeStatus, setFeeStatus] = useState<MemeberFeeStatus[]>([]);
	const [selectedBtn, setSelectedBtn] = useState<string>('전체'); // 초기값은 "전체"로 설정
	const [statusNum, setStatusNum] = useState<StatusNumType>({
		unpaid: 0,
		paid: 0,
	});
	const [yearMonths, setYearMonths] = useState<string[]>([]); // 배열로 년-월 형식의 날짜 리스트 관리
	const [selectedMonth, setSelectedMonth] = useState(
		`${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}`
	);

	const getMoaclubInfo = async (userIdx: string, accountId: string) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
				{
					userIdx,
					accountId,
				}
			);
			console.log('MoaclubInfo:', response.data.data);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const getMoaclubFeeStatus = async (accountId: string, checkDate: string) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BESERVERURI}/api/moaclub/fee`,
				{
					accountId,
					checkDate,
				}
			);
			console.log('MemeberFeeStatus:', response.data.data);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const getYearMonthList = () => {
		const yearMonths = [];
		console.log(
			'moaclub?.createDate.year',
			moaclub?.createDate?.substring(0, 4)
		);

		// 현재 년-월부터 moaclub.createDate까지의 리스트 생성
		for (
			let year = Number(moaclub?.createDate?.substring(0, 4));
			year <= currentYear;
			year++
		) {
			const startMonth =
				year === Number(moaclub?.createDate?.substring(0, 4))
					? Number(moaclub?.createDate?.substring(5, 7))
					: 1;
			const endMonth = year === currentYear ? currentMonth : 12;

			console.log('start, end >> ', startMonth, endMonth);

			for (let month = startMonth; month <= endMonth; month++) {
				const yearMonth = `${year}-${month < 10 ? '0' + month : month}`;
				console.log('yearMonth', yearMonth);
				yearMonths.push(yearMonth);
			}
		}

		setYearMonths(yearMonths);
	};

	useEffect(() => {
		const fetchMoaclubInfo = async () => {
			if (userIdx && accountId) {
				const moaClubInfoRes = await getMoaclubInfo(userIdx, accountId);
				const feeStatusRes = await getMoaclubFeeStatus(
					accountId!,
					selectedMonth!
				);
				const feeStatus = feeStatusRes.sort(
					(a: MemeberFeeStatus, b: MemeberFeeStatus) =>
						a.name.localeCompare(b.name)
				);
				setMoaclub(moaClubInfoRes);
				setFeeStatus(feeStatus);
			}
		};

		fetchMoaclubInfo();
	}, [userIdx, accountId, selectedMonth]);

	useEffect(() => {
		setStatusNum({
			unpaid: feeStatus.filter(
				(member: MemeberFeeStatus) => member.status === 'UNPAID'
			).length,
			paid: feeStatus.filter(
				(member: MemeberFeeStatus) => member.status === 'PAID'
			).length,
		});
	}, [feeStatus]);

	useEffect(() => {
		if (moaclub?.createDate) {
			getYearMonthList(); // moaclub.createDate가 설정되면 년-월 리스트를 가져옴
		}
	}, [moaclub?.createDate]);

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
		const currencySymbol = getCurrencySymbol(moaclub?.currency!);

		if (moaclub?.currency === 'KRW') {
			return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
		} else {
			return `${currencySymbol}${amount.toFixed(2)}`;
		}
	};

	const handleSelectChange = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedMonth(event.target.value);
	};

	const handleButtonClick = async (btnName: string) => {
		setSelectedBtn(btnName);
	};

	return (
		<>
		  <Header value={t('fee_status_header')} disabled={false} />
	
		  <div className='content'>
			<select
			  className='moaclubFeeSelect'
			  onChange={handleSelectChange}
			  value={selectedMonth}
			>
			  {yearMonths.map((yearMonth, index) => (
				<option key={index} value={yearMonth}>
				  {yearMonth}
				</option>
			  ))}
			</select>
	
			<div className='clubFeeBalance'>
			  {formatCurrency(moaclub?.balance!)}
			</div>
	
			<div className='clubFeeRule'>
			  {t('monthly_due_rule', { atDate: moaclub?.atDate, clubFee: formatCurrency(moaclub?.clubFee!) })}
			</div>
	
			<div className='moaClubMainBtnContainer'>
			  <div
				className={`moaclubFeeStatusBtn ${selectedBtn === '전체' ? 'selected' : ''}`}
				onClick={() => handleButtonClick('전체')}
			  >
				{t('all_button')}
			  </div>
			  <div
				className={`moaclubFeeStatusBtn ${selectedBtn === '미입금' ? 'selected' : ''}`}
				onClick={() => handleButtonClick('미입금')}
			  >
				{t('unpaid_button')} {statusNum.unpaid}
			  </div>
			  <div
				className={`moaclubFeeStatusBtn ${selectedBtn === '입금완료' ? 'selected' : ''}`}
				onClick={() => handleButtonClick('입금완료')}
			  >
				{t('paid_button')} {statusNum.paid}
			  </div>
			</div>
		  </div>
	
		  {selectedBtn !== '전체' && (
			<div className='moaclubFeeContent'>
			  <table className='moaclubFeeTable'>
				<tbody>
				  {feeStatus
					.filter(member => selectedBtn === '미입금' ? member.status === 'UNPAID' : member.status === 'PAID')
					.map((member, index) => (
					  <tr key={index}>
						<td>
						  <img
							className='moaclubFeeProfile'
							src={member.profile}
							alt='프로필 사진'
						  />
						</td>
						<td className='moaclubFeeMemberName'>{member.name}</td>
						<td className='moaclubFeeAmount'>
						  {member.amount === 0 ? '-' : `${formatCurrency(member.amount)}`}
						</td>
					  </tr>
					))}
				</tbody>
			  </table>
			</div>
		  )}
	
		  <div className='buttonContainer'>
			<span className='moaclubFeeDesc'>
			  {t('fee_status_description')}
			</span>
		  </div>
		</>
	  );
	}
export default MoaclubFeeStatus;
