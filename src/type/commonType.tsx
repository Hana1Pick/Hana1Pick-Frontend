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

export type MoaclubInfo = {
	name: string;
	accountId: string;
	balance: number;
	clubFee: number;
	atDate: number;
	currency: string;
	createDate: string;
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
