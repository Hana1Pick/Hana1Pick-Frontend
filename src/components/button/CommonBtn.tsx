import React from 'react';

interface CommonBtnProps{
    msg: string,
    id?: string
}

function CommonBtn({msg,id}:CommonBtnProps){
    return(
        <>
            <button id="basicBtn1 {id}">{msg}</button>
        </>
    )
}
export default CommonBtn;
