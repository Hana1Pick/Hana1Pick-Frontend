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

export type MoaClubHeaderData = {
  value: string;
  disabled: boolean;
  onClick?: () => void;
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
export type CelubListType = {
  idx: number;
  name: string;
  thumbnail: string;
  type: string;
};

export type CelubWithdrawType = {
  userIdx: string;
  accPw: number;
  name: string;
  imgSrc: string;
  outAccId: string;
  celebrityIdx: number;
};

export type MoaclubInfo = {
  name: string;
  accountId: string;
  balance: number;
  clubFee: number;
  atDate: number;
  currency: string;
  createDate: string;
  chatRoomId: number;
  memberList: memberList[];
};

export type memberList = {
  userName: string;
  userIdx: string;
  profile: string;
  role: string;
};

export type MoaclubAccHis = {
  transDate: string;
  transType: string;
  target: string;
  transAmount: number;
  balance: number;
};

export type MemeberFeeStatus = {
  name: string;
  profile: string;
  amount: number;
  status: string;
};

// 계좌 데이터 타입 정의
export interface Account {
  accountId: string;
  name: string;
  accountType: string;
  balance: number;
}

export interface MoaTrsf {
  outAccId: string;
  inAccId: string;
  name: string;
  trsfAmount: number;
  currency: string;
}

export type MoaClubVoteResult = {
  accountId: string;
  userName: string;
  candidateName: string;
  amount: number;
  requestTime: string;
  votes: Record<string, boolean>;
};

export interface MoaAutoTrsf {
  atDate: number;
  amount: number;
  inAccId: string;
  outAccId: string;
  currency: string;
  createDate: string;
}

// NotificationType
export interface NotificationType {
  idx: number;
  content: string;
  url: string;
  createdAt: string;
  type: string;
}

// ModalType
export type CommonModalType = {
  msg: string;
  show: boolean;
  onCancle: () => void;
  onConfirm: () => void;
};

export type CommonModalType2 = {
  msg: string;
  show: boolean;
  onConfirm: () => void;
};

//patternLineType
export type Line = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};
