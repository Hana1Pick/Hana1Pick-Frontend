import Header from "../../layouts/MoaclubHeader4";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function MoaclubFeeStatus() {
  const navigate = useNavigate();

  const next = () => {

  };

  return(
      <>
        <Header value="회비 입금현황" disabled={false}/>
        <div className="content">

        </div>
        
        

      </>
  )
}

export default MoaclubFeeStatus;