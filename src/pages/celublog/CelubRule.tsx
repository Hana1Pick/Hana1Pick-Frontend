import CelubHeader1 from "../../layouts/CelubHeader1";

function CelubRule(){
    return(
        <>
        <CelubHeader1/>
         <div className="celub-rule-totalbox">
                    <div>
                        <div className="celub-rulemake-box1">
                            <h2>어떻게 모을지 <br/>
                            규칙을 설정해주세요.</h2>
                        </div>
                        <div className="celub-rulemake-box2">
                            <p>최대 50만원씩 10개까지 만들 수 있어요. <br/>
                               규칙은 나중에도 수정할 수 있어요.</p>
                        </div>
                    </div>

                    <div className="celub-rulemake-box3">
                        <input placeholder="규칙을 입력해주세요." className="celub-rulemake-input1" type="text" />
                        <input placeholder="금액을 입력해주세요." className="celub-rulemake-input2" type="number" />
                    </div>
                    <div className="celub-rulemake-box4">
                        <button className="celub-addrule-btn">추가</button>         
                        <button id="basicBtn1">완료</button>
                    </div>
            </div>

        </>
    )
}

export default CelubRule;