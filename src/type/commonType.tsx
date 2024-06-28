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

export type CelubRuleType={
    ruleName:string;
    ruleMoney:number;
}

export type CelubHistoryType={
    transDate: string;
    memo: string;
    transAmount: number;
    afterInBal: number;
    hashtag: string;

}

export type CelubAccount={
    account_id: string;
    name: string;
    balance: number;
    imgSrc: string;
    ruleMoney: number;
    totalBalance: number;
}

export type MoaClubHeaderData1 = {
    value: string;
    disabled: boolean
}

export type MoaClubHeaderData2 = {
    value: string;
    disabled: boolean
}