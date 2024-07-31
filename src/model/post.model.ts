type tPosterInfo = {
  uid: string;
  name: string;
  avatarUrl: string;
};

type tPostInfo = {
  cid: string;
  pid: string;
  time: Date;
  content: string;
  imgs: string[];

  looks: number;
  likes: number;
  comments: number;

  poster: tPosterInfo;
};

type tCreatePostOptions = {
  content: string;
  cid: string;
  poster: tPosterInfo;
  imgs?: string[];
};

class Post{
  postInfo: tPostInfo;
  constructor(options: tCreatePostOptions){
    let {content, cid, poster, imgs} = options;
    let time = new Date();
    this.postInfo = {
      pid: Post.generateRandomId(cid, poster.uid, time),
      time: time,
      content: content,
      imgs: imgs ? imgs : [],
      likes: 0,
      looks: 0,
      comments: 0,
      poster: poster,
      cid: cid,
    };
  }

  private static generateRandomId(cid:string, uid:string, time:Date): string {
    return cid + uid + Number(time.toISOString().replace(/[^0-9]/g, '')).toString(36);
  }

  public getPostInfo(): tPostInfo {
    return this.postInfo;
  }
}
