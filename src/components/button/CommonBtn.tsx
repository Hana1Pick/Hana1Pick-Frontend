type CommonBtnData = {
  type: string;
  value: string;
  onClick: () => void;
  disabled: boolean;
};

function CommonBtn({ type, value, onClick, disabled }: CommonBtnData) {
  const id = type === 'pink' ? 'basicBtn1' : 'basicBtn2';

  return (
    <>
      <button id={id} onClick={onClick} disabled={disabled}>
        {value}
      </button>
    </>
  );
}

export default CommonBtn;
