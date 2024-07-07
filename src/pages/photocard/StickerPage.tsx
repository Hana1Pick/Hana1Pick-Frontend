import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from 'react';
import { PhotoCardContext } from '../../contexts/PhotoCardContextProvider';
import PageLoadingSpinner from '../../components/pageLoding/pageLoading';
import Header from '../../components/Header';
import cameraIcon from '../../assets/images/photo-card/cameraIcon.png';
import downloadIcon from '../../assets/images/photo-card/downloadIcon.png';

const StickerPage: React.FC = () => {
  const [modal, setModal] = useState(true);
  const [isYellow, setIsYellow] = useState(false);
  const boxShadowStyle = isYellow
    ? '0 4px 20px #F4EA90'
    : '0 4px 20px rgba(0, 0, 0, 0.2)';

  // image data
  const { image }: any = useContext(PhotoCardContext);
  const [imageObject, setImageObject] = useState<HTMLImageElement | null>(null);
  const [detectImage, setDetectImage] = useState(false);
  const [imageFaceSize, setImageFaceSize] = useState(0);
  const [imageMaxRight, setImageMaxRight] = useState(0);
  const [imageMinHeight, setImageMinHeight] = useState(0);

  // sticker data
  const [sticker, setSticker] = useState<File>();
  const [stickerObject, setStickerObject] = useState<HTMLImageElement | null>(
    null
  );
  const stickerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stickerFaceSize, setStickerFaceSize] = useState(0);

  // canvas
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. 합성 당할 image
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        setImageObject(img);
      };
      img.src = URL.createObjectURL(image);
    }
  }, [image]);

  useEffect(() => {
    const canvas = originalCanvasRef.current;
    if (canvas && imageObject) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.width = imageObject.width;
        canvas.height = imageObject.height;
        ctx.drawImage(imageObject, 0, 0);

        // openCV를 통한 image 분석
        detectFace('image', canvas);
        //detectUpperBody('image', canvas);
      }
    }
  }, [imageObject]);

  // 2. 합성할 sticker
  useEffect(() => {
    if (sticker) {
      const img = new Image();
      img.onload = () => {
        setStickerObject(img);
      };
      img.src = URL.createObjectURL(sticker);
    }
  }, [sticker]);

  useEffect(() => {
    if (!detectImage) {
      console.log('image 분석 아직 안 끝남');
      return;
    }

    const canvas = stickerCanvasRef.current;
    if (canvas && stickerObject) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.width = stickerObject.width;
        canvas.height = stickerObject.height;
        ctx.drawImage(stickerObject, 0, 0);

        // openCV를 통한 image 분석
        detectFace('sticker', canvas);
        //detectUpperBody('image', canvas);
      }
    }
  }, [detectImage, stickerObject]);

  // 3. 얼굴 감지
  const detectFace = async (type: string, canvas: HTMLCanvasElement) => {
    console.log(`${type} : detectFace Start`);
    // 3-1.
    try {
      const faceCascadeResponse = await fetch(
        '/haarcascade_frontalface_default.xml'
      );
      if (!faceCascadeResponse.ok) {
        throw new Error('Failed to load Haar Cascade file for faces');
      }
      const faceXmlText = await faceCascadeResponse.text();

      // 3-2.
      const cv = (window as any).cv;

      const src = cv.imread(canvas);
      const gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

      if (!detectImage) {
        try {
          cv.FS_createDataFile(
            '/',
            'haarcascade_frontalface_default.xml',
            faceXmlText,
            true,
            false,
            false
          );
        } catch (e) {
          console.error('Error creating file in OpenCV FS:', e);
          throw new Error('OpenCV FS operations failed');
        }
      }

      const faceClassifier = new cv.CascadeClassifier();
      try {
        faceClassifier.load('/haarcascade_frontalface_default.xml');
      } catch (e) {
        console.error('Error loading Haar Cascade classifier:', e);
        throw new Error('OpenCV classifier load failed');
      }

      const faces = new cv.RectVector();
      faceClassifier.detectMultiScale(gray, faces, 1.1, 5, 0);

      // 3-3.
      let faceSize = 0;
      let maxRight = 0;
      let minHeight = canvas.height;

      for (let i = 0; i < faces.size(); i++) {
        const face = faces.get(i);
        maxRight = Math.max(maxRight, face.x + face.width);
        minHeight = Math.min(minHeight, face.height);
        const faceArea = face.width * face.height;
        faceSize += faceArea;
      }

      // 3-2.
      src.delete();
      gray.delete();
      faces.delete();
      faceClassifier.delete();

      // 3-5.
      console.log(`${type} : ${faceSize}`);
      if (type === 'image') {
        setModal(false);
        setDetectImage(true);
        setImageMaxRight(maxRight);
        setImageMinHeight(minHeight);
        setImageFaceSize(faceSize);
      } else if (type === 'sticker') {
        setStickerFaceSize(faceSize);
      }
    } catch (error) {
      console.error('Error in detectFace:', error);
    }
  };

  // 5. sticker 합성하기
  useEffect(() => {
    if (imageFaceSize > 0 && stickerFaceSize > 0) {
      console.log('sticker 합성 시작');
      synthesis();
    }
  }, [imageFaceSize, stickerFaceSize]);

  const synthesis = () => {
    // Ensure necessary objects are defined
    if (!imageObject || !stickerObject) {
      console.error('Image or sticker not loaded');
      return;
    }

    // Ensure OpenCV is loaded
    const cv = (window as any).cv;
    if (!cv) {
      console.error('OpenCV not loaded');
      return;
    }

    // Ensure canvas contexts are available
    const originalCanvas = originalCanvasRef.current;
    const finalCanvas = finalCanvasRef.current;
    const stickerCanvas = stickerCanvasRef.current;
    if (!originalCanvas || !finalCanvas || !stickerCanvas) {
      console.error('Canvas context not available');
      return;
    }

    const faceSizeRatio = Math.sqrt((imageFaceSize * 1.2) / stickerFaceSize);
    const originalStickerWidth = stickerObject.width;
    const originalStickerHeight = stickerObject.height;
    const newStickerWidth = originalStickerWidth * faceSizeRatio;
    const newStickerHeight = originalStickerHeight * faceSizeRatio;

    const stickerX = imageMaxRight;
    const stickerY = Math.max(0, imageMinHeight - 100);
    const ctx = originalCanvas.getContext('2d');
    if (ctx) {
      if (stickerCanvasRef.current) {
        ctx.drawImage(
          stickerCanvasRef.current,
          stickerX,
          stickerY,
          newStickerWidth,
          newStickerHeight
        );
      }
    }

    cv.imshow(finalCanvasRef.current, cv.imread(originalCanvasRef.current));
    setIsYellow(true);
    setTimeout(() => {
      setIsYellow(false);
    }, 400);
  };

  const getSticker = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSticker(event.target.files[0]);
    }
  };

  const downloadCanvasImage = () => {
    const canvas = originalCanvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'canvas-image.png';
      link.click();
    }
  };

  return (
    <div id='photo-card'>
      <Header value='최애와 한컷' />
      <div id='mainForCenter'>
        <div
          id='stickerTotalWrapper'
          style={{
            boxShadow: boxShadowStyle,
            padding: '20px',
            marginTop: '20px',
          }}
        >
          <img
            src={downloadIcon}
            alt='downloadIcon'
            id='downloadIcon'
            onClick={downloadCanvasImage}
          />
          {image ? (
            <div>
              <div id='imageWrapper'>
                <div>
                  <canvas id='original' ref={originalCanvasRef}></canvas>
                </div>
                <div style={{ display: 'none' }}>
                  <canvas id='sticker' ref={stickerCanvasRef}></canvas>
                  <canvas id='result' ref={finalCanvasRef}></canvas>
                </div>
              </div>
              <div id='stickerWrapper'></div>
            </div>
          ) : (
            <p>No image selected</p>
          )}
          <label htmlFor='file'>
            <img src={cameraIcon} alt='cameraIcon' id='cameraIcon' />
          </label>
          <input
            type='file'
            id='file'
            onChange={getSticker}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      {modal && <PageLoadingSpinner />}
    </div>
  );
};

export default StickerPage;
