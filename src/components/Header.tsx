import './../common/styles/scss/CommonStyle.scss';

function Header({ value }: { value: string }) {
  return (
    <>
      <div id='header'>{value}</div>
    </>
  );
}

export default Header;
