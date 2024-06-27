import CelublogCircleLogo from '../../assets/images/account/CelublogCircleLogo.png';
import MoaClubCircleLogo from '../../assets/images/account/MoaClubCircleLogo.png';
import DepositCircleLogo from '../../assets/images/account/DepositCircleLogo.png';
import { useContext } from 'react';
import { AccountContext } from '../../contexts/AccountContextProvider';
import { useNavigate } from 'react-router-dom';

type AccountData = {
  accountType: string;
  accountId: string;
  name: string;
};

type AccountCardProps = {
  useType: string;
  value: AccountData;
  nextUrl: string;
};

function AccountCard({ useType, value, nextUrl }: AccountCardProps) {
  const { setInAccType, setInAccId, setInAccName }: any =
    useContext(AccountContext);
  const navigate = useNavigate();

  const next = (useType: string, value: AccountData, nextUrl: string) => {
    if (useType == 'cash-out') {
      setInAccType(value.accountType);
      setInAccId(value.accountId);
      setInAccName(value.name);
    }
    navigate(nextUrl);
  };

  const accountTypeMap: { [key: string]: string } = {
    deposit: DepositCircleLogo,
    celublog: CelublogCircleLogo,
    moaclub: MoaClubCircleLogo,
  };

  function getAccountType(accountType: string) {
    return accountTypeMap[accountType] || '';
  }

  if (!value) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div className='accountCard' onClick={() => next(useType, value, nextUrl)}>
      <div>
        <img
          className='accountImage'
          src={getAccountType(value.accountType)}
          alt='accountImage'
        />
      </div>
      <div className='accountData'>
        <div className='accountInfo'>{value.name}</div>
        <div className='accountId'>{value.accountId}</div>
      </div>
    </div>
  );
}

export default AccountCard;
