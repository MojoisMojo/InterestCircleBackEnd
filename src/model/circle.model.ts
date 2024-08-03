import {
  ICircleInfo,
  ICircleWithJoinedInfo,
  ICircle,
} from '../interface/circle.interface';

import { ciconPath } from '../utils/ImgPath';

export class CircleWithJoinedInfo implements ICircleWithJoinedInfo {
  circle: ICircleInfo;
  isJoined: boolean;
  constructor({ circle, isJoined }: ICircleWithJoinedInfo) {
    this.circle = circle;
    this.isJoined = isJoined;
  }
}

export class CircleInfo implements ICircleInfo {
  cid: string;
  cname: string;
  cdesc: string;
  ctime: Date;
  cicon: string;
  cposts: number;
  cmembers: number;
  cpopularity: number;
  constructor(options: ICircle) {
    let { cid, cname, cdesc, ctime, cicon, cposts, cmembers, cpopularity } =
      options;
    this.cid = cid;
    this.cname = cname;
    this.cdesc = cdesc;
    this.ctime = ctime;
    this.cicon = [...ciconPath, cicon].join('/');
    this.cposts = cposts;
    this.cmembers = cmembers;
    this.cpopularity = cpopularity;
  }
}
