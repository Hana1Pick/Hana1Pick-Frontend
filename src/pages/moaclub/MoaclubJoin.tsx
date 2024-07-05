import Header from '../../layouts/MoaclubHeader1';
import CommonBtn from '../../components/button/CommonBtn';
import joinGif from '../../assets/images/moaclub/moaclubJoin.GIF';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const navigate = useNavigate();

  const { accountId } = useParams();
  const userIdx = localStorage.getItem('userIdx') as string;

  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);

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
          alert('이미 가입된 클럽입니다!');
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
      <Header value='모아클럽 초대' disabled={false} />
      <div className='content'>
        <img className='joinGif' src={joinGif} alt='모아클럽 가입 이미지' />

        <h2 className='inviteClubNameTxt1'>{moaclub?.moaclubName}</h2>
        <h2 className='inviteClubNameTxt2'>모임에 초대받았어요</h2>
        <table className='completeInfo'>
          <tr>
            <th>초대자</th>
            <td colSpan={2}>{moaclub?.managerName}</td>
          </tr>
          <tr>
            <th>모임이름</th>
            <td colSpan={2}>{moaclub?.moaclubName}</td>
          </tr>
        </table>
      </div>

      <div className='buttonContainer'>
        <CommonBtn
          type='pink'
          value='참여하기'
          onClick={next}
          disabled={false}
        />
      </div>
    </>
  );
}

export default MoaclubJoin;
