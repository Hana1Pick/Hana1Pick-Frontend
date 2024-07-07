import Header from '../../layouts/MoaclubHeader1';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommonBtn from '../../components/button/CommonBtn';
import { MoaclubInfo } from '../../type/commonType';
import axios from 'axios';
import CommonModal3 from '../../components/modal/CommonModal3';
import { useTranslation } from 'react-i18next';

function MoaclubModify() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;
  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
  const [name, setName] = useState<string>('');
  const [clubFee, setClubFee] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [candidateIdx, setCandidateIdx] = useState<string>('');
  const [look, setLook] = useState(false);
  const [look2, setLook2] = useState(false);
  const [look3, setLook3] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
        setName(moaClubInfoRes.name);
        setSelectedDate(moaClubInfoRes.atDate);
        setClubFee(moaClubInfoRes.clubFee);
      }
    };
    fetchMoaclubInfo();
  }, [userIdx, accountId]);

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'KRW':
        return '원';
      case 'CNY':
        return '위안';
      case 'JPY':
        return '엔';
      case 'USD':
        return '달러';
    }
  };

  const currencyValue = getCurrencySymbol(moaclub?.currency!);
  const manager = moaclub?.memberList.find(
    (member) => member.role === 'MANAGER'
  );

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDate(event.target.value);
  };

  const handleSelectManager = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCandidateIdx(event.target.value);
  };

  const next = () => {
    const updateUrl = `${process.env.REACT_APP_BESERVERURI}/api/moaclub`;

    const updateData = {
      accountId: accountId,
      userIdx: userIdx,
      name: name,
      clubFee: parseInt(clubFee),
      atDate: parseInt(selectedDate),
    };

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
            setLook3(true);
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

    axios
      .put(updateUrl, updateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setLook2(true);
          setDisabled(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header value={t('modifyMoaclub.header')} disabled={disabled} />
      <div className='content'>
        <div className='moaclubModify'>
          <label>{t('modifyMoaclub.clubName')}</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('modifyMoaclub.clubName')}
          />

          <label className='moaclubModifyElement'>{t('modifyMoaclub.feeSetting')}</label>
          <div className='feeSettings'>
            <span>{t('modifyMoaclub.monthly')}</span>
            <select value={selectedDate} onChange={handleSelectChange}>
              {[...Array(31)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}{t('modifyMoaclub.day')}
                </option>
              ))}
            </select>
            <input
              type='text'
              value={clubFee}
              onChange={(e) => setClubFee(e.target.value)}
              placeholder={t('modifyMoaclub.clubFee')}
            />
            <span>{currencyValue}</span>
          </div>

          <label className='moaclubModifyElement'>{t('modifyMoaclub.managerChange')}</label>
          <select className='managerSelect' onChange={handleSelectManager}>
            <option disabled selected>
              {manager?.userName}
            </option>
            {moaclub?.memberList
              .filter((member) => member.role !== 'MANAGER')
              .map((member) => (
                <option key={member.userName} value={member.userIdx}>
                  {member.userName}
                </option>
              ))}
          </select>
          <div className='moaWithdrawInfoTxt' dangerouslySetInnerHTML={{ __html: t('modifyMoaclub.information') }} />
        </div>
      </div>

      <div className='buttonContainer'>
        <CommonBtn type='pink' value={t('modifyMoaclub.completion')} onClick={next} disabled={false} />
      </div>

      <CommonModal3
        msg={t('commonModal.existingRequest')}
        show={look}
        onConfirm={() => {
          setLook(false);
        }}
      />

      <CommonModal3
        msg={t('commonModal.updated')}
        show={look2}
        onConfirm={() => {
          window.location.reload(); // Adjust as per your application's navigation or state management
        }}
      />

      <CommonModal3
        msg={t('commonModal.managerChangeRequest')}
        show={look3}
        onConfirm={() => {
          setLook3(false);
        }}
      />
    </>
  );
}

export default MoaclubModify;
