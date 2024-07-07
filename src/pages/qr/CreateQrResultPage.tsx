import { useContext, useRef } from 'react';
import Header from '../../components/Header';
import { QrContext } from '../../contexts/QrContextProvider';
import QrCreator from '../../components/qr/QrCreator';
import CommonBtn from '../../components/button/CommonBtn';

function CreateQrResultPage() {
  const { name, inAccId, amount }: any = useContext(QrContext);

  const save = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas ? canvas.toDataURL('image/png') : '';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr.png';
    link.click();
  };

  const qrData = {
    name: name,
    accountId: inAccId,
    amount: amount,
  };

  return (
    <div>
      <Header value='QR 코드 발급' />
      <div id='main'>
        <div id='mainInfo'>QR 코드 발급을 완료하였습니다.</div>
        <div id='extraInfo'>
          <div>
            <span>{inAccId}</span> 계좌로
          </div>
          <div>
            <span>{amount}</span>원 입금되는 QR 코드입니다.
          </div>
        </div>
        <div id='qrWrapper'>
          <QrCreator value={qrData} />
        </div>
      </div>
      <div id='nextBtn'>
        <CommonBtn type='pink' value='저장' onClick={save} disabled={false} />
      </div>
    </div>
  );
}

export default CreateQrResultPage;
