import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import autotrsfIcon from '../../assets/images/moaclub/moa-autotrsf.png';
import { MoaAutoTrsf } from '../../type/commonType';

function MoaclubAutoTrsf() {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('nation') || i18n.language);
  
	useEffect(() => {
    if(language=="Korea") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
  const navigate = useNavigate();
  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;
  const userName = localStorage.getItem('name') as string;
  const [moaclubName, setMoaClubName] = useState('');
  const [count, setCount] = useState(0);
  const [autoTrsf, setAutoTrsf] = useState<MoaAutoTrsf | null>(null);

  const getMoaclubName = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
        {
          userIdx,
          accountId,
        }
      );
      return response.data.data.name;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAutoTrsf = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/moaclub/auto-transfer`,
        {
          userIdx,
          accountId,
        }
      );
      console.log(response.data);
      if (response.data.status === 200) {
        setCount(1);
        return response.data.data;
      } else {
        setCount(0);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAutoTrsfInfo = async () => {
      if (userIdx && accountId) {
        const moaClubNameRes = await getMoaclubName(userIdx, accountId);
        const autoTrsfRes = await getAutoTrsf(userIdx, accountId);
        setMoaClubName(moaClubNameRes);
        if (autoTrsfRes) {
          setAutoTrsf(autoTrsfRes);
        }
      }
    };
    fetchAutoTrsfInfo();
  }, [userIdx, accountId]);

  const goAutoTrsfDetail = () => {
    navigate(`/moaclub/autotrsf/detail/${accountId}`);
  };

  const goAutoTrsfRegister = () => {
    navigate(`/moaclub/autotrsf/register/${accountId}`);
  };

  return (
    <>
      <Header value={t('moaclubAutoTrsfHeader')} disabled={false} />
      <div className='content'>
        <div className='moaAutoTrsf'>
          <img src={autotrsfIcon} className='autoTrsfBanner' alt='Auto Transfer Banner' />
          <div className='moaAutoTrsfInfo'>
            <span className='moaAutoTrsfName'>{userName} </span>
            {t('userGreeting', { userName })}
          </div>
          <div className='moaAutoTrsfInfo'>
            <span className='moaAutoTrsfHighlight'>
              {moaclubName}&#40;
              {accountId}&#41;
            </span>
            {t('autoTransferTo')}
          </div>
          <div className='moaAutoTrsfInfo'>
            <span className='moaAutoTrsfHighlight'>{count}</span>
            {t('autoTrsfCount', { count })}
          </div>

          {autoTrsf ? (
            <div className='moaAutoTrsfBox' onClick={goAutoTrsfDetail}>
              <div className='moaAutoTrsfBoxHeader'>
                <span>{t('detail')} &#62;</span>
                <div className='moaAutoTrsfBoxBadge'>{t('openBanking')}</div>
              </div>
              <hr />
              <table>
                <tbody>
                  <tr>
                    <th>{t('bankName')}</th>
                    <td>{t('hanaOnepick')}</td>
                  </tr>
                  <tr>
                    <th>{t('outAccId')}</th>
                    <td>{autoTrsf.outAccId}</td>
                  </tr>
                  <tr>
                    <th>{t('payerNumber')}</th>
                    <td>{userIdx.split('-').pop()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className='moaAutoTrsfCreate' onClick={goAutoTrsfRegister}>
              {t('register')}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MoaclubAutoTrsf;
