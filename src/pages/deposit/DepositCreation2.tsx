import React, { useRef, useState } from "react";
import "../../common/styles/scss/CommonStyle.css"; // SCSS 파일 경로
import Header from "../../components/Header";
import "./style.css";
import DomesticAuth from "./DomesticAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../assets/images/deposit/Calendar.png";

function DepositCreation2() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [birth, setBirth] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [nation, setNation] = useState<string>("");
  const email = localStorage.getItem("email");
  const [password, setPassword] = useState<string>("");
  const [rtcRoomNum, setRtcRoomNum] = useState<string>("");
  const datePickerRef = useRef<DatePicker>(null);
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNation(event.target.value);
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    const fullAddressWithPostcode = `${data.zonecode} ${fullAddress}`;

    setAddress(fullAddressWithPostcode);
  };

  const handleClick = () => {
    new (window as any).daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
      setBirth(formattedDate);
    } else {
      setBirth(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(e.target.value);
  };

  const formData = {
    name,
    email,
    address,
    birth,
    phone,
    nation,
    password,
  };

  return (
    <div className="deposit-creation">
      <Header value="개인정보 입력" />
      <div className="container">
        <div className="input-box">
          <div className="content">먼저, 정보를 입력받을게요.</div>
          <div className="input-all-container">
            <div className="input-container">
              <label htmlFor="name" className="input-label">
                이름
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="이름을 적어주세요."
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="address" className="input-label">
                주소
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="주소를 적어주세요."
                value={address}
                readOnly
                onClick={handleClick}
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="birth" className="input-label">
                생년월일
              </label>
              <div className="date-picker-container">
                <input
                  type="text"
                  className="input-field date-picker-input-field"
                  placeholder="생년월일을 적어주세요."
                  id="birth"
                  readOnly
                  value={birth || ""}
                  onChange={handleInputChange}
                />
                <img
                  src={Calendar}
                  alt="calendar icon"
                  onClick={() => datePickerRef.current?.setOpen(true)}
                  className="custom-calendar-icon"
                />
                <div className="date-picker-wrapper">
                  <DatePicker
                    selected={birth ? new Date(birth) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    ref={datePickerRef}
                    id="birthdate-picker"
                    popperPlacement="bottom-end"
                    customInput={<></>}
                  />
                </div>
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="phone" className="input-label">
                전화번호
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="전화번호 적어주세요."
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="nation" className="input-label">
                국적
              </label>
              <select
                className="input-field"
                defaultValue=""
                onChange={handleChange}
                id="nation"
              >
                <option className="input-field" value="">
                  국적을 선택해주세요.
                </option>
                <option value="KOR">한국</option>
                <option value="JP">일본</option>
                <option value="CN">중국</option>
              </select>
            </div>
          </div>
        </div>
        {nation === "KOR" && (
          <div>
            <DomesticAuth rtcRoomNum={rtcRoomNum} formData={formData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DepositCreation2;
