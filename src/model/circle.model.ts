import { ICircleInfo } from '../interface/circle.interface';

export class CircleInfo implements ICircleInfo {
  cid: string;
  cname: string;
  cdesc: string;
  ctime: Date;
  cicon: string;
  cposts: number;
  cmembers: number;
  cpopularity: number;
  constructor(options: ICircleInfo) {
    let {
      cid,
      cname,
      cdesc,
      ctime,
      cicon,
      cposts,
      cmembers,
      cpopularity,
    } = options;
    this.cid = cid;
    this.cname = cname;
    this.cdesc = cdesc;
    this.ctime = ctime;
    this.cicon = `/public/circle/${cicon}`; // 添加统一的相对路径
    this.cposts = cposts;
    this.cmembers = cmembers;
    this.cpopularity = cpopularity;
  }
}
