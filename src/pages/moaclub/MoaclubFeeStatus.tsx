import Header from "../../layouts/MoaclubHeader4";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { MemeberFeeStatus, MoaclubInfo } from "../../type/commonType";
import axios from "axios";

type StatusNumType = {
  unpaid: number;
  paid: number;
}

function MoaclubFeeStatus() {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const userIdx = localStorage.getItem("userIdx") as string;
  const currencyValue = "원"; // 임시로 추가한 예시
  const today = new Date();
  const currentYear = today.getFullYear(); // 2024
  const currentMonth = today.getMonth() + 1; // 6

  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);
  const [feeStatus, setFeeStatus] = useState<MemeberFeeStatus[]>([]);
  const [selectedBtn, setSelectedBtn] = useState<string>("전체"); // 초기값은 "전체"로 설정
  const [statusNum, setStatusNum] = useState<StatusNumType>({ unpaid: 0, paid: 0 });
  const [yearMonths, setYearMonths] = useState<string[]>([]); // 배열로 년-월 형식의 날짜 리스트 관리
  const [selectedMonth, setSelectedMonth] = useState(`${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}`);

  const getMoaclubInfo = async (userIdx: string, accountId: string) => {
    try {
      const response = await axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/info`, {
        userIdx,
        accountId
      });
      console.log('MoaclubInfo:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getMoaclubFeeStatus = async (accountId: string, checkDate: string) => {
    try {
      const response = await axios.post(`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/fee`, {
        accountId,
        checkDate
      });
      console.log('MemeberFeeStatus:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getYearMonthList = () => {
    const yearMonths = [];
    console.log('moaclub?.createDate.year', moaclub?.createDate?.substring(0, 4));

    // 현재 년-월부터 moaclub.createDate까지의 리스트 생성
    for (let year = Number(moaclub?.createDate?.substring(0, 4)); year <= currentYear; year++) {
      const startMonth = (year === Number(moaclub?.createDate?.substring(0, 4))) ? Number(moaclub?.createDate?.substring(5, 7)) : 1;
      const endMonth = (year === currentYear) ? currentMonth : 12;

      console.log('start, end >> ', startMonth, endMonth);

      for (let month = startMonth; month <= endMonth; month++) {
        const yearMonth = `${year}-${month < 10 ? '0' + month : month}`;
        console.log('yearMonth', yearMonth);
        yearMonths.push(yearMonth);
      }
    }

    setYearMonths(yearMonths);
  };

  useEffect(() => {
    const fetchMoaclubInfo = async () => {
      if (userIdx && accountId) {
        const moaClubInfoRes = await getMoaclubInfo(userIdx, accountId);
        const feeStatusRes = await getMoaclubFeeStatus(accountId!, selectedMonth!);
        const feeStatus = feeStatusRes.sort((a: MemeberFeeStatus, b: MemeberFeeStatus) => a.name.localeCompare(b.name));
        setMoaclub(moaClubInfoRes);
        setFeeStatus(feeStatus);
      }
    };
    
    fetchMoaclubInfo();
  }, [userIdx, accountId, selectedMonth]);

  useEffect(() => {
    setStatusNum({ unpaid: feeStatus.filter((member: MemeberFeeStatus) => member.status === 'UNPAID').length, paid: feeStatus.filter((member: MemeberFeeStatus) => member.status === 'PAID').length });
  }, [feeStatus]);

  useEffect(() => {
    if (moaclub?.createDate) {
      getYearMonthList(); // moaclub.createDate가 설정되면 년-월 리스트를 가져옴
    }
  }, [moaclub?.createDate]);

  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleButtonClick = async (btnName: string) => {
    setSelectedBtn(btnName);
  };

  return (
    <>
      <Header value="회비 입금현황" disabled={false}/>
      <div className="content">
        <select className="moaclubFeeSelect" onChange={handleSelectChange} value={selectedMonth!}>
          {yearMonths.map((yearMonth, index) => (
            <option key={index} value={yearMonth}>{yearMonth}</option>
          ))}
        </select>
        <div className="clubFeeBalance">{moaclub?.balance} {currencyValue}</div>
        <div className='clubFeeRule'>매월 {moaclub?.atDate}일, {moaclub?.clubFee}{currencyValue}씩</div>

        <div className="moaClubMainBtnContainer">
          <div 
            className={`moaclubFeeStatusBtn ${selectedBtn === '전체' ? 'selected' : ''}`}
            onClick={() => handleButtonClick('전체')}
          >
            전체
          </div>
          <div 
            className={`moaclubFeeStatusBtn ${selectedBtn === '미입금' ? 'selected' : ''}`}
            onClick={() => handleButtonClick('미입금')}
          >
            미입금 {statusNum.unpaid}
          </div>
          <div 
            className={`moaclubFeeStatusBtn ${selectedBtn === '입금완료' ? 'selected' : ''}`}
            onClick={() => handleButtonClick('입금완료')}
          >
            입금완료 {statusNum.paid}
          </div>
        </div>
      </div>

      {selectedBtn === '전체' && (
        <div className="moaclubFeeContent">
          <table className="moaclubFeeTable">
            {feeStatus.map((member: MemeberFeeStatus, index: number) => (
              <tr key={index}>
                <td><img className='moaclubFeeProfile' src={member.profile} alt="프로필 사진" /></td>
                <td className="moaclubFeeMemberName">{member.name}</td>
                <td className="moaclubFeeAmount">{member.amount === 0 ? '-' : `${member.amount}${currencyValue}`}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
      {selectedBtn === '미입금' && (
        <div className="moaclubFeeContent">
          <table className="moaclubFeeTable">
            <tbody>
              {feeStatus
                .filter((member: MemeberFeeStatus) => member.status === 'UNPAID')
                .map((member: MemeberFeeStatus, index: number) => (
                  <tr key={index}>
                    <td><img className='moaclubFeeProfile' src={member.profile} alt="프로필 사진" /></td>
                    <td className="moaclubFeeMemberName">{member.name}</td>
                    <td className="moaclubFeeAmount">{member.amount === 0 ? '-' : `${member.amount}${currencyValue}`}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedBtn === '입금완료' && (
        <div className="moaclubFeeContent">
          <table className="moaclubFeeTable">
            <tbody>
              {feeStatus
                .filter((member: MemeberFeeStatus) => member.status === 'PAID')
                .map((member: MemeberFeeStatus, index: number) => (
                  <tr key={index}>
                    <td><img className='moaclubFeeProfile' src={member.profile} alt="프로필 사진" /></td>
                    <td className="moaclubFeeMemberName">{member.name}</td>
                    <td className="moaclubFeeAmount">{member.amount === 0 ? '-' : `${member.amount}${currencyValue}`}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}


      <div className="buttonContainer">
        <span className="moaclubFeeDesc">* 멤버 이름을 포함한 입금 내역은 해당 멤버가 낸 회비로 집계됩니다.</span>
      </div>
    </>
  );
}

export default MoaclubFeeStatus;
