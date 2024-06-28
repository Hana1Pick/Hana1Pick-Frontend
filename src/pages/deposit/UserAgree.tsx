import Header from "../../components/Header";
import React, { useState } from "react";
import WhiteArrow from "../../assets/images/deposit/WhiteArrow.png";
import BlackArrow from "../../assets/images/deposit/BlackArrow.png";
import "./style.css"; // LegalNotice.css 파일은 스타일링을 위한 CSS 파일입니다.
import CommonBtn from "../../components/button/CommonBtn";
import { useLocation, useNavigate } from "react-router-dom";

function UserAgree() {
  interface CheckboxState {
    [key: string]: boolean;
  }

  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state.formData;

  const [isChecked, setIsChecked] = useState<CheckboxState>({
    agreeCheckbox1: false,
    agreeCheckbox2: false,
    agreeCheckbox3: false,
    agreeCheckbox4: false,
    agreeCheckbox5: false,
    agreeCheckbox6: false,
    agreeCheckbox7: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    setIsChecked((prevState) => {
      const newState = { ...prevState, [id]: checked };

      // 상품 이용약관 (agreeCheckbox2)이 변경될 때 하위 항목도 모두 변경
      if (id === "agreeCheckbox2") {
        newState.agreeCheckbox3 = checked;
        newState.agreeCheckbox4 = checked;
        newState.agreeCheckbox5 = checked;
      }

      return newState;
    });
  };

  const areAllChecked = (): boolean => {
    return Object.values(isChecked).every((value) => value === true);
  };

  const handleNext = () => {
    if (areAllChecked()) {
      navigate("/deposit5");
    } else {
      alert("모든 약관에 동의해 주세요.");
    }
  };

  return (
    <>
      <Header value="약관 동의" />
      <div className="container">
        <div className="useragree_text">
          상품 개설을 위해 <br />
          약관 및 상품설명서를 꼭 확인해 주세요.
        </div>
        <div className="black-box">
          <input
            type="checkbox"
            id="agreeCheckbox1"
            className="checkbox"
            checked={isChecked.agreeCheckbox1}
            onChange={handleCheckboxChange}
          />
          하나원픽 입출금통장 상품설명서
          <img src={WhiteArrow} alt="arrow" className="arrow-image" />
        </div>
        <div className="legal-notice-box">
          <div className="legal-notice-header">
            <input
              type="checkbox"
              id="agreeCheckbox2"
              className="checkbox"
              checked={isChecked.agreeCheckbox2}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agreeCheckbox2" className="checkbox-label">
              <strong>전체 상품 이용약관 동의</strong>
            </label>
          </div>
          <div className="legal-notice-content">
            <p className="checkbox-text">
              <input
                type="checkbox"
                id="agreeCheckbox3"
                className="checkbox"
                checked={isChecked.agreeCheckbox3}
                onChange={handleCheckboxChange}
              />
              예금거래기본약관
              <img src={BlackArrow} alt="arrow" className="arrow-image" />
            </p>
            <p className="checkbox-text">
              <input
                type="checkbox"
                id="agreeCheckbox4"
                className="checkbox"
                checked={isChecked.agreeCheckbox4}
                onChange={handleCheckboxChange}
              />
              입출금이자유로운예금 약관
              <img src={BlackArrow} alt="arrow" className="arrow-image" />
            </p>
            <p className="checkbox-text">
              <input
                type="checkbox"
                id="agreeCheckbox5"
                className="checkbox"
                checked={isChecked.agreeCheckbox5}
                onChange={handleCheckboxChange}
              />
              하나원픽 입출금통장 특약
              <img src={BlackArrow} alt="arrow" className="arrow-image" />
            </p>
          </div>
        </div>
        <div className="legal-notice-box">
          <div className="legal-notice-header">
            <input
              type="checkbox"
              id="agreeCheckbox6"
              className="checkbox"
              checked={isChecked.agreeCheckbox6}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agreeCheckbox6" className="checkbox-label">
              <strong>불법·탈법 차명거래 금지 설명 확인</strong>
            </label>
          </div>
          <div className="legal-notice-content">
            <p>
              「금융실명거래 및 비밀보장에 관한 법률」 제3조 제3 항에 따라
              누구든지 불법재산의 은닉, 자금세탁행위, 공중협박자금 조달행위 및
              강제집행의 면탈, 그 밖의 탈법행위를 목적으로 타인의 실명으로
              금융거래를 하여서는 안되며, 이를 위반 시 5년 이하의 징역 또는
              5천만원 이하의 벌금에 처해질 수 있습니다. 본인은 위 내용을 안내
              받고, 충분히 이해하였음을 확인합니다.
            </p>
          </div>
        </div>
        <div className="legal-notice-box">
          <div className="legal-notice-header">
            <input
              type="checkbox"
              id="agreeCheckbox7"
              className="checkbox"
              checked={isChecked.agreeCheckbox7}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agreeCheckbox7" className="checkbox-label">
              <strong>예금자보호법 설명 확인</strong>
            </label>
          </div>
          <div className="legal-notice-content">
            <p>
              본인이 가입하는 금융상품의 예금자보호여부 및 보호한도 (원금과
              소정의 이자를 합하여 1인당 5천만원)에 대하여 설명을 보고, 충분히
              이해하였음을 확인합니다.
            </p>
          </div>
        </div>
        <div className="gray-box">
          이메일 <span>{formData.email}</span>
        </div>
        <div className="useragree_text">
          계좌개설 이후에는 [계좌관리] 메뉴에서 확인하실 수 있습니다.
        </div>
        <div className="input-container">
          <CommonBtn type="black" value="확인" onClick={handleNext} />
        </div>
      </div>
    </>
  );
}

export default UserAgree;
