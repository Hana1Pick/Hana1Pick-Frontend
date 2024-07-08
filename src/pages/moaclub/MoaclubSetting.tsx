import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import deleteicon from '../../assets/images/common/deleteicon.png';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommonBtn from '../../components/button/CommonBtn';
import CommonModal3 from '../../components/modal/CommonModal3';
import { useTranslation } from 'react-i18next';

function MoaclubSetting() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;
  const [isManager, setIsManager] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [look, setLook] = useState(false);
  const [look2, setLook2] = useState(false);
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('nation') || i18n.language);
  
	useEffect(() => {
    if(language=="Korea") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
  const getManagerCheck = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/moaclub/manager-check`,
        {
          userIdx,
          accountId,
        }
      );
      return response.data.data.check;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchMoaclubInfo = async () => {
      if (userIdx && accountId) {
        const isManager = await getManagerCheck(userIdx, accountId);
        setIsManager(isManager);
      }
    };
    fetchMoaclubInfo();
  }, [userIdx, accountId]);

  const goMoaclubModify = () => {
    navigate(`/moaclub/modify/${accountId}`);
  };

  const goMoaclubVote = () => {
    navigate(`/moaclub/vote/${accountId}`);
  };

  const goMoaclubAutoTrsf = () => {
    navigate(`/moaclub/autotrsf/${accountId}`);
  };

  const next = () => {
    const requestUrl = `${process.env.REACT_APP_BESERVERURI}/api/moaclub`;

    axios
      .delete(requestUrl, {
        data: {
          accountId: accountId,
          userIdx: userIdx,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setLook(true);
        } else {
          setLook2(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <>
      <div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
      <Header value={t('moaclub.management')} disabled={isDisabled} />
      <div className='content'>
        <div className='moaclubSettingContainer'>
          <div onClick={goMoaclubVote}>
            {t('moaclub.vote')}
            <img className='rightIcon' alt='right-icon' src={righticon} />
          </div>
          {isManager && (
            <div onClick={goMoaclubModify}>
              {t('moaclub.modify')}
              <img className='rightIcon' alt='right-icon' src={righticon} />
            </div>
          )}
          <div onClick={goMoaclubAutoTrsf}>
            {t('moaclub.autoTransfer')}
            <img className='rightIcon' alt='right-icon' src={righticon} />
          </div>
          <div onClick={nextStage}>
            {t('moaclub.terminate')}
            <img className='rightIcon' alt='right-icon' src={righticon} />
          </div>
        </div>
      </div>

      <div>
        <div className='withdraw-box4' id='withdraw-box4'>
          <div className='moaclub-box6'>
            <img
              className='deleteicon'
              src={deleteicon}
              alt='Delete Icon'
              onClick={beforeStage}
            />
          </div>
          <div>
            <div>{t('moaclub.terminateConfirm')}</div>
            <div className='moaAutoTrsfDetailPopUp'>
              <table className='moaAutoTrsfDetailPopUpTable'>
                <tbody>
                  <tr>
                    <th>{t('moaclub.productName')}</th>
                    <td>하나원픽 모아클럽</td>
                  </tr>
                  <tr>
                    <th>{t('moaclub.accountNumber')}</th>
                    <td>{accountId}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='moaclub-box5'>
            <CommonBtn
              type='pink'
              value={t('moaclub.terminateAction')}
              onClick={next}
              disabled={false}
            />
          </div>
        </div>
      </div>

      <CommonModal3
        msg={t('moaclub.terminated')}
        show={look}
        onConfirm={() => {
          navigate('/');
        }}
      />

      <CommonModal3
        msg={t('moaclub.membersExist')}
        show={look2}
        onConfirm={() => {
          setLook2(false);
          beforeStage();
        }}
      />
    </>
  );
}

export default MoaclubSetting;
