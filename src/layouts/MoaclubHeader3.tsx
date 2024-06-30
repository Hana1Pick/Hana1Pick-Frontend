import back from '../assets/images/common/backicon.png';
import setting from '../assets/images/common/settingicon.png';
import { MoaClubHeaderData } from '../type/commonType';

function MoaClubHeader3({ value, disabled, onClick }: MoaClubHeaderData) {
  const headerStyle = disabled ? { backgroundColor: 'rgba(0, 0, 0, 0.009)', borderColor: 'rgba(0, 0, 0, 0.009)' } : {};

  return(
    <>
      <div className='moaclubHeader2' style={headerStyle}>
        <img className='back' alt='back-icon' src={back} />
        <h4>{value}</h4>
        <img className='setting' alt='setting-icon' src={setting} onClick={onClick} />
      </div>
    </>
  );
}

export default MoaClubHeader3;