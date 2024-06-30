import Header from "../../layouts/MoaclubHeader4";
import './MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import styled from '@emotion/styled';

function MoaclubSetting() {
  const navigate = useNavigate();

  const next = () => {

  };

  return(
      <>
        <Header value="모아클럽 관리" disabled={false} />
        <div className="content">

        </div>
        
        

      </>
  )
}

export default MoaclubSetting;