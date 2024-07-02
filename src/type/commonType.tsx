export type CelubRuleType = {
  ruleName: string;
  ruleMoney: number;
};

export type CelubHistoryType2 = {
  date: string;
  ruleName: string;
  hashtag: string;
  ruleMoney: number;
  totalBalance: number;
};

export type CelubHistoryType = {
  transDate: string;
  memo: string;
  transAmount: number;
  afterInBal: number;
  hashtag: string;
};

export type CelubAccount = {
  account_id: string;
  name: string;
  balance: number;
  imgSrc: string;
  ruleMoney: number;
  totalBalance: number;
};

export type MoaClubHeaderData1 = {
  value: string;
  disabled: boolean;
};

export type MoaClubHeaderData2 = {
  value: string;
  disabled: boolean;
};

export type DomesticAuthProps = {
  rtcRoomNum: string;
  formData: {
    name: string;
    address: string;
    birth: string | null;
    phone: string;
    nation: string;
    email: string | null; 
    password: string;
  };
};

export type OCRData = {
  data: {
    name: string;
    number: string;
    address: string;
    nation: string;
    date: string;
    certification: string;
    };
  };