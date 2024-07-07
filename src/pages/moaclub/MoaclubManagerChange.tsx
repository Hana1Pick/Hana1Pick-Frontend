import Header from '../../layouts/MoaclubHeader1';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import MoaClubCircleLogo from '../../assets/images/account/MoaClubCircleLogo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import { MoaclubInfo } from '../../type/commonType';
import axios from 'axios';
import CommonModal3 from '../../components/modal/CommonModal3';
import { useTranslation } from 'react-i18next';

function MoaclubManagerChange() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;
  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
  const [candidateIdx, setCandidateIdx] = useState<string>('');
  const [look, setLook] = useState(false);
  const [look2, setLook2] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
  const getMoaclubInfo = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`,
        {
          userIdx,
          accountId,
        }
      );
      console.log('1', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchMoaclubInfo = async () => {
      if (userIdx && accountId) {
        const moaClubInfoRes = await getMoaclubInfo(userIdx, accountId);
        setMoaclub(moaClubInfoRes);
      }
    };
    fetchMoaclubInfo();
  }, [userIdx, accountId]);

  const manager = moaclub?.memberList.find(
    (member) => member.role === 'MANAGER'
  );

  const handleSelectManager = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCandidateIdx(event.target.value);
    setIsBtnDisabled(false);
  };

  const next = () => {
    if (
      candidateIdx !== manager?.userIdx &&
      candidateIdx !== null &&
      candidateIdx !== ''
    ) {
      const requestUrl = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/request-manager`;

      const requestData = {
        accountId: accountId,
        userIdx: userIdx,
        candidateIdx: candidateIdx,
      };

      axios
        .post(requestUrl, requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            console.log('요청완료');
            setLook2(true);
            setDisabled(true);
          } else {
            setLook(true);
            setDisabled(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Header value={t('moaclubManagerChange')} disabled={disabled} />
      <div className='content'>
        <div className='moaclubModify'>
          <div className='moaclubManagerChangeTxt'>{t('changeManagerPrompt')}</div>
          <div className='moaHanaDepositInfoBox'>
            <img src={MoaClubCircleLogo} className='moaAccCircle' alt='Moa Club Logo' />
            <div className='moaDepositDetailBox'>
              <div>{t('moaclubName')}</div>
              <div>{moaclub?.accountId}</div>
            </div>
          </div>
          <label className='moaclubModifyElement'>{t('managerChange')}</label>
          <select className='managerSelect' onChange={handleSelectManager}>
            <option disabled>{manager?.userName}</option>
            {moaclub?.memberList
              .filter((member) => member.role !== 'MANAGER')
              .map((member) => (
                <option key={member.userName} value={member.userIdx}>
                  {member.userName}
                </option>
              ))}
          </select>
          <div className='moaHanaWithdrawInfoTxt'>
            {t('changeManagerInfo')}
          </div>
        </div>
      </div>

      <div className='buttonContainer'>
        <CommonBtn
          type='pink'
          value={t('complete')}
          onClick={next}
          disabled={isBtnDisabled}
        />
      </div>

      <CommonModal3
        msg={t('requestExists')}
        show={look}
        onConfirm={() => {
          navigate(`/moaclub/vote/manager/${accountId}`);
        }}
      />

      <CommonModal3
        msg={t('managerChangeRequested')}
        show={look2}
        onConfirm={() => {
          navigate(`/moaclub/vote/manager/${accountId}`);
        }}
      />
    </>
  );
}

export default MoaclubManagerChange;
