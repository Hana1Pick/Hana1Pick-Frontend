import Header from '../../layouts/MoaclubHeader4';
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import autotrsfIcon from '../../assets/images/moaclub/moa-autotrsf.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoaAutoTrsf } from '../../type/commonType';

function MoaclubAutoTrsf() {
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
      <Header value='자동이체' disabled={false} />
      <div className='content'>
        <div className='moaAutoTrsf'>
          <img src={autotrsfIcon} className='autoTrsfBanner' />
          <div className='moaAutoTrsfInfo'>
            <span className='moaAutoTrsfName'>{userName} </span>님
          </div>
          <div className='moaAutoTrsfInfo'>
            <span className='moaAutoTrsfHighlight'>
              {moaclubName}&#40;
              {accountId}&#41;
            </span>
            에
          </div>
          <div className='moaAutoTrsfInfo'>
            <span className='moaAutoTrsfHighlight'>{count}</span>
            건이 등록되어 있어요.
          </div>

          {autoTrsf ? (
            <div className='moaAutoTrsfBox' onClick={goAutoTrsfDetail}>
              <div className='moaAutoTrsfBoxHeader'>
                <span>모아클럽 이체 &#62;</span>
                <div className='moaAutoTrsfBoxBadge'>오픈뱅킹</div>
              </div>
              <hr />
              <table>
                <tbody>
                  <tr>
                    <th>은행명</th>
                    <td>하나원픽</td>
                  </tr>
                  <tr>
                    <th>출금계좌정보</th>
                    <td>{autoTrsf.outAccId}</td>
                  </tr>
                  <tr>
                    <th>납부자번호</th>
                    <td>{userIdx.split('-').pop()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className='moaAutoTrsfCreate' onClick={goAutoTrsfRegister}>
              등록하기
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MoaclubAutoTrsf;
