import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useScript from "./useScript";
import "./DepositStyle.scss";
import { DomesticAuthProps } from "../../type/commonType";
import CommonBtn from "../../components/button/CommonBtn";

function DomesticAuth({ rtcRoomNum, formData }: DomesticAuthProps) {
  const navigate = useNavigate();
  const { vipId } = useParams();
  const [show, setShow] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useScript("https://code.jquery.com/jquery-1.12.4.min.js");
  useScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js");

  const handleClose = () => {
    setShow(false);
    navigate("/deposit3", { state: { formData } });
  };

  useEffect(() => {
    if (!rtcRoomNum) {
      console.error("rtcRoomNum is required");
      return;
    }

    ws.current = new WebSocket(
      `${process.env.REACT_APP_SUGGESTIONLISTWS}/${rtcRoomNum}`
    );

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const receivedData = JSON.parse(event.data);
        if (receivedData.type === "authResult") {
          alert(receivedData.authResult);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message", error);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => {
      ws.current?.close();
    };
  }, [rtcRoomNum]);

  const certify = () => {
    const { IMP } = window as any;
    if (!IMP) {
      console.error("IMP is not available");
      return;
    }

    IMP.init("imp74352341");
    IMP.certification(
      {
        merchant_uid: vipId,
        popup: true,
      },
      (rsp: any) => {
        if (rsp.success) {
          setShow(true);
          console.log(rsp);
          ws.current?.send(
            JSON.stringify({ type: "authResult", authResult: "인증성공" })
          );
        } else {
          alert(`인증에 실패했습니다. 에러: ${rsp.error_msg}`);
          ws.current?.send(
            JSON.stringify({ type: "authResult", authResult: "인증실패" })
          );
        }
      }
    );
  };

  return (
    <div>
      <button id="simpleauth" onClick={certify}>
        간편인증
      </button>
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

export default DomesticAuth;
