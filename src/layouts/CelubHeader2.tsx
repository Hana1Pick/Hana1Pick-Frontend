import arrow from'../assets/images/celub/arrow.png';
import setting from '../assets/images/celub/setting.png';
function CelubHeader2(){
    return(
        <>
            <div id="celubHeader1">
                <img id="arrow_loc" src={arrow} />
                <img id="setting" src={setting}/>
            </div>
        </>
    );
}
export default CelubHeader2;