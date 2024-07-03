import React, { useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./DepositStyle.scss";
import axios from "axios";
import { OCRData } from "../../type/commonType";
import Header from "../../components/Header";

function OCRGetData() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [isNameMatched, setIsNameMatched] = useState(false);
  const [isNationMatched, setIsNationMatched] = useState(false);

  const [show, setShow] = useState(false);

  // 예시데이터
  const formData = {
    name: "PIAO XUANOING",
    email: "tlqlapdls@gmail.co`m",
    address: "02841 서울 성북구 안암로 145 (안암동5가, 고려대학교안암캠퍼스)",
    birth: "1982-07-08",
    phone: "01022234523",
    nation: "CN",
    password: "",
  };

  const ocrData = {
    data: {
      name: "PIAO XUANOING",
      number: "123456-123456",
      nation: "china",
      certification: "방문취업",
      date: "2021-22-22",
    },
  };

  const ocrDataString = localStorage.getItem("ocrData");
  // const ocrData: OCRData = ocrDataString ? JSON.parse(ocrDataString) : null;
  //const formData = location.state.userData;
  const initialCapturedImage = location.state?.capturedImage || null;
  const [capturedImage, setCapturedImage] = useState<string | null>(
    initialCapturedImage
  );

  const handleClose = () => {
    setShow(false);
    navigate("/deposit3", { state: { formData } });
  };

  console.log(formData);
  console.log(ocrData);

  useEffect(() => {
    if (ocrData) {
      // 이름 일치 여부 설정
      const nameMatched = formData.name === ocrData.data.name;
      setIsNameMatched(nameMatched);

      // 국적 일치 여부 설정
      const normalizedUserNation = formData.nation.toLowerCase();
      const normalizedOCRDataNation = ocrData.data.nation.toLowerCase();
      const nationMatched =
        normalizedUserNation === "cn" && normalizedOCRDataNation === "china";
      setIsNationMatched(nationMatched);

      // 모달 열기 여부 설정
      if (nameMatched && nationMatched) {
        setTimeout(() => {
          setShow(true);
        }, 3000); // 5초 후에 모달을 열기
      }
    }
  }, [ocrData, formData]);

  return (
    <div className="deposit-creation">
      <Header value="개인정보 입력" />
      <div className="deposit-container">
        <div className="input-box">
          <div className="deposit-input-container">
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="captured-image"
              />
            )}
          </div>
          <p className="deposit-input-container">
            신분증 정보를 확인해주세요. <br />
          </p>
          <div className="deposit-input-container">
            <label htmlFor="number" className="deposit-input-label">
              외국인 등록번호
            </label>
            <input
              type="text"
              className="deposit-input-field"
              value={ocrData.data.number}
              id="number"
            />
          </div>
          <div className="deposit-input-container">
            <label htmlFor="name" className="deposit-input-label">
              이름
            </label>
            <input
              type="text"
              className="deposit-input-field"
              value={ocrData.data.name}
              id="name"
            />
          </div>
          <div className="deposit-input-container">
            <label htmlFor="nation" className="deposit-input-label">
              국가
            </label>
            <input
              type="text"
              className="deposit-input-field"
              value={ocrData.data.nation}
              readOnly
              id="nation"
            />
          </div>
          <div className="deposit-input-container">
            <label htmlFor="certification" className="deposit-input-label">
              체류 자격
            </label>
            <input
              type="text" 
              className="deposit-input-field"
              id="certification"
              value={ocrData.data.certification}
            />
          </div>
          <div className="deposit-input-container">
            <label htmlFor="date" className="deposit-input-label">
              발급일자
            </label>
            <input
              type="text"
              className="deposit-input-field"
              value={ocrData.data.date}
              id="date"
            />
          </div>
        </div>
      </div>
      {show && (
        <div className="deposit-modal">
          <div className="deposit-modal-content">
            <h3>본인인증 완료</h3>
            <p>본인인증이 성공적으로 완료되었습니다.</p>
            <div className="deposit-input-container">
              <button id="deposit-basicBtn" onClick={handleClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OCRGetData;
