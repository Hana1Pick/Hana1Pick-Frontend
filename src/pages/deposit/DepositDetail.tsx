import Header from "../../layouts/MoaclubHeader3";
import hanaLogo from "../../assets/images/common/hanaBankLogo.png";
import alarmLogo from "../../assets/images/common/hanaCircleLogo.png";
import chatIcon from "../../assets/images/moaclub/moa-chat-icon.png";
import "../moaclub/MoaclubStyle.scss";
import "../moaclub/MoaclubHanaStyle.scss";
import "../../common/styles/scss/CommonStyle.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DepositInfo,
  DepsoitAccHis,
  MoaclubAccHis,
  MoaclubInfo,
} from "../../type/commonType";

const DepositDetail = () => {
  const navigate = useNavigate();
  //const { accountId } = useParams();
  const accountId = "02-00-8971124";
  const [deposit, setDeposit] = useState<DepositInfo | null>(null);
  const [accountHistory, setAccountHistory] = useState<DepsoitAccHis[] | null>(
    null
  );

  const url = `${process.env.REACT_APP_BESERVERURI}/api/deposit/detail`;

  const getDepositDetail = async (accountId: string) => {
    try {
      const response = await axios.post(url, { accountId });
      console.log("1", response.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAccountHistory = async (accountId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BESERVERURI}/api/account`,
        {
          accountId,
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDepositInfo = async () => {
      if (accountId) {
        const depoistInfoRes = await getDepositDetail(accountId);
        const accountHistoryRes = await getAccountHistory(accountId);
        setDeposit(depoistInfoRes);
        setAccountHistory(accountHistoryRes);
      }
    };
    fetchDepositInfo();
  }, [accountId]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate.endsWith(".")
      ? formattedDate.slice(0, -1)
      : formattedDate;
  };

  const formatCurrency = (amount: number) => {
    if (amount === undefined) {
      return "";
    }
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
  };

  const goMoaWithdraw = () => {
    navigate(`/cash-out/account`);
  };

  return (
    <>
      <Header value="거래내역조회" disabled={true} />
      <div className="moaHanaContainer">
        <div className="depoitInfoContainer">
          <div className="moaHanaTitle">
            <img src={hanaLogo} alt="hanaLogo" />
            <div>{deposit?.name}</div>
          </div>
          <div className="moaHanaAccId">{deposit?.accountId}</div>
          <div
            className="memberListContainerHana"
            onClick={() => {
              navigate(`/moaclub/member/${accountId}`);
            }}
          ></div>
          <div className="moaHanaAccBalance">
            {formatCurrency(deposit?.balance!)}
          </div>
          <div className="depositAccInfoBtnContainer">
            <div className="depositWithdraw" onClick={goMoaWithdraw}>
              이체하기
            </div>
          </div>
        </div>
        <div className="moaHanaFeeRuleContainer">입출금현황</div>
      </div>

      <div className="deposit-table">
        <table className="moaclubAccHisTable">
          <tbody>
            {accountHistory && accountHistory.length > 0 ? (
              accountHistory.map((history, index) => (
                <tr key={index}>
                  <td className="moaclubDate">
                    {formatDate(history.transDate)}
                  </td>
                  <td className="moaclubTarget">{history.target}</td>
                  <td className="transaction">
                    <span
                      id="moaclubTransAmountTxt"
                      className={
                        history.transAmount > 0
                          ? "depositBlueTxt"
                          : "depositRedTxt"
                      }
                    >
                      {history.transAmount >= 0
                        ? `+${formatCurrency(history.transAmount)}`
                        : formatCurrency(history.transAmount)}
                    </span>
                    <span className="moaclubAccHisLast">
                      {formatCurrency(history.balance)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ borderStyle: "none" }}>
                  거래 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DepositDetail;
