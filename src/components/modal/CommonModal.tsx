import { CommonModalType } from '../../type/commonType';

function CommonModal({ msg, show, onCancle, onConfirm }:CommonModalType){
    if(!show) return null;

    return(
        <>
            <div className="commonModal-backdrop">
                <div className="commonModal">
                    <p>{msg}</p>
                    <div className="commonModal-buttons">
                        <button onClick={onCancle}>취소</button>
                        <button onClick={onConfirm}>확인</button>
                    </div>  
                </div>
            </div>
        </>
    )

}

export default CommonModal;