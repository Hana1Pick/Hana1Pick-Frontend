import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import searchImg from "../../assets/images/celub/search.png";
import axios from "axios";
import { CelubListType, CelubWithdrawType } from "../../type/commonType";
import "./CelublogStyle.scss";
import CommonModal from "../../components/button/CommonModal";

function CelubSearch() {
  const userIdx = localStorage.getItem("userIdx");
  const [look, setLook] = useState(false);
  const location = useLocation();
  const celubList = location.state;
  const [selectJob, setSelectJob] = useState<string>("ACTOR");
  const [searchResult, setSearchResult] = useState<CelubListType[]>([]);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const [celubWithdraw, setCelubWithdraw] = useState<CelubWithdrawType>({
    userIdx: userIdx ?? "",
    accPw: 0,
    name: "",
    imgSrc: "",
    outAccId: "",
    celebrityIdx: 0,
  });
  const [celubIdx, setCelubIdx] = useState(0);
  const [imgSrc, setImgSrc] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null); // 선택된 프로필 인덱스를 추적

  const jobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectJob(e.target.value);
  };

  const searchCelub = () => {
    if (keyword == null || keyword === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    axios
      .get(`${process.env.REACT_APP_BESERVERURI}/api/celub/list/search`, {
        params: {
          userIdx: userIdx,
          type: selectJob,
          name: keyword,
        },
      })
      .then((res) => {
        console.log("검색리스트", res.data.data);
        setSearchResult(res.data.data);
      })
      .catch((error) => {
        alert("실패");
      });
  };

  const searchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const selectCelub = (celubIdx: number, imgSrc: string, index: number) => {
    setCelubIdx(celubIdx);
    setImgSrc(imgSrc);
    setSelectedProfile(index); // 선택된 프로필 인덱스를 설정
    setLook(true);
  };

  const isOk = () =>{
    setCelubWithdraw((prevData) => ({
      ...prevData,
      celebrityIdx: celubIdx,
      imgSrc: imgSrc,
    }));
    navigate("/celub/withdraw", {
      state: { ...celubWithdraw, celebrityIdx: celubIdx, imgSrc: imgSrc },
    });
  }
  const cancleBtn = () =>{
    setLook(false);
  }

  return (
    <>
      <Header value="최애 선택" />
      <CommonModal msg="최애를 선택하시겠습니까?" show={look} onCancle={cancleBtn} onConfirm={isOk} />
      <div className="celub-search-box">
        <select name="job" value={selectJob} onChange={jobChange}>
          <option value="ACTOR">배우</option>
          <option value="IDOL">아이돌</option>
          <option value="ATHLETE">운동선수</option>
        </select>
        <input type="text" onChange={searchName} placeholder="원하는 셀럽을 입력하세요" />
        <img className="celub-search-img" src={searchImg} onClick={searchCelub} alt="search" />
      </div>

      <div className="celub-profile-box">
        {!searchResult && celubList.length === 0 ? (
          <div className="celub-rule-box1">
            선택할 수 있는 연예인이 없습니다. <br />
            다시 검색해주세요.
          </div>
        ) : (
          <div className="celub-profile-cover">
            {searchResult.length === 0
              ? celubList.map((celub: CelubListType, index: number) => (
                  <div className="celub-profile-container" key={index} onClick={() => selectCelub(celub.idx, celub.thumbnail, index)}>
                    <div className="celub-profile">
                      <img className={selectedProfile === index ? 'selected' : ''} src={celub.thumbnail} alt={celub.name} />
                      <p>{celub.name}</p>
                    </div>
                  </div>
                ))
              : searchResult.map((celub: CelubListType, index: number) => (
                  <div className="celub-profile-container" key={index} onClick={() => selectCelub(celub.idx, celub.thumbnail, index)}>
                    <div className="celub-profile">
                      <img className={selectedProfile === index ? 'selected' : ''} src={celub.thumbnail} alt={celub.name} />
                      <p>{celub.name}</p>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CelubSearch;
