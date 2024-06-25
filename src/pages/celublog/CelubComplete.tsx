import checkImg from '../../assets/images/check.png';
function CelubComplete(){
    const goList=()=>{
        window.location.href="/celub/list";
    }
    return(
        <>
            <div className="completeBox1">
                <div className="completeBox2">
                    <img className="checkImg" src={checkImg} />
                    <div className="textBox1">
                        <p>최애적금</p>
                        <p>오늘부터 시작</p>
                    </div>
                </div>
            </div>
            <div className="completeBox3">
                <div className="tableBox">
                    <table className="completeInfo">
                        <tr>
                            <th>출금계좌</th>
                            <td colSpan={2}>김주혜의 통장 <br/> 계좌번호</td>
                        </tr>
                        <tr>
                            <th>적용금리</th>
                            <td colSpan={2} style={{"color":"#1ABA78"}}>2.00%</td>
                        </tr>
                        <tr>
                            <th>가입일</th>
                            <td colSpan={2}>2024.06.18</td>
                        </tr>
                    </table>
                </div>
                <button id="basicBtn1" onClick={goList}>완료</button>
            </div>
        </>
    );
}

export default CelubComplete;