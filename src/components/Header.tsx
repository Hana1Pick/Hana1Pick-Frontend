import "./../common/styles/scss/CommonStyle.css";

function Header({ value }: { value: string }) {
  return (
    <>
      <div id="header">{value}</div>
    </>
  );
}

export default Header;
