export interface ICreateCircleOptions {
  cname: string;
  cdesc: string;
  ccreator_id: string;
  cicon: string;
}

export interface ICircleInfo{
  cid: string;
  cname: string;
  cdesc: string;
  cicon: string;

  ctime: Date;
  cposts: number;
  cmembers: number;
  cpopularity: number;
}

export interface ICircle extends ICreateCircleOptions {
  cid: string;

  ctime: Date;
  cposts: number;
  cmembers: number;
  cpopularity: number;
}
