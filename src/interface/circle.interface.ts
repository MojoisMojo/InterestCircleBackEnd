export interface ICreateCircleOptions {
  cname: string;
  cdesc: string;
  ccreator_id: string;
  cicon: string;
} // 这里是创建时，前端给数据格式

// 下面是后端给前端数据的格式，和前端的名字一样

// export interface ICircleCardInfo {
//   cid: string;
//   cname: string;
//   cdesc: string;
//   cicon: string;
//   cpopularity: number;
// } // 这里是圈子卡片的数据格式

export interface ICircleInfo {
  cid: string;
  cname: string;
  cdesc: string;
  cicon: string;

  ctime: Date;
  cposts: number;
  cmembers: number;
  cpopularity: number;
}


export interface ICircleWithJoinedInfo{
  circle: ICircleInfo;
  isJoined: boolean;
}

// 这里是数据库的数据格式
export interface ICircle {
  cid: string;
  cname: string;
  cdesc: string;
  ccreator_id: string;
  cicon: string;
  ctime: Date;
  cposts: number;
  cmembers: number;
  cpopularity: number;
}
