import back from '../assets/images/common/backicon.png';
import { MoaClubHeaderData1 } from '../type/commonType';

function MoaClubHeader({ value, disabled }: MoaClubHeaderData1) {
  const headerStyle = disabled ? { backgroundColor: 'rgba(0, 0, 0, 0.009)', borderColor: 'rgba(0, 0, 0, 0.009)' } : {};

  return(
    <>
      <div className='moaclubHeader' style={headerStyle}>
        <img className="back" src={back} />
        <h4>{value}</h4>
        <h5>취소</h5>
      </div>
    </>
  );
}

export default MoaClubHeader;