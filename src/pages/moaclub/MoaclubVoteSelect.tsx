import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import righticon from '../../assets/images/common/righticon.png';
import { useNavigate, useParams } from 'react-router-dom';
import CommonModal3 from '../../components/modal/CommonModal3';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function MoaclubVoteSelect() {
  const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);
  
	useEffect(() => {
    if(language=="KOR") i18n.changeLanguage('ko');
	  else i18n.changeLanguage('ch');
	}, [language, i18n]);
  const navigate = useNavigate();
  const userIdx = localStorage.getItem('userIdx') as string;
  const { accountId } = useParams();
  const [look, setLook] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const goMoaclubVoteManager = () => {
    const url = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/vote-result`;

    axios
      .post(
        url,
        {
          accountId,
          userIdx,
        },
        {
          params: {
            type: 0,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          navigate(`/moaclub/vote/manager/${accountId}`);
        } else {
          setLook(true);
          setDisabled(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goMoaclubVoteTrsf = () => {
    const url = `${process.env.REACT_APP_BESERVERURI}/api/moaclub/vote-result`;

    axios
      .post(
        url,
        {
          accountId,
          userIdx,
        },
        {
          params: {
            type: 1,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          navigate(`/moaclub/vote/trsf/${accountId}`);
        } else {
          setLook(true);
          setDisabled(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header value={t('moaclub_vote_header')} disabled={disabled} />
      <div className='content'>
        <div className='moaclubSettingContainer'>
          <div onClick={goMoaclubVoteManager}>
            {t('manager_change_text')}
            <img className='rightIcon' alt={t('right_icon_alt_text')} src={righticon} />
          </div>
          <div onClick={goMoaclubVoteTrsf}>
            {t('withdraw_text')}
            <img className='rightIcon' alt={t('right_icon_alt_text')} src={righticon} />
          </div>
        </div>
      </div>

      <CommonModal3
        msg={t('vote_not_exist_msg')}
        show={look}
        onConfirm={() => {
          setLook(false);
        }}
      />
    </>
  );
}
export default MoaclubVoteSelect;
