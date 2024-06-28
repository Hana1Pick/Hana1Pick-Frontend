// export type LogonAction =
//      {type:"RESET", value:StateType}
//     | {type:"LOGON", value:StateType}
//     | {type:"LOGOUT", value:StateType};

//     export type PhotoType={
//         "albumId": number;
//         "id": number;
//         "title": string;
//         "url": string;
//         "thumbnailUrl": string;
//     }

//     export type AlbumType={
//         userId:number;
//         id:number;
//         title:string;
//     }

export type CelubRuleType = {
  ruleName: string;
  ruleMoney: number;
};

export type CelubHistoryType = {
  date: string;
  ruleName: string;
  hashtag: string;
  ruleMoney: number;
  totalBalance: number;
};

export type DepositCreateType = {
  name: string;
  address: string;
  birth: string;
  phone: string;
  nation: string;
};
