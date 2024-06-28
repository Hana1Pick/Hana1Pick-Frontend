import { useContext } from 'react';
import moaImg from '../../assets/images/moaclub/moaclub-complete.png';
import { MoaclubContext } from '../../contexts/MoaclubContextProvider';
import { useNavigate } from 'react-router-dom';

function MoaclubComplete(){
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString().replace(/\.$/, '');
  const { name, moaclub }: any = useContext(MoaclubContext);

  const next = () => {
    navigate('/moaclub/invite');
  }
  
  return(
    <>
      <div className="completeBox1">
        <div className="completeBox2">
          <img className="MoaImg" src={moaImg} />
          <div className="textBox1">
            <p>모아클럽</p>
            <p>오늘부터 시작</p>
          </div>
        </div>
      </div>
      <div className="completeBox3">
        <div className="tableBox">
          <table className="completeInfo">
            <tr>
              <th>출금계좌</th>
              <td colSpan={2}>{name} <br/> {moaclub}</td>
            </tr>
            <tr>
              <th>적용금리</th>
              <td colSpan={2}><span style={{"color":"#1ABA78", "fontWeight": "bold"}}>2.00</span>%</td>
            </tr>
            <tr>
              <th>가입일</th>
              <td colSpan={2}>{currentDate}</td>
            </tr>
          </table>
        </div>
        <button id="basicBtn1" onClick={next}>완료</button>
      </div>
    </>
  );
}

export default MoaclubComplete;