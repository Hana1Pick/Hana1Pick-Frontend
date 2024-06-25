import bgImg from '../../assets/images/celub/CelubBack.png';
import logo from '../../assets/images/celub/heart.png'; 
import './CelublogStyle.scss';
function CelubPage(){
    return(
        <>
            <div id="celubBox1">
                <div id="celubContainer">
                    <img id="celubBgImg" src={bgImg}/>
                    <div id="celubLogo">
                        <img src={logo}/>
                        <h4 style={{"marginTop":"20%"}}>샐럽로그</h4>
                        <h2 style={{"margin":"0 0 0 0"}}>0원</h2>
                    </div>
                </div>
            </div>
            <div id="celubBox2">
                <h3>먼저, 최애 사진을 선택해주세요.</h3>
                <button id="basicBtn1" style={{"marginTop":"15%"}}>사진 선택하기</button>
            </div>
        </>
    )
}
export default CelubPage;