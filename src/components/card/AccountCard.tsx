import accountImage from '../../assets/images/CircleLogo.png';

type AccountData = {
  accountInfo: string;
  accountId: string;
};

function AccountCard({
  value,
  onClick,
}: {
  value: AccountData;
  onClick: () => void;
}) {
  console.log(value);

  const accountInfoMap: { [key: string]: string } = {
    deposit: '하나원픽 입출금 통장',
    celublog: '하나원픽 셀럽로그',
    moaclub: '하나원픽 모아클럽',
  };

  function getAccountInfo(key: string) {
    return accountInfoMap[key] || key; // 해당 키가 없을 경우 키 자체를 반환
  }

  if (!value) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <div className='accountCard' onClick={onClick}>
        <div>
          <img className='accountImage' src={accountImage} alt='accountImage' />
        </div>
        <div className='accountData'>
          <div className='accountInfo'>{getAccountInfo(value.accountInfo)}</div>
          <div className='accountId'>{value.accountId}</div>
        </div>
      </div>
    </>
  );
}

export default AccountCard;
