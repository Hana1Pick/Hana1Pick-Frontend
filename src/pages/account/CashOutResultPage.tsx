import check from '../../assets/images/common/check.png';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import CommonBtn from '../../components/button/CommonBtn';
import { AccountContext } from '../../contexts/AccountContextProvider';

function CashOutResultPage() {
  const { amount, inAccName }: any = useContext(AccountContext);

  const navigate = useNavigate();
  const next = () => {
    navigate('/');
  };

  return (
    <div>
      <Header value='이체' />
      <div id='mainForCenter'>
        <img className='accountImage' src={check} alt='accountImage' />
        <div id='info1'>
          <span>{inAccName}</span>님에게
          <br />
          <span>{amount}</span>원
          <br />
          이체했습니다.
        </div>
      </div>
      <div id='nextBtn'>
        <CommonBtn type='black' value='확인' onClick={next} disabled={false} />
      </div>
    </div>
  );
}

export default CashOutResultPage;
