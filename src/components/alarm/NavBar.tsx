import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import closeIcon from '../../assets/images/alarm/close_icon.png';
import alarmIcon from '../../assets/images/alarm/moaAlarmIcon.png';
import voteIcon from '../../assets/images/alarm/moaVoteIcon.png';
import './style.scss';
import { NotificationType } from '../../type/commonType';
import axios from 'axios';

interface NavBarProps {
	isOpen: boolean;
	onClose: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, onClose }) => {
	const navigate = useNavigate();
	const userIdx = localStorage.getItem('userIdx') as string;
	const [notifications, setNotifications] = useState<NotificationType[]>([]);

	const getNotifications = async (userIdx: string) => {
		try {
			const response = await axios.get(
				`http://${process.env.REACT_APP_BESERVERURI}/api/notification/${userIdx}`
			);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchNotifications = async () => {
			if (userIdx) {
				const notificationRes = await getNotifications(userIdx);
				console.log(notificationRes);
				// 최신순으로 정렬
				const sortedNotifications = notificationRes.sort(
					(a: NotificationType, b: NotificationType) => {
						return (
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						);
					}
				);
				setNotifications(sortedNotifications);
			}
		};
		fetchNotifications();
	}, [userIdx]);

	const calculateTime = (createdAt: string) => {
		const currentTime = new Date();
		const createdAtTime = new Date(createdAt);

		const diffInMills = currentTime.getTime() - createdAtTime.getTime();
		const diffInSeconds = Math.floor(diffInMills / 1000);
		const diffInMinutes = Math.floor(diffInSeconds / 60);
		const diffInHours = Math.floor(diffInMinutes / 60);
		const diffInDays = Math.floor(diffInHours / 24);

		if (diffInMinutes < 1) {
			return '방금 전';
		} else if (diffInHours < 1) {
			return `${diffInMinutes}분 전`;
		} else if (diffInDays < 1) {
			return `${diffInHours}시간 전`;
		} else if (diffInDays === 1) {
			return '어제';
		} else {
			return `${diffInDays}일 전`;
		}
	};

	const deleteNotification = async (idx: number) => {
		try {
			const response = await axios.delete(
				`http://${process.env.REACT_APP_BESERVERURI}/api/notification/${idx}`
			);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const checkNotification = (notification: NotificationType) => {
		const url = `http://${process.env.REACT_APP_BESERVERURI}/api/notification/${notification.idx}`;
		const link = notification.url;

		axios
			.delete(url)
			.then((res) => {
				if (res.data.status === 200) {
					navigate(link);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const groupByDate = (notifications: NotificationType[]) => {
		return notifications.reduce(
			(groups, notification) => {
				const dateObj = new Date(notification.createdAt);
				const year = dateObj.getFullYear();
				const month = dateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
				const day = dateObj.getDate();
				const formattedDate = `${year}.${month}.${day}`;

				if (!groups[formattedDate]) {
					groups[formattedDate] = [];
				}
				groups[formattedDate].push(notification);
				return groups;
			},
			{} as { [key: string]: NotificationType[] }
		);
	};

	const groupedNotifications = groupByDate(notifications);

	return (
		<div className={`nav-bar ${isOpen ? 'open' : ''}`}>
			<div className='nav-header'>
				<img
					src={closeIcon}
					alt='close'
					className='close-btn'
					onClick={onClose}
					style={{ width: '34px' }}
				/>
			</div>

			<div className='nav-links'>
				{Object.keys(groupedNotifications).length > 0 ? (
					Object.keys(groupedNotifications).map((date) => (
						<div key={date} className='notification-group'>
							<div className='notificationDateBox'>
								<div className='notificationDateLine' />
								<div className='notification-date'>{date}</div>
								<div className='notificationDateLine' />
							</div>

							{groupedNotifications[date].map((notification, index) => (
								<div key={notification.idx} className='notificationBox'>
									<div>
										{notification.type === 'ALARM' ? (
											<img
												className='notificationIcon'
												src={alarmIcon}
												alt='alarmIcon'
											/>
										) : (
											<img
												className='notificationIcon'
												src={voteIcon}
												alt='voteIcon'
											/>
										)}
									</div>
									<div
										className='notificationContainer'
										onClick={() => checkNotification(notification)}
									>
										<div className='notificationTitle'>
											{notification.content.split('\n')[0]}
										</div>
										<div className='notificationContext'>
											{notification.content.split('\n')[1]}
										</div>
										<span className='notificationTime'>
											{calculateTime(notification.createdAt)}
										</span>
										{index !== groupedNotifications[date].length - 1 && (
											<div className='notificationSeperate'></div>
										)}
									</div>
								</div>
							))}
						</div>
					))
				) : (
					<li className='noNotifications'>알림이 없습니다.</li>
				)}
			</div>
		</div>
	);
};

export default NavBar;
