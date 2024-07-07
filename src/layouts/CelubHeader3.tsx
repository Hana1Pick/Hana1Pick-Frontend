import arrow from'../assets/images/celub/arrow.png';
import setting from '../assets/images/celub/setting.png';

function CelubHeader3({onClick}: {onClick: () => void }){

    return(
        <>
            <div className="celubHeader3">
                <div>
                    <img id="arrow_loc" src={arrow} />
                </div>
                <div>
                    {/* <img id="setting" onClick={onClick} src={setting}/> */}
                    <h4 id="setting" onClick={onClick}>설정</h4>
                </div>
            </div>
        </>
    );
}
export default CelubHeader3;