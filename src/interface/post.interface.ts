export interface ICreatePostOptions {
  uid: string;
  cid: string;
  content: string;
  imgs?: string[];
}

export interface IPosterInfo {
  uid: string;
  name: string;
  avatarUrl: string;
}

export interface IPostContentInfo {
  pid: string;

  cid: string;

  time: Date;
  content: string;
  imgs: string[];

  looks: number;
  likes: number;
  comments: number;
}

export interface IPostInfo {
  posterInfo: IPosterInfo;
  postContent: IPostContentInfo;
  isLiked: boolean;
}

export interface IMpost {
  pid: string;
  cid: string;
  uid: string;

  time: Date;
  content: string;
  imgs: string[];

  looks: number;
  likes: number;
  comments: number;
}
