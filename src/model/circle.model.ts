interface ICreateCircleInfo {
  cname: string;
  cdesc: string;
  ccreator_id: string;

  cid?: string;
  ctime?: Date;
  cicon: string;
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
      cname, cdesc, ccreator_id, cicon,
      cid, ctime, cposts, cusers, cpopularity
    } = options;
    this.cname = cname;
    this.cdesc = cdesc;
    this.ccreator_id = ccreator_id;
    this.cicon = cicon;

    this.ctime = ctime ? ctime : new Date();

    this.cid = cid ? cid : Circle.generateRandomId(
      this.cname,
      this.ccreator_id,
      this.ctime
    );
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
      ccreator_id +
      (
        Math.floor(Math.random() * 0xFFFFFFFF)
      ).toString(16) +
      ctime.toISOString().replace(/[^0-9]/g, '')
    );
  }
}

export {
  ICreateCircleInfo,
  IFullCircleInfo,
  Circle
};
