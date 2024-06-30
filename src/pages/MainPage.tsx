import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import Logo from "../assets/images/common/CircleLogo.png";
import menuIcon from "../assets/images/main/hambuger_icon.png";


import celubIcon from "../assets/images/main/main_celub_icon.png";

import moaIcon from "../assets/images/main/main_moa_icon.png";
import MenuBar from "../components/menubar/MenuBar"

import "./style.scss";


type Account = {
  id: string;
  type: string;
  number: string;
  balance: number;
};


const MainPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userIdx = localStorage.getItem("userIdx");
    const accessToken = localStorage.getItem("accessToken");

    if (!userIdx || !accessToken) {
      console.error("User is not logged in or access token is missing");
      return;
    }

    const url = `http://${process.env.REACT_APP_BESERVERURI}/api/user/accounts/list`;
    
    axios
      .get(url, {
        params: {
          userIdx: userIdx,
        },
      })
      .then((response) => {
        setAccounts(response.data.data);
        console.log("testtt");
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleNavigate = (path: To) => {
    navigate(path);
  };
  console.log(
    "localStorage에 저장된 userIdx:",
    localStorage.getItem("userIdx")
  );
  console.log(
    "localStorage에 저장된 name:",
    localStorage.getItem("name")
  );
  console.log(
    "localStorage에 저장된 email:",
    localStorage.getItem("email")
  );
  return (
    <div className="mainPage">
      <div className="header">
        <div className="profile-pic"></div>
        <span className="user-name">유다영 님</span>
        <div className="menu-icon">
          <img src={menuIcon} alt="menu-icon" />
        </div>
      </div>

      <div className="account-container">
        <div className="account-details">
          {accounts.length > 0 ? (
            <ul>
              {accounts.map((account) => (
                <div className="accountDetail">
                  <li key={account.id}>
                    <p>{account.type}</p>
                    <p>{account.number}</p>
                    <p>{account.balance.toLocaleString()}원</p>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <div className='accountBox'>
              <div>
                <img src={Logo} alt="logo" style={{ width: "2.25rem" }} />
              </div>
              <div className="accountDetail">
                <p className="account-type">영하나플러스 통장</p>
                <p className="account-number">입출금 211-910772-12345</p>
                <h3 className="account-balance">0원</h3>
                <button id="basicBtn1" className="send-button">
                  보내기
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="promotions">
          <div className="promotion">
            
            <img src={celubIcon} alt="celubIcon" />
            
            <div style={{display: "column"}}>
            <p className="accountTitle" style={ {marginLeft: "2rem"}}>최애와 함께 저축 습관 들이기!</p>
            
            <button onClick={() => handleNavigate('/celub/')}>셀럽로그 시작하기</button>
            </div>
          
          </div>
          <div className="promotion">
            <img src={moaIcon} alt="moaIcon" />
            <div style={{display: "column"}}>
            <p className="accountTitle"  style={ {marginLeft: "1rem"}}>최애가 같다면 함께 쓰는 모임통장!</p>
            <button onClick={() => handleNavigate('/moaclub/opening')}>모아클럽 시작하기</button>
            </div>
          </div>
        </div>
      </div>

      <MenuBar />
    </div>
  );
};

export default MainPage;