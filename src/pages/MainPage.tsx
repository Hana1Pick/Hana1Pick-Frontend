const MainPage = () => {
  console.log(
    "localStorage에 저장된 userIdx:",
    localStorage.getItem("userIdx")
  );
  console.log(
    "localStorage에 저장된 name:",
    localStorage.getItem("name")
  );
  console.log(
    "localStorage에 저장된 email:",
    localStorage.getItem("email")
  );
  return (
    <>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <h1>여기는 메인페이지 // TODO: 계좌 목록을 가져와야함</h1>
        <div>
          <button id="basicBtn1">Click!</button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
