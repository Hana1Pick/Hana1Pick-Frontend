import arrow from'../assets/images/celub/arrow.png';
import setting from '../assets/images/celub/setting.png';
import share from '../assets/images/celub/share.png'
function CelubHeader3({ onClick1, onClick2 }: { onClick1: () => void, onClick2: () => void }){
    return(
        <>
            <div className="celubHeader3" id="celubHeader1">
                <div>
                    <img id="arrow_loc" src={arrow} />
                </div>
                <div>
                    <img id="share" onClick={onClick1} src={share} />
                    <img id="setting" onClick={onClick2} src={setting}/>
                </div>
            </div>
        </>
    );
}
export default CelubHeader3;