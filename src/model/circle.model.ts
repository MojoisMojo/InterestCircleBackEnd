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
    this.cicon = cicon;
    this.cposts = cposts;
    this.cmembers = cmembers;
    this.cpopularity = cpopularity;
  }
}

//     this.cicon = cicon ? cicon : mGenerateRandomId(8) + this.cid;
//   private static generateRandomId(
//     cname: string,
//     ccreator_id: string,
//     ctime: Date
//   ): string {
//     return (
//       ccreator_id.slice(0, 4) +
//       mGenerateRandomId(4) +
//       (ctime.getTime()).toString(36) +
//       ccreator_id.slice(4)
//     );
//   }
