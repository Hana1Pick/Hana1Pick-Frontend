import React, { createContext, useState } from 'react';

// Context 생성
const PhotoCardContext = createContext({});

// Context 내용 설정
const PhotoCardContextProvider = ({ children }: { children: any }) => {
  // 변수
  const [image, setImage] = useState<File>();

  // 반환값
  return (
    <PhotoCardContext.Provider
      value={{
        image,
        setImage,
      }}
    >
      {children}
    </PhotoCardContext.Provider>
  );
};

export { PhotoCardContext, PhotoCardContextProvider };
