import back from '../assets/images/common/backicon.png';

function MoaClubHeader() {
  return(
    <>
      <div className='moaclubHeader'>
        <img className="back" src={back} />
        <h4>모아클럽</h4>
        <h5>취소</h5>
      </div>
    </>
  );
}

export default MoaClubHeader;