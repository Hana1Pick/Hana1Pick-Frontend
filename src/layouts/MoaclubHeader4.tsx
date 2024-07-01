import back from '../assets/images/common/backicon.png';
import { MoaClubHeaderData } from '../type/commonType';

function MoaClubHeader4({ value, disabled }: MoaClubHeaderData) {
  const headerStyle = disabled ? { backgroundColor: 'rgba(0, 0, 0, 0.009)', borderColor: 'rgba(0, 0, 0, 0.009)' } : {};

  return(
    <>
      <div className='moaclubHeader4' style={headerStyle}>
        <img className="back" src={back} />
        <h4>{value}</h4>
      </div>
    </>
  );
}

export default MoaClubHeader4;