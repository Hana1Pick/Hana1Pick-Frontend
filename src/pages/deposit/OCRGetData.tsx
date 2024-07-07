import React, { useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./DepositStyle.scss";
import { OCRData } from "../../type/commonType";
import MoaClubHeader from "../../layouts/MoaclubHeader1";

function OCRGetData() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [isNameMatched, setIsNameMatched] = useState(false);
  const [isNationMatched, setIsNationMatched] = useState(false);

  const [successShow, setSuccessShow] = useState(false);
  const [failShow, setFailShow] = useState(false);

  
  const ocrDataString = localStorage.getItem("ocrData");
  const ocrData: OCRData = ocrDataString ? JSON.parse(ocrDataString) : null;
  const formData = location.state.userData;
  const initialCapturedImage = location.state?.capturedImage || null;
  const [capturedImage, setCapturedImage] = useState<string | null>(
    initialCapturedImage
  );

  const handleSuccessClose = () => {
    setSuccessShow(false);
    navigate("/deposit3", { state: { formData } });
  };

  const handleFailClose = () => {
    setFailShow(false);
  };

  console.log(formData);
  console.log(ocrData);

  const handleConfirm = () => {
    // 이름과 국적 일치 여부  확인
    if (ocrData) {
      const nameMatched = formData.name === ocrData.data.name;
      const normalizedUserNation = formData.nation.toLowerCase();
      const normalizedOCRDataNation = ocrData.data.nation.toLowerCase();
      const nationMatched =
        normalizedUserNation === "cn" && normalizedOCRDataNation === "china";

      setIsNameMatched(nameMatched);
      setIsNationMatched(nationMatched);

      if (nameMatched && nationMatched) {
        setSuccessShow(true);
      } else {
        setFailShow(true);
      }
    }
  };

  const handleRecapture = () => {
    navigate("/userauth", { state: { formData } }); // 재촬영 화면으로 이동
  };

  return (
    <div className="deposit-creation">
      <MoaClubHeader value="개인정보 확인" disabled={false} />
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
            실제 정보와 다른 경우 재촬영해주세요.
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
          <div className="deposit-button-container">
            <button className="ocr_btn1" onClick={handleConfirm}>
              확인
            </button>
            <button className="ocr_btn2" onClick={handleRecapture}>
              재촬영
            </button>
          </div>
        </div>
      </div>
      {successShow && (
        <div className="deposit-modal">
          <div className="deposit-modal-content">
            <h3>본인인증 완료</h3>
            <p>본인인증이 성공적으로 완료되었습니다.</p>
            <div className="deposit-input-container">
              <button id="deposit-basicBtn" onClick={handleSuccessClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      {failShow && (
        <div className="deposit-modal">
          <div className="deposit-modal-content">
            <h3>본인인증 실패</h3>
            <p>본인인증에 실패하였습니다.</p>
            <div className="deposit-input-container">
              <button id="deposit-basicBtn" onClick={handleFailClose}>
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
