import Header from '../../components/Header';
import CommonInputFile from '../../components/button/CommonInputFile';
import qr from '../../assets/images/qr/qr.gif';
import './QrStyle.scss';

function GetQrPage() {
  return (
    <div>
      <Header value='QR 코드 송금' />
      <div id='main'>
        <div id='mainInfoCenter'>간편하게 QR 코드로 송금해 보세요.</div>
        <div id='extraInfoCenter'>
          <div>QR 코드 속 입금 계좌의</div>
          <div>
            <span>최근 3개월간 거래 내역</span> 확인을 통해
          </div>
          <div>안전하게 송금할 수 있어요.</div>
        </div>
        <div id='qrWrapper'>
          <div id='qrCard'>
            <div>
              <img className='qrImage' src={qr} alt='qrImage' />
            </div>
          </div>
        </div>
      </div>
      <div id='nextBtn'>
        <CommonInputFile
          type='pink'
          value='업로드'
          nextUrl='/cash-out/qr/result'
        />
      </div>
    </div>
  );
}

export default GetQrPage;
