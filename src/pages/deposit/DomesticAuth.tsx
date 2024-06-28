import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useScript from "./useScript";
import CommonBtn from "../../components/button/CommonBtn";
import "./style.css";

type DomesticAuthProps = {
  rtcRoomNum: string;
  formData: {
    name: string;
    address: string;
    birth: string | null;
    phone: string;
    nation: string;
    email: string;
    password: string;
  };
};

function DomesticAuth({ rtcRoomNum, formData }: DomesticAuthProps) {
  console.log(formData);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate("/deposit3", { state: { formData } });
  };

  const ws = useRef<WebSocket | null>(null);
  const { params } = useParams();
  const queryParams = new URLSearchParams(params);
  const vipId = queryParams.get("vipId");
  const [show, setShow] = useState(false);

  useScript("https://code.jquery.com/jquery-1.12.4.min.js");
  useScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js");

  useEffect(() => {
    ws.current = new WebSocket(
      `${process.env.REACT_APP_SUGGESTIONLISTWS}/${rtcRoomNum}`
    );
    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const receivedData = event.data;
      receivedData.text().then((text: string) => {
        if (JSON.parse(text).type === "authResult") {
          alert(JSON.parse(text).authResult);
        }
      });
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  const certify = () => {
    const { IMP } = window as any;
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
      <CommonBtn type="black" value="간편인증" onClick={certify} />
      {show && (
        <div className="modal">
          <div className="modal-content">
            <h3>본인인증 완료</h3>
            <p>본인인증이 성공적으로 완료되었습니다.</p>
            <div className="input-container">
              <CommonBtn type="black" value="닫기" onClick={handleClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DomesticAuth;
