import CelubHeader from "../../layouts/CelubHeader1";
import './CelublogStyle.scss';
function CelubWithdraw(){
    const nextStage =()=>{
        const div1 = document.getElementById('withdraw-box4');
        const div2 = document.getElementById('celub-withdraw-overlay');
         
        if(div1){
            div1.style.display = 'block';
        }
        if(div2){
            div2.style.display = 'block';
        }
    }
    const beforeStage=()=>{
        const div1 = document.getElementById('withdraw-box4');
        const div2 = document.getElementById('celub-withdraw-overlay');
        if(div1){
            div1.style.display = 'none';
        }
        if(div2){
            div2.style.display = 'none';
        }
    }
    const wdcomplete=()=>{
        window.location.href="/celub-withdraw/complete";
    }
    return(
        <>
            <CelubHeader></CelubHeader>
            <div className="celub-withdraw-overlay" id="celub-withdraw-overlay"></div>
            <div className="withdraw-box3">
                <div>
                    <div>
                        <div>
                            <h2>앞으로 아래 계좌에서 출금할게요.</h2>
                        </div>
                        <div>
                            <h4>출금계좌는 변경할 수 없으니 신중하게 선택해 주세요.</h4>
                        </div>
                    </div>
                </div>

                <div id="withdraw-box1">
                    <h4 style={{"textAlign":"left"}}>출금계좌</h4>
                    <div className="withdraw-box2">
                        <label htmlFor="lang" style={{"fontSize":"12px"}}>출금계좌</label> &nbsp;
                        <select name="languages" id="lang" style={{"border":"0", "width":"70%"}}>
                            <option value="1">원픽의 입출금통장1</option>
                            <option value="2">원픽의 입출금통장2</option>
                            <option value="3">원픽의 입출금통장3</option>
                        </select>
                    </div>
                    <button id="basicBtn1" onClick={nextStage} style={{"marginTop":"15%", "width":"100%"}}>다음</button>
                </div>
            </div>

            <div>
                <div className="withdraw-box4" id="withdraw-box4">
                    <div className="withdraw-box6">
                        <p>오늘부터 스벅적금을 시작할게요!</p>
                        <span>모으기 규칙을 누르기 전까지는 저축되지 않아요.<br/>
                        사랑하는 만큼 모아주세요.</span>
                        <div className="withdraw-box5">
                            <button onClick={beforeStage}>아니요</button>
                            <button onClick={wdcomplete} className="withdraw-box5-btn">예</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CelubWithdraw;