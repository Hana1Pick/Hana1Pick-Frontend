import React, { useState } from "react";
import "../../common/styles/scss/CommonStyle.css"; // SCSS 파일 경로
import Header from "../../components/Header";
import "./style.css";
import DomesticAuth from "./DomesticAuth";

function DepositCreation2() {
  const [value, setValue] = useState<string>("");
  const [rtcRoomNum, setRtcRoomNum] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="deposit-creation">
      <Header value="개인정보 입력" />
      <div className="container">
        <div className="input-box">
          <div className="content">먼저, 정보를 입력받을게요.</div>
          <div className="input-all-container">
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                placeholder="이름을 적어주세요."
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                placeholder="주소를 적어주세요."
              />
            </div>
            <div className="input-container">
              <select
                className="input-field"
                defaultValue=""
                onChange={handleChange}
              >
                <option className="input-field" value="">
                  국적을 선택해주세요.
                </option>
                <option value="Korean">한국</option>
                <option value="American">미국</option>
                <option value="Japanese">일본</option>
                <option value="Chinese">중국</option>
                <option value="Canadian">캐나다</option>
                <option value="Australian">호주</option>
              </select>
            </div>
          </div>
        </div>
        {value === "Korean" && (
          <div>
            <DomesticAuth rtcRoomNum={rtcRoomNum} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DepositCreation2;
