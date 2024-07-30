type tPosterInfo = {
  uid: string;
  name: string;
  avatarUrl: string;
};

type tPostContent = {

}

type tPostInfo = {
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
  poster: tPosterInfo;
  cid: string;
  constructor(options: tCreatePostOptions){
    let {content, cid, poster, imgs} = options;
    this.postInfo = {
      pid: 'post1',
      time: new Date(),
      content: content,
      imgs: imgs ? imgs : [],
      likes: 0,
      looks: 0,
      comments: 0,
      poster: poster,
    };
    this.poster = poster;
    this.cid = cid;
  }

  private static generateRandomId(cid:string, uid:string, time:Date): string {
    return cid + uid + Number(time.toISOString().replace(/[^0-9]/g, '')).toString(36);
  }
}
