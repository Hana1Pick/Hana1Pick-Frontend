import CelubHeader from "../../layouts/CelubHeader2";
function CelubAccountList(){
    const buttons = [
        {id:1, label: '은우적금'},
        {id:2, label: '우석적금'},
        {id:3, label: '최애적금'}
    ];
    return(
        <>
            <CelubHeader/>
            <div className="celubListBox1">
                <span>조회할 계좌를 선택해주세요</span>
            </div>
            <div className="celubListBox2">
                {buttons.map(button=>(
                    <button key={button.id} className="celub-button">
                        {button.label}
                    </button>
                ))}
            </div>
        </>
    )
}

export default CelubAccountList;