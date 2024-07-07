import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./DepositStyle.scss"; // 스타일 시트 추가
import OcrCamera1 from "../../assets/images/deposit/OcrCamera1.png";
import OcrCamera2 from "../../assets/images/deposit/OcrCamera2.png";
import OcrCamera3 from "../../assets/images/deposit/OcrCamera3.png";
import MoaClubHeader from "../../layouts/MoaclubHeader1";

function OCRCamera() {
  const location = useLocation();
  const navigate = useNavigate();

  // 사용자 데이터 예시
  const userData = {
    name: "PIAO XUANQING",
    email: "tlqlapdls@gmail.com",
    address: "02841 서울 성북구 안암로 145 (안암동5가, 고려대학교안암캠퍼스)",
    birth: "1982-07-08",
    phone: "01022234523",
    nation: "CN",
    password: "",
  };

  const url = `${process.env.REACT_APP_BESERVERURI}/api/user/ocr`;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  //const userData = location.state.formData;

  console.log(userData);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // 후면 카메라 사용 설정
            // facingMode: "user", // 전면 카메라 사용 설정
            width: { ideal: 518 }, // 원하는 해상도를 설정
            height: { ideal: 320 }, // 원하는 해상도를 설정
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    getCameraStream();
  }, []);

  const captureAndUpload = async () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/jpg");

        canvas.toBlob(async (blob) => {
          if (blob) {
            const requestData = new FormData();
            requestData.append("file", blob, "captured_image.jpg");

            try {
              const response = await axios.post(url, requestData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              // 응답 데이터를 localStorage에 저장
              localStorage.setItem("ocrData", JSON.stringify(response.data));

              // 비디오 스트림 종료
              if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                videoRef.current.srcObject = null;
              }

              const key = localStorage.getItem("userIdx");

              // ocr확인 페이지로 이동하면서 쿼리 파라미터 유지
              if (key) {
                navigate(`/userauth2?key=${key}`, {
                  state: { capturedImage: dataURL, userData },
                });
              } else {
                // key가 없을 경우 기본 페이지로 이동
                navigate(`/userauth2`);
              }
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          }
        }, "image/jpg");
      }
    }
  };

  return (
    <div>
      <MoaClubHeader value="외국인등록증 인증" disabled={false} />
      <div className="deposit-container" style={{ marginTop: "2rem" }}>
        <div className="camera-container">
          <div className="camera-preview">
            <video ref={videoRef} autoPlay playsInline></video>
            <div className="deposit-overlay"></div>
          </div>
          <div className="id-card-guide">
            <div className="guide-container">
              <div className="guide-section">
                <img src={OcrCamera1} alt="guide1" />
                <p>
                  화면에 <br /> 맞춰주세요.
                </p>
              </div>
              <div className="guide-section">
                <img src={OcrCamera2} alt="guide2" />
                <p>
                  어두운 <br /> 배경에서 <br /> 촬영하세요.
                </p>
              </div>
              <div className="guide-section">
                <img src={OcrCamera3} alt="guide3" />
                <p>
                  빛 반사에 <br />
                  주의하세요.
                </p>
              </div>
            </div>
            <div className="guide-text">
              <p>· 복사본이나 사진은 사용할 수 없습니다.</p>
              <p className="highlight">· 외국인등록증 원본으로 촬영하세요.</p>
              <p>
                · 정보 확인이 어렵거나 훼손된 외국인등록증은 거래가 거절 될 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
        <button id="deposit-basicBtn-fixed" onClick={captureAndUpload}>
          사진촬영
        </button>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </div>
  );
}

export default OCRCamera;
