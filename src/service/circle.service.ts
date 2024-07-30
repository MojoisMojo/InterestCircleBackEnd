import { Provide, sleep } from '@midwayjs/core';
import { Circle,ICreateCircleInfo } from '../model/circle.model';
import { static_circle_info } from '../static/circle';

@Provide()
export class CircleService {
  public async createCircle(options: ICreateCircleInfo): Promise<Circle> {
    await sleep(1000);
    let circle = new Circle(options);
    return circle;
  }

  public async getInfo(cid: string): Promise<Circle|null> {
    await sleep(1000);
    return new Circle(static_circle_info);
  }

}
