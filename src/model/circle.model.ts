import { mGenerateRandomId } from "../utils/id";

interface ICreateCircleInfo {
  cname: string;
  cdesc: string;
  ccreator_id: string;

  cid?: string;
  ctime?: Date;
  cicon?: string;
  cposts?: number;
  cusers?: number;
  cpopularity?: number;
}

interface IFullCircleInfo {
  cid: string;
  cname: string;
  cdesc: string;
  ccreator_id: string;
  ctime: Date;
  cicon: string;
  cposts: number;
  cusers: number;
  cpopularity: number;
}

class Circle implements IFullCircleInfo {
  cid: string;
  cname: string;
  cdesc: string;
  ccreator_id: string;
  ctime: Date;
  cicon: string;
  cposts: number;
  cusers: number;
  cpopularity: number;

  constructor(options: ICreateCircleInfo) {
    let {
      cname,
      cdesc,
      ccreator_id,
      cicon,
      cid,
      ctime,
      cposts,
      cusers,
      cpopularity,
    } = options;
    this.cname = cname;
    this.cdesc = cdesc;
    this.ccreator_id = ccreator_id;

    this.ctime = ctime ? ctime : new Date();

    this.cid = cid
      ? cid
      : Circle.generateRandomId(this.cname, this.ccreator_id, this.ctime);
    this.cicon = cicon ? cicon : mGenerateRandomId(8) + this.cid;
    this.cposts = cposts ? cposts : 0;
    this.cusers = cusers ? cusers : 0;
    this.cpopularity = cpopularity ? cpopularity : 0;
  }

  private static generateRandomId(
    cname: string,
    ccreator_id: string,
    ctime: Date
  ): string {
    return (
      ccreator_id.slice(0, 4) +
      mGenerateRandomId(4) +
      (ctime.getTime()).toString(36) +
      ccreator_id.slice(4)
    );
  }
  public getCiconUrl(): string {
    return `/circle/${this.cid}`;
  }
}

export { ICreateCircleInfo, IFullCircleInfo, Circle };
