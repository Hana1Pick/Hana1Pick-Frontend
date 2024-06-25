type CommonBtnData = {
  type: string;
  value: string;
  onClick: () => void;
};

function CommonBtn({ type, value, onClick }: CommonBtnData) {
  const id = type === 'pink' ? 'basicBtn1' : 'basicBtn2';

  return (
    <>
      <button id={id} onClick={onClick}>
        {value}
      </button>
    </>
  );
}

export default CommonBtn;
