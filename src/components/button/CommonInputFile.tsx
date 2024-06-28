import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type CommonInputFileData = {
  type: string;
  value: string;
  nextUrl: string;
};

function CommonInputFile({ type, value, nextUrl }: CommonInputFileData) {
  const className = type === 'pink' ? 'basicInputFile1' : 'basicInputFile2';

  const navigate = useNavigate();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      navigate(nextUrl, { state: { file } });
    }
  };

  return (
    <>
      <label htmlFor='file'>
        <div className={className}>{value}</div>
      </label>
      <input
        type='file'
        id='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default CommonInputFile;
