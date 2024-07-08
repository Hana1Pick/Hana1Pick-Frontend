import { useContext, useEffect, useState } from 'react';
import moaImg from '../../assets/images/moaclub/moaclub-complete.png';
import { MoaclubContext } from '../../contexts/MoaclubContextProvider';
import { useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/button/CommonBtn';
import { useTranslation } from 'react-i18next';

function MoaclubComplete() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('nation') || i18n.language);
	
	useEffect(() => {
	  if(language=="Korea") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
	const navigate = useNavigate();
	const currentDate = new Date().toLocaleDateString().replace(/\.$/, '');
	const { name, moaclub }: any = useContext(MoaclubContext);

	const next = () => {
		localStorage.setItem('moaclub', moaclub);
		navigate('/moaclub/invite', { state: { moaclub } });
	};

	return (
		<>
		  <div className='completeBox1'>
			<div className='completeBox2'>
			  <img className='MoaImg' src={moaImg} alt='moaImg' />
			  <div className='textBox1'>
				<p>{t('completeBox.title')}</p>
				<p>{t('completeBox.subtitle')}</p>
			  </div>
			</div>
		  </div>
		  <div className='completeBox3'>
			<div className='tableBox'>
			  <table className='completeInfo'>
				<tbody>
				  <tr>
					<th>{t('completeBox.withdrawAccount')}</th>
					<td colSpan={2}>
					  {name} <br /> {moaclub}
					</td>
				  </tr>
				  <tr>
					<th>{t('completeBox.interestRate')}</th>
					<td colSpan={2}>
					  <span style={{ color: '#1ABA78', fontWeight: 'bold' }}>2.00</span>%
					</td>
				  </tr>
				  <tr>
					<th>{t('completeBox.joinDate')}</th>
					<td colSpan={2}>{currentDate}</td>
				  </tr>
				</tbody>
			  </table>
			</div>
			<div className='buttonContainer'>
			  <CommonBtn type='pink' value={t('completeBox.buttonLabel')} onClick={next} disabled={false} />
			</div>
		  </div>
		</>
	  );
	}


export default MoaclubComplete;
