import CelublogCircleLogo from '../../assets/images/account/CelublogCircleLogo.png';
import MoaClubCircleLogo from '../../assets/images/account/MoaClubCircleLogo.png';
import DepositCircleLogo from '../../assets/images/account/DepositCircleLogo.png';

type AccountData = {
  accountType: string;
  accountId: string;
  name: string;
};

type AccountCardData = {
  value: AccountData;
  onClick: () => void;
};

function AccountCard({ value, onClick }: AccountCardData) {
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
    <div className='accountCard' onClick={onClick}>
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
