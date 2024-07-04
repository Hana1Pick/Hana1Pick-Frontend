import React, { useState } from 'react';
import './style.scss';

import beBellIcon from '../../assets/images/menubar/b_alarm.png';
import beHomeIcon from '../../assets/images/menubar/b_home.png';
import beQrIcon from '../../assets/images/menubar/b_qr.png';
import beUserIcon from '../../assets/images/menubar/b_my.png';

import afHomeIcon from '../../assets/images/menubar/a_home.png';
import afQrIcon from '../../assets/images/menubar/a_qr.png';
import afUserIcon from '../../assets/images/menubar/a_my.png';
import afBellIcon from '../../assets/images/menubar/a_alarm.png';

const MenuBar = () => {
	const [icons, setIcons] = useState({
		home: beHomeIcon,
		qr: beQrIcon,
		bell: beBellIcon,
		user: beUserIcon,
	});

	const handleMouseEnter = (icon: string) => {
		switch (icon) {
			case 'home':
				setIcons((prev) => ({ ...prev, home: afHomeIcon }));
				break;
			case 'qr':
				setIcons((prev) => ({ ...prev, qr: afQrIcon }));
				break;
			case 'bell':
				setIcons((prev) => ({ ...prev, bell: afBellIcon }));
				break;
			case 'user':
				setIcons((prev) => ({ ...prev, user: afUserIcon }));
				break;
			default:
				break;
		}
	};

	const handleMouseLeave = (icon: string) => {
		switch (icon) {
			case 'home':
				setIcons((prev) => ({ ...prev, home: beHomeIcon }));
				break;
			case 'qr':
				setIcons((prev) => ({ ...prev, qr: beQrIcon }));
				break;
			case 'bell':
				setIcons((prev) => ({ ...prev, bell: beBellIcon }));
				break;
			case 'user':
				setIcons((prev) => ({ ...prev, user: beUserIcon }));
				break;
			default:
				break;
		}
	};

	return (
		<div className='menu-bar'>
			<div
				className='menu-item'
				onMouseEnter={() => handleMouseEnter('home')}
				onMouseLeave={() => handleMouseLeave('home')}
			>
				<img src={icons.home} alt='home-icon' style={{ width: '2.5rem' }} />
			</div>
			<div
				className='menu-item'
				onMouseEnter={() => handleMouseEnter('qr')}
				onMouseLeave={() => handleMouseLeave('qr')}
			>
				<img
					src={icons.qr}
					alt='qr-icon'
					style={{ width: '3rem', marginTop: '0.2rem' }}
				/>
			</div>
			<div
				className='menu-item'
				onMouseEnter={() => handleMouseEnter('bell')}
				onMouseLeave={() => handleMouseLeave('bell')}
			>
				<img
					src={icons.bell}
					alt='bell-icon'
					style={{ width: '2.2rem', marginTop: '0.3rem' }}
				/>
			</div>
			<div
				className='menu-item'
				onMouseEnter={() => handleMouseEnter('user')}
				onMouseLeave={() => handleMouseLeave('user')}
			>
				<img
					src={icons.user}
					alt='user-icon'
					style={{ width: '2.2rem', marginTop: '0.4rem' }}
				/>
			</div>
		</div>
	);
};

export default MenuBar;
