import QrNonPassIcon from '../../assets/images/qr/qr-non-pass.gif';
import QrPassIcon from '../../assets/images/qr/qr-pass.gif';
import React, { ChangeEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsQR from 'jsqr';
import Header from '../../components/Header';
import qr from '../../assets/images/qr/qr.gif';
import { AccountContext } from '../../contexts/AccountContextProvider';
import './QrStyle.scss';

interface QrData {
  name: string;
  accountId: string;
  amount: number;
}

function GetQrPage() {
  const { setAmount, setInAccType, setInAccId, setInAccName }: any =
    useContext(AccountContext);
  const [qrName, setQrName] = useState('');
  const [qrAccountId, setQrAccountId] = useState('');
  const [qrAmount, setQrAmount] = useState(0);
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(0);

  const decodeQr = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const target = e.target as FileReader;
        if (target && typeof target.result === 'string') {
          const image = new Image();
          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            if (context) {
              context.drawImage(image, 0, 0);
              const imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );
              const code = jsQR(
                imageData.data,
                imageData.width,
                imageData.height
              );
              if (code) {
                const qrObject = JSON.parse(code.data) as QrData;
                setQrName(qrObject.name);
                setQrAccountId(qrObject.accountId);
                setQrAmount(qrObject.amount);
                verifyAccountInQr(qrObject);
              } else {
                alert('QR 코드 인식에 실패했습니다.');
              }
            }
          };
          image.src = target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const verifyAccountInQr = (data: QrData) => {
    const url = `http://${process.env.REACT_APP_BESERVERURI}/api/account/qr/history`;
    axios
      .get(url, { params: data })
      .then((res) => {
        console.log(res.data.data.count);
        setModal(true);
        setCount(res.data.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const back = () => {
    window.location.href = `http://${process.env.REACT_APP_FESERVERURI}/cash-out/qr`;
  };
  const next = () => {
    setAmount(qrAmount);
    setInAccType('default');
    setInAccId(qrAccountId);
    setInAccName(qrName);
    navigate('/cash-out/qr/account');
  };

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
        <label htmlFor='file'>
          <div className='basicInputFile1'>업로드</div>
        </label>
        <input
          type='file'
          id='file'
          onChange={decodeQr}
          style={{ display: 'none' }}
        />
      </div>

      {/* Decode QR Result */}
      {modal && (
        <div id='decode-qr-bg'>
          <div id='decode-qr-info'>
            <table id='decode-account-info'>
              <tbody>
                <tr>
                  <td className='alignLeft'>소유자명</td>
                  <td className='alignRight'>{qrName}</td>
                </tr>
                <tr>
                  <td className='alignLeft'>입금계좌</td>
                  <td className='alignRight'>{qrAccountId}</td>
                </tr>
                <tr>
                  <td className='alignLeft'>입금금액</td>
                  <td className='alignRight'>{qrAmount}원</td>
                </tr>
              </tbody>
            </table>
            <div id='decode-history-info'>
              {count == 0 && (
                <div>
                  <div>
                    <img
                      id='decode-history-icon'
                      src={QrNonPassIcon}
                      alt='accountImage'
                    />
                  </div>
                  <div id='decode-history-report'>
                    <div>최근 3개월간 거래 내역이 없어요.</div>
                    <div>송금 전 주의가 필요해요.</div>
                  </div>
                </div>
              )}
              {count > 0 && (
                <div>
                  <div>
                    <img
                      id='decode-history-icon'
                      src={QrPassIcon}
                      alt='accountImage'
                    />
                  </div>
                  <div id='decode-history-report'>
                    <div>최근 3개월간 거래 내역이</div>
                    <div>{count}건 존재해요.</div>
                  </div>
                </div>
              )}
            </div>
            <div id='nextBtns'>
              <button style={{ width: '45%' }} id='basicBtn2' onClick={back}>
                취소
              </button>
              <button style={{ width: '45%' }} id='basicBtn2' onClick={next}>
                이체
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetQrPage;
