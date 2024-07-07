import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import setting from "../../../assets/images/celub/setting.png";
import Header from "../../../components/Header";
import CommonBtn from "../../../components/button/CommonBtn";

const MyPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log("localStorage에 저장된 email:", email);

    const fetchData = () => {
      axios
        .post(
          `http://${process.env.REACT_APP_BESERVERURI}/api/user/info`,
          null,
          {
            params: {
              email: email,
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          setUserData(res.data.data);
        })
        .catch((error) => {
          alert("실패");
        });
    };

    fetchData();
  }, []); // 빈 배열을 의존성 배열로 설정하여 한 번만 호출되도록 합니다.

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save user data logic
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header value="내 정보" />
      <div className="mypage-container">
        {/* <div className="mypage-header">
        <h1>{isEditing ? "내 정보 수정하기" : "내 정보"}</h1>
        <button onClick={handleEditClick}>
          <img id="setting" src={setting} alt="설정" />
        </button>
      </div> */}
        <div className="mypage-content">
          <img
            src={userData.profile}
            alt="profile-pic"
            className="profile-pic"
          />
          <h2>{userData.name}</h2>
          <div className="info-section">
            <h3>기본정보</h3>
            <p>이름: {userData.name}</p>
            <p>국가: {userData.nation}</p>
            <p>생년월일: {userData.birth}</p>
            <p>휴대폰번호: {userData.phone}</p>
          </div>
          <div className="info-section">
            <h3>집정보</h3>
            <p>주소: {userData.address}</p>
          </div>
          {isEditing ? (
            <div className="buttons">
              <button className="save-button" onClick={handleSaveClick}>
                확인
              </button>
              <button className="cancel-button" onClick={handleCancelClick}>
                취소
              </button>
            </div>
          ) : (
            /* // TODO: 수정하기 버튼을 누르면 업데이트 api 연결*/
            <div className="mpButtonContainer">
              <CommonBtn
                type="pink"
                value="수정하기"
                onClick={handleEditClick}
                disabled={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
