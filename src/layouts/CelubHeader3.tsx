import arrow from'../assets/images/celub/arrow.png';
import setting from '../assets/images/celub/setting.png';
import share from '../assets/images/celub/share.png'
function CelubHeader3(){
    return(
        <>
            <div className="celubHeader3" id="celubHeader1">
                <div>
                    <img id="arrow_loc" src={arrow} />
                </div>
                <div>
                    <img id="share" src={share} />
                    <img id="setting" src={setting}/>
                </div>
            </div>
        </>
    );
}
export default CelubHeader3;