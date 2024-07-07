import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import DepositHeader1 from "../../layouts/DepositHeader1";
import CommonBtn from "../../components/button/CommonBtn";
import "./DepositCreation1.scss";
import animationGif1 from "../../assets/images/deposit/animation1.gif";
import animationGif2 from "../../assets/images/deposit/animation2.gif";
import arrowDown from "../../assets/images/deposit/arrow_down.png";
import arrowUp from "../../assets/images/deposit/arrow_up.png";
import depositDes from "../../assets/images/deposit/deposit_des.png";

const DepositCreation1 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => navigate("/deposit2");

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <DepositHeader1 value="계좌 개설" />

      <div className="free-account-open">
        <div className="banner">
          <div className="banner-text" style={{ marginLeft: "2rem" }}>
            <div>영하나플러스 통장</div>
            <div className="freeTitle">
              만 30세 이하라면
              <br />
              수수료 우대
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: "400" }}>
              혜택
              <br />
              <div style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                수수료 우대
              </div>
            </div>

            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: "400",
                marginTop: "1.5rem",
              }}
            >
              대상
              <br />
              <div style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                만 30세 이하 실명의 개인
              </div>
            </div>
          </div>
        </div>
        <div className="free-account-content">
          <div className="notice">
            <h2>용돈만 넣어도 수수료 우대</h2>
            <div>매달 버는 용돈 저금하고 수수료</div>
            <div>우대 받아 보세요.</div>
          </div>
          <img
            src={animationGif1}
            alt="Loading animation"
            className="animation"
          />
        </div>
        <div className="free-account-content2">
          <div className="notice">
            <h2>체크카드만 써도 수수료 우대</h2>
            <div>체크카드로 결제하고 수수료 우대받아 보세요.</div>
          </div>
          <img
            src={animationGif2}
            alt="Loading animation"
            className="animation"
          />

          <div className="notice">
            <h2>가입 전 확인해 주세요!</h2>
            <p>
              ※ 아래 내용은 「금융소비자보호법」 제19조 제1항 "금융상품에 관한
              중요한 사항" 입니다.
            </p>
          </div>

          <div className="sections">
            {[
              {
                title: "상품개요",
                content: (
                  <img
                    src={depositDes}
                    alt="상품개요 이미지"
                    className="overview-image"
                  />
                ),
              },
              {
                title: "상품정보",
                content: (
                  <>
                    <p>
                      다양한 수수료 우대서비스를 제공하는 YOUTH 고객 전용통장
                    </p>
                    <p>예금종류: 저축예금</p>
                    <p>
                      가입대상: 만 30세 이하 실명의 개인 및 개인사업자 (1인
                      1계좌)
                    </p>
                    <p>전환여부: 저축예금에 한하여 동 상품으로 전환가능</p>
                  </>
                ),
              },
              {
                title: "기본금리",
                content: "금리(연율, 세전): 0.1% (2024-07-06 기준, 세전)",
              },
              {
                title: "우대서비스",
                content: (
                  <>
                    <p>
                      아래의 서비스 제공 조건 중 1가지 이상을 해당월에 충족한
                      경우, 충족월 다음달(익월 1일부터 말일까지)에 수수료
                      우대서비스를 제공 [서비스 제공 조건]
                    </p>
                    <p>
                      ① 본인명의 하나카드(신용/체크)의 대금을 이 통장에서 결제시
                    </p>
                    <p>② 타인으로부터 월 건당 10만원 이상 입금 시</p>
                    <p>[수수료 우대]</p>
                    <p>① 당행 자동화기기를 통한 현금인출 수수료 무제한 면제</p>
                    <p>② 당행 자동화기기를 통한 타행이체 수수료 무제한 면제</p>
                    <p>
                      ③ 인터넷뱅킹, 스마트폰뱅킹, 폰뱅킹(ARS)을 통한 타행이체
                      수수료 무제한 면제
                    </p>
                    <p>④ 납부자자동이체 수수료 무제한 면제</p>
                    <p>⑤ 타행 자동화기기를 통한 현금 인출 수수료 월5회 면제</p>
                    <p>
                      - 이 통장을 신규 후 다음달 말일까지는 제공조건 충족여부와
                      관계없이 수수료 우대서비스 제공
                    </p>
                    <p>
                      - 이 통장을 통한 거래에서 발생하는 수수료에 한하여 제공됨
                    </p>
                  </>
                ),
              },
              {
                title: "유의사항",
                content: (
                  <>
                    <p>
                      • 수수료 우대서비스는 이 통장에 의한 거래에만 적용되 며,
                      매월 요건 충족여부를 확인하여 다음월에 수수료 우대서비스를
                      제공합니다.
                    </p>
                    <p>
                      • 우대서비스 내용은 은행의 사정에 의해 변경될 수 있
                      습니다. 동 내용 변경 시 변경사유, 변경내용 등 관련 내용을
                      영업점 및 당행 인터넷 홈페이지에 1개월간 게 시합니다.
                    </p>
                    <p>
                      ※ 금융상품에 관한 계약을 체결하기 전에 금융상품 설 명서 및
                      약관을 읽어 보시기 바랍니다.
                    </p>
                    <p>
                      ※ 금융소비자는 해당 상품 또는 서비스에 대하여 설명 받을
                      권리가 있습니다.
                    </p>
                    <p>
                      ※ 이 홍보물은 법령 및 내부통제기준에 따른 절차를 거 쳐
                      제공됩니다.
                    </p>
                  </>
                ),
              },
              {
                title: "상품변경안내",
                content: (
                  <>
                    <p>
                      • 계좌에 압류, 가압류 등이 등록될 경우 원금 및 급이 제한
                      될 수 있음
                    </p>
                    <p>※ 민사집행법에 따라 최저생계비 이해 등 압류금지채 </p>
                  </>
                ),
              },
              {
                title: "약관 및 상품설명서",
                content:
                  "약관 및 상품설명서는 영업점 및 당행 인터넷 홈페이지에서 확인 가능합니다.",
              },
            ].map((section, index) => (
              <div key={index} className="section">
                <div
                  className="section-header"
                  onClick={() => toggleSection(section.title)}
                >
                  <div>{section.title}</div>
                  <img
                    src={openSection === section.title ? arrowUp : arrowDown}
                    alt="toggle-icon"
                  />
                </div>
                {openSection === section.title && (
                  <div className="section-content">{section.content}</div>
                )}
              </div>
            ))}
          </div>

          <div className="freeButtonContainer">
            <CommonBtn
              type="pink"
              value="계좌 개설하기"
              onClick={handleButtonClick}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositCreation1;
