import React, { useState, useEffect, useRef } from 'react';
import './cameraStyle.scss';

const CamTest: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const additionalImageRef = useRef<HTMLImageElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const additionalImageUrl = require('../src/assets/images/celub/dntjr.png');

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = isCameraOn ? stream : null;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    if (isCameraOn) {
      initCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  const toggleCamera = () => {
    setIsCameraOn((prevState) => !prevState);
  };

  const startTimerAndTakePhoto = (seconds: number) => {
    setTimer(seconds);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          takePhoto();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };
  
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current && additionalImageRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        context.save();
        context.translate(canvasRef.current.width, 0);
        context.scale(-1, 1);
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        context.restore();

        const additionalImage = additionalImageRef.current;
        if (additionalImage.complete) {
          drawAdditionalImage(context, additionalImage);
        } else {
          additionalImage.onload = () => {
            if (canvasRef.current) { 
              drawAdditionalImage(context, additionalImage);
            }
          };
        }
      }
    }
  };

  const drawAdditionalImage = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
    if (canvasRef.current) {
      const scale = 1.5;
      const imageWidth = image.width * scale;
      const imageHeight = image.height * scale;

      const imageX = canvasRef.current.width - imageWidth;
      const imageY = canvasRef.current.height - imageHeight;
      
      context.drawImage(image, imageX, imageY, imageWidth, imageHeight);

      const imageUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'photo.png';
      link.click();
    }
  };

  return (
    <div className="cam-test-container">
      <video className="celub-camera-div" ref={videoRef} autoPlay playsInline style={{ display: isCameraOn ? 'block' : 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="celub-cameraBtn-box">
        <button className="camera-button" onClick={toggleCamera}>{isCameraOn ? "카메라 끄기" : "카메라 켜기"}</button>
        <button className="photo-button" onClick={() => startTimerAndTakePhoto(5)} disabled={!isCameraOn}>촬영</button>
      </div>
      {timer > 0 && <div className="celub-timer">{timer}</div>}
      {/* <div className="celub-timer">{timer}</div> */}
      {isCameraOn && (
        <div className="additional-image">
          <img src={additionalImageUrl} alt="Additional Image" ref={additionalImageRef} />
        </div>
      )}
    </div>
  );
}

export default CamTest;
