import CelubHeader from '../../components/Header';
import { CelubAccount } from '../../type/commonType';
import './CelublogStyle.scss';
import axios from 'axios';
import qs from 'qs';
import { useEffect, useState } from 'react';
import MenuBar from '../../components/menubar/MenuBar';
import hanaLogo from '../../assets/images/celub/hanaLogo.png';
import photoBanner from '../../assets/images/celub/photoBanner.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

function CelubAccountList() {
	const navigate = useNavigate();
	const [accList, setAccList] = useState<CelubAccount[]>([]);
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('ko-KR').format(amount);
	};
	useEffect(() => {
		const data = {
			userIdx: localStorage.getItem('userIdx'),
		};
		axios
			.post(
				`${process.env.REACT_APP_BESERVERURI}/api/celub/account-list`,
				qs.stringify(data)
			)
			.then((res) => {
				console.log(res.data.data);
				setAccList(res.data.data);
			})
			.catch((error) => {
				alert('실패');
			});
	}, []);

	const goAccount = (accountId: string) => {
		navigate('/celub/detail', { state: accountId });
	};

	const goPhoto = () => {
		navigate('/photo-card/image');
	};

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '70px',
	};

	return (
		<>
			<CelubHeader value='셀럽로그 계좌 조회' />
			<div className='celubListBox1'>
				<span>조회할 계좌를 선택해주세요</span>
			</div>
			<Slider {...settings}>
				{accList.map((account: CelubAccount) => (
					<div className='celubCardWrapper' key={account.account_id}>
						<div
							className='celubCard'
							onClick={() => goAccount(account.account_id)}
						>
							<div className='celubCardInner'>
								<div className='celubCardFront'>
									<div className='celub-accountList-box'>
										<img className='celub-logo' src={hanaLogo} />
										<div className='celub-balance'>{account.name}</div>
										<div className='celub-accountNum'>{account.account_id}</div>
										<div className='celub-add-info'>연 2.00%</div>
										<div className='celub-balance'>
											{formatCurrency(account.balance)}원
										</div>
										<div className='celub-add-info'>{account.createDate}</div>
									</div>
								</div>
								<div
									className='celubCardBack'
									style={{
										backgroundImage: `url(${account.imgSrc})`,
										opacity: '0.7',
									}}
								></div>
							</div>
						</div>
					</div>
				))}
			</Slider>
			<div className='celub-photo-banner' onClick={goPhoto}>
				<img src={photoBanner} />
				<div>
					<p>하나원픽 포토카드</p>
					<span>
						더 행복하고 더 즐겁게
						<br />
						최애와 하나
					</span>
				</div>
			</div>
			<MenuBar />
		</>
	);
}

export default CelubAccountList;
