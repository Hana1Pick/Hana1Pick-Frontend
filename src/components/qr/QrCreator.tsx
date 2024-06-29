import QRCode from 'qrcode.react';

type CashOutData = {
  name: string;
  accountId: string;
  amount: number;
};

type QrCreatorData = {
  value: CashOutData;
  size?: number;
};

const QrCreator = ({ value, size = 250 }: QrCreatorData) => {
  const qrValue = JSON.stringify(value);

  return (
    <div>
      <QRCode value={qrValue} size={size} />
    </div>
  );
};

export default QrCreator;
