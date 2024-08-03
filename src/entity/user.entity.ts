import {
  // pre,
  prop,
  modelOptions,
  // getModelForClass,
  // index,
} from '@typegoose/typegoose';
import { mDecode } from '../utils/id';
import { UserInfo, UserSingpleInfo } from '../model/user.model';
import { PosterInfo } from '../model/post.model';
import { CommenterInfo } from '../model/comment.model';
// import { CircleMember } from './circleMember.entity';

// // 获取 CircleMember 模型
// const CircleMemberModel = getModelForClass(CircleMember);

@modelOptions({
  schemaOptions: {
    collection: 'Users',
  }, // 设置集合名称
})
// @pre<User>('findOneAndDelete', async function (next) {
//   await CircleMemberModel.deleteMany({ uid: this.uid });
//   next();
// })
export class User {
  @prop({ required: true, unique: true })
  public uid!: string;

  @prop()
  public name: string;

  @prop()
  public password: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ default: '' })
  public bio: string;

  @prop({ default: '' })
  public avatarUrl: string;

  @prop({ default: 0 })
  public postsCount: number;

  @prop({ default: 0 })
  public circlesCount: number;

  @prop({ default: () => new Date() })
  public createAt: Date;

  public checkPassword(inputPassword: string): boolean {
    return inputPassword === mDecode(this.password);
  }

  public getUserInfo(): UserInfo {
    return new UserInfo({
      uid: this.uid,
      name: this.name,
      email: this.email,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      postsCount: this.postsCount,
      circlesCount: this.circlesCount,
      createAt: this.createAt,
    });
  }
  public getInfoAsPoster(): PosterInfo {
    return new PosterInfo({
      uid: this.uid,
      name: this.name,
      avatarUrl: this.avatarUrl,
    });
  }
  public getInfoAsCommenter(): CommenterInfo {
    return new CommenterInfo({
      uid: this.uid,
      name: this.name,
      avatarUrl: this.avatarUrl,
    });
  }
  public getSimplInfo(): UserSingpleInfo {
    return new UserSingpleInfo({
      uid: this.uid,
      name: this.name,
      avatarUrl: this.avatarUrl,
      bio: this.bio,
    });
  }
}
