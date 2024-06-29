import Header from "../../layouts/MoaclubHeader1";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

interface MoaclubInfo {
    managerName: string;
    moaclubName: string;
  }
  
  const getMoaclubInfo = async (accountId: string) => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BESERVERURI}/api/moaclub/admission-info`, {
          params: { accountId },
        });
        console.log(response.data);
        return response.data.data;
      } catch (error) {
        console.error(error);
        return null; // 오류 발생 시 null 반환
      }
    };

    
function MoaclubPage() {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const userIdx = localStorage.getItem("userIdx") as string;
  
  const [moaclub, setMoaclub] = useState<MoaclubInfo | null>(null);

  useEffect(() => {
    const fetchMoaclubInfo = async () => {
      if (accountId) {
        const moaclubInfo = await getMoaclubInfo(accountId);
        setMoaclub(moaclubInfo);
        console.log(moaclub?.managerName);
      }
    };

    fetchMoaclubInfo();
  }, [accountId]);

  return(
      <>

        <Header value={moaclub?.moaclubName!} disabled={false}/>
        <div className="content">

        </div>

      </>
  )
}

export default MoaclubPage;