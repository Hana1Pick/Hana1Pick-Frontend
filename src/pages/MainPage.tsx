import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import Logo from "../assets/images/common/CircleLogo.png";
import menuIcon from "../assets/images/main/hambuger_icon.png";

import celubIcon from "../assets/images/main/main_celub_icon.png";

import moaIcon from "../assets/images/main/main_moa_icon.png";
import MenuBar from "../components/menubar/MenuBar";

import "./style.scss";
import { useSwipeable } from "react-swipeable";

interface Account {
  id: string;
  name: string;
  accountId: string;
  accountType: string;
  balance: number;
}

const MainPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const profile = localStorage.getItem("profile");

  useEffect(() => {
    const userIdx = localStorage.getItem("userIdx");

    if (!userIdx) {
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
        console.log("Accounts data:", response.data.data); // accounts 데이터 출력
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleNavigate = (path: To) => {
    navigate(path);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => Math.min(prev + 1, accounts.length - 1)),
    onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });
  

  console.log(
    "localStorage에 저장된 userIdx:",
    localStorage.getItem("userIdx")
  );
  console.log("localStorage에 저장된 name:", localStorage.getItem("name"));
  console.log("localStorage에 저장된 email:", localStorage.getItem("email"));
  console.log(
    "localStorage에 저장된 profile:",
    localStorage.getItem("profile")
  );

  return (
    <>
      <div className="mainPage">
        <div className="header">
          <div className="profile-pic">
            {profile ? (
              <img className="profile-pic" src={profile} alt="profile-pic" />
            ) : (
              <div className="default-pic"></div>
            )}
          </div>
          <h3 className="user-name">{name} 님</h3>
          <div className="menu-icon">
            <img src={menuIcon} alt="menu-icon" />
          </div>
        </div>

        <div className="account-container" {...handlers}>
   
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <div
                className="account-details"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <div className="accountBox" key={account.accountId} >
                  <div>
                    <img src={Logo} alt="logo" style={{ width: "2.25rem" }} />
                  </div>
                  <div className="accountDetail">
                    <p className="account-type">
                      {account.name}
                      {account.accountType === "deposit" ? "의 통장" : ""}
                    </p>
                    <p className="account-number">{account.accountId}</p>
                    <h3 className="account-balance">
                      {account.balance.toLocaleString()}원
                    </h3>
                    <button id="basicBtn1" className="send-button">
                      보내기
                    </button>
                  </div>
                </div>
                </div>
              ))
            ) : (
              <div
              className="account-details"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="accountBox">
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
              </div>
            )}
          </div>

        <div className="promotions">
          <div className="promotion">
            <img src={celubIcon} alt="celubIcon" />

            <div className="promotionDetail">
              <p className="accountTitle" style={{ fontSize: "0.9rem" }}>
                최애와 함께 저축 습관 들이기!
              </p>
              <button onClick={() => handleNavigate("/celub/")}>
                셀럽로그 시작하기
              </button>
            </div>
          </div>
          <div className="promotion">
            <img src={moaIcon} alt="moaIcon" />
            <div className="promotionDetail">
              <p className="accountTitle" style={{ fontSize: "0.9rem" }}>
                최애가 같다면 함께 쓰는 모임통장!
              </p>
              <button onClick={() => handleNavigate("/moaclub/opening")}>
                모아클럽 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <MenuBar />
    </>
  );
};

export default MainPage;
