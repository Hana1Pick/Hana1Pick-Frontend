import { CommonModalType1 } from '../../type/commonType';

function CommonModal1({ msg, show, onConfirm }:CommonModalType1){
    if(!show) return null;

    return(
        <>
            <div className="commonModal-backdrop">
                <div className="commonModal">
                    <p>{msg}</p>
                    <div className="commonModal-buttons">
                        <button onClick={onConfirm}>확인</button>
                    </div>  
                </div>
            </div>
        </>
    )

}

export default CommonModal1;