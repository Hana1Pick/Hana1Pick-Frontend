import Header from '../../layouts/MoaclubHeader1';
import CommonBtn from '../../components/button/CommonBtn';
import joinGif from '../../assets/images/moaclub/moaclubJoin.GIF';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommonModal3 from '../../components/modal/CommonModal3';
import { useTranslation } from 'react-i18next';

interface MoaclubInfo {
  managerName: string;
  moaclubName: string;
}

const getMoaclubInfo = async (accountId: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BESERVERURI}/api/moaclub/admission-info`,
      {
        params: { accountId },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null; // 오류 발생 시 null 반환
  }
};

function MoaclubJoin() {
  const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
	
	useEffect(() => {
	  if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
  const navigate = useNavigate();

  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;

  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [look, setLook] = useState(false);

  useEffect(() => {
    const fetchMoaclubInfo = async () => {
      if (accountId) {
        const moaclubInfo = await getMoaclubInfo(accountId);
        setMoaclub(moaclubInfo);
      }
    };

    fetchMoaclubInfo();
  }, [accountId]);

  const next = () => {
    const url = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/admission`;

    const data = {
      accountId: accountId,
      userIdx: userIdx,
    };

    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.status === 202) {
          setLook(true);
          setIsDisabled(true);
        } else {
          navigate('/moaclub/main/' + accountId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header value={t('header.invitation')} disabled={isDisabled} />
      <div className='content'>
        <img className='joinGif' src={joinGif} alt={t('content.inviteMessage')} />

        <h2 className='inviteClubNameTxt1'>{moaclub?.moaclubName}</h2>
        <h2 className='inviteClubNameTxt2'>{t('content.inviteMessage')}</h2>
        <table className='completeInfo'>
          <tr>
            <th>{t('table.inviter')}</th>
            <td colSpan={2}>{moaclub?.managerName}</td>
          </tr>
          <tr>
            <th>{t('table.clubName')}</th>
            <td colSpan={2}>{moaclub?.moaclubName}</td>
          </tr>
        </table>
      </div>

      <div className='buttonContainer'>
        <CommonBtn
          type='pink'
          value={t('button.join')}
          onClick={next}
          disabled={false}
        />
      </div>

      <CommonModal3
        msg={t('modal.alreadyJoined')}
        show={look}
        onConfirm={() => {
          navigate(`/moaclub/main/${accountId}`);
        }}
      />
    </>
  );
}


export default MoaclubJoin;
