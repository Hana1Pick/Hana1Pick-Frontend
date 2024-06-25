import React from 'react';

type CommonBtnProps = {
  type: string;
  value: string;
  onClick?: () => void; 
};

function CommonBtn({ type, value, onClick }: CommonBtnProps) {
  const id = type === 'pink' ? 'basicBtn1' : 'basicBtn2';

  return (
    <>
      <button id={id} onClick={onClick}>{value}</button>
    </>
  );
}

export default CommonBtn;