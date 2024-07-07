import React from "react";
import { StageSpinner } from "react-spinners-kit";
import "./style.scss"; // 스피너 스타일이 포함된 CSS 파일

const PageLoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <StageSpinner size={60} color="#019178" loading={true} />
    </div>
  );
};

export default PageLoadingSpinner;
