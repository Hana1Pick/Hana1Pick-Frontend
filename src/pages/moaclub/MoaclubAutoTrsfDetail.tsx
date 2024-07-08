import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import deleteicon from '../../assets/images/common/deleteicon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoaAutoTrsf } from '../../type/commonType';
import CommonBtn from '../../components/button/CommonBtn';
import CommonModal3 from '../../components/modal/CommonModal3';
import { useTranslation } from 'react-i18next';

function MoaclubAutoTrsfDetail() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;
  const userName = localStorage.getItem('name') as string;
  const [moaclubName, setMoaClubName] = useState('');
  const [autoTrsf, setAutoTrsf] = useState<MoaAutoTrsf | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [look, setLook] = useState(false);

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
      return response.data.data;
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

  const deleteAutoTrsf = () => {
    const url = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/auto-transfer`;

    axios
      .delete(url, {
        data: {
          outAccId: autoTrsf?.outAccId,
          inAccId: autoTrsf?.inAccId,
          userIdx: userIdx,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setLook(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    const currencySymbol = getCurrencyValue(autoTrsf?.currency!);

    if (autoTrsf?.currency === 'KRW') {
      return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${currencySymbol}`;
    } else {
      return `${currencySymbol}${amount.toFixed(2)}`;
    }
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

    if (div1) {
      div1.style.display = 'none';
    }
    if (div2) {
      div2.style.display = 'none';
    }

    setIsDisabled(false);
  };

  const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('nation') || i18n.language);
  
	useEffect(() => {
    if(language=="Korea") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
  return (
    <>
      <div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
      <Header value={t('autoTransfer')} disabled={isDisabled} />
      <div className='content'>
        <div className='moaAutoTrsfDetail'>
          <div className='moaAutoTrsfDetailTxt'>{moaclubName} {t('autoTransfer')}</div>
          <table>
            <tbody className='moaAutoTrsfDetailTable'>
              <tr>
                <th>{t('bankName')}</th>
                <td>{t('hanaOnepick')}</td>
              </tr>
              <tr>
                <th>{t('depositAccountInfo')}</th>
                <td>
                  {autoTrsf?.inAccId} <br />
                  {t('hanaOnepick')} {moaclubName}
                </td>
              </tr>
              <tr>
                <th>{t('withdrawalAccountInfo')}</th>
                <td>
                  {autoTrsf?.outAccId} <br />
                  {t('hanaOnepick')} {t('withdrawalAccount')}
                </td>
              </tr>
              <tr>
                <th>{t('accountHolder')}</th>
                <td>{userName}</td>
              </tr>
              <tr>
                <th>{t('paymentType')}</th>
                <td>{t('immediateWithdrawal')}</td>
              </tr>
              <tr>
                <th>{t('savingsCurrency')}</th>
                <td>{autoTrsf?.currency}</td>
              </tr>
              <tr>
                <th>{t('transferBaseCurrency')}</th>
                <td>{autoTrsf?.currency === 'KRW' ? '원화' : '외화'}</td>
              </tr>
              <tr>
                <th>{t('transferAmount')}</th>
                <td>{formatCurrency(autoTrsf?.amount!)}</td>
              </tr>
              <tr>
                <th>{t('transferDate')}</th>
                <td>매월 / {autoTrsf?.atDate}일</td>
              </tr>
              <tr>
                <th>{t('payerNumber')}</th>
                <td>{userIdx.split('-').pop()}</td>
              </tr>
              <tr>
                <th>{t('autoTransferRegDate')}</th>
                <td>{autoTrsf?.createDate}</td>
              </tr>
            </tbody>
          </table>
          <div className='moaAutoTrsfDelete'>
            <div className='moaAutoTrsfDeleteTxt' onClick={nextStage}>
              {t('autoTransferCancel')}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='withdraw-box7' id='withdraw-box4'>
          <div className='moaclub-box6'>
            <img
              className='deleteicon'
              src={deleteicon}
              onClick={beforeStage}
              alt='deleteIcon'
            />
          </div>
          <div>
            <div>{t('cancelAutoTransferConfirmation')}</div>
            <div className='moaAutoTrsfDetailPopUp'>
              <table className='moaAutoTrsfDetailPopUpTable'>
                <tbody>
                  <tr>
                    <th>{t('bankName')}</th>
                    <td>{t('hanaOnepick')}</td>
                  </tr>
                  <tr>
                    <th>{t('withdrawalAccount')}</th>
                    <td>{autoTrsf?.outAccId}</td>
                  </tr>
                  <tr>
                    <th>{t('transferInfo')}</th>
                    <td>
                      매월 {autoTrsf?.atDate}일{' '}
                      {formatCurrency(autoTrsf?.amount!)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='moaclub-box5'>
            <CommonBtn
              type='pink'
              value={t('cancel')}
              onClick={deleteAutoTrsf}
              disabled={false}
            />
          </div>
        </div>
      </div>
      <CommonModal3
        msg={t('canceledAutoTransferMessage')}
        show={look}
        onConfirm={() => {
          navigate(`/moaclub/autotrsf/${accountId}`);
        }}
      />
    </>
  );
}

export default MoaclubAutoTrsfDetail;
