import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import setting from "../../../assets/images/celub/setting.png";
import Header from "../../../components/Header";
import CommonBtn from "../../../components/button/CommonBtn";
import PageLoadingSpinner from "../../../components/pageLoding/pageLoading";
import { kakaoLogout } from "../../../utils/kakao";

const MyPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhone, setEditedPhone] = useState("");
  const [editedAddress, setEditedAddress] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log("localStorage에 저장된 email:", email);

    const fetchData = () => {
      axios
        .post(`${process.env.REACT_APP_BESERVERURI}/api/user/info`, null, {
          params: {
            email: email,
          },
        })
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
    setEditedPhone(formatPhoneNumber(userData.phone));
    setEditedAddress(userData.address);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save user data logic
    axios
      .post(`${process.env.REACT_APP_BESERVERURI}/api/user/update`, {
        email: userData.email,
        phone: editedPhone,
        address: editedAddress,
      })
      .then((res) => {
        console.log("User data updated successfully", res.data);
        setUserData({
          ...userData,
          phone: editedPhone,
          address: editedAddress,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data", error);
        alert("정보 업데이트에 실패했습니다.");
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return "";
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setEditedPhone(formattedPhone);
  };

  if (!userData) {
    // Loading spinner
    return <PageLoadingSpinner />;
  }

  return (
    <>
      <Header value="내 정보" />
      <div className="mypage-container">
        <div className="mypage-content">
        
          <div className="info-section">
		  <img
            src={userData.profile}
            alt="profile-pic"
            className="profile-pic"
          />
          <h2>{userData.name}</h2>
            <h3>기본정보</h3>
            <p>이름: {userData.name}</p>
            <p>국가: {userData.nation}</p>
            <p>생년월일: {userData.birth}</p>
            <p>
              휴대폰번호:{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedPhone}
                  onChange={handlePhoneChange}
                />
              ) : (
                formatPhoneNumber(userData.phone)
              )}
            </p>
          </div>
          <div className="info-section">
            <h3>집정보</h3>
            <p>
              주소:{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                />
              ) : (
                userData.address
              )}
            </p>
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
            <div className="mpButtonContainer">
              <button className="mp_modify"                onClick={handleEditClick}
			  >수정하기</button>

        
              <button className="mp_modify" onClick={kakaoLogout} style={{backgroundColor: "#ff4081"}}>로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
