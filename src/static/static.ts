import {
  static_circle_info,
  static_circles_info,
  static_empty_circle_info,
} from './circle';

const static_empty_user = {
  uid: '',
  name: '',
  email: '',
  bio: '',
  avatarUrl: '',
  postsCount: 0,
  circlesCount: 0,
  passWord: '',
};

const static_mojo_user = {
  uid: 'mojo163com',
  name: 'mojomojomojomojo',
  email: 'mojo@163.com',
  bio: 'gudengmingyueyingluoye',
  avatarUrl: '/logo.svg',
  postsCount: 1345,
  circlesCount: 14,
  passWord: '15wbFdA',
};

const static_poster = {
  uid: '123',
  name: '孤灯明月映落叶',
  email: 'mojo@example.com',
  avatarUrl: '/logo.svg',
};
const static_poster_2 = {
  uid: '12345',
  name: '毛',
  email: 'mojoMao@example.com',
  avatarUrl: '/../src/assets/img/GameCirclePic.png',
};
const static_poster_3 = {
  uid: '123456',
  name: '毛666',
  email: 'mojoMao@example.com',
  avatarUrl: '/../src/assets/img/FamilyCirclePic.png',
};

const static_post = {
  pid: 'post1',
  time: new Date('2021-09-01 00:12').getTime(),
  content:
    'ffffffffffffffffffffffffffff\
    fffffffffffffffffffffffffffff\
    ffffff\n\
    fffffffffffffffffffffffffffffffffff\
    fffffffffffffffffffffffffffffffffff\
    fffffffffffffffffffffffffffffffffff',
  imgs: [
    '/logo.svg',
    '/../src/assets/img/FamilyCirclePic.png',
    '/../src/assets/img/gameCirclePic.png',
  ],
  likes: 20,
  looks: 3,
  comments: 104,
};

const static_post_2 = {
  pid: 'post2',
  time: new Date('2024-1-1 17:34'),
  content: '吃饭',
  imgs: [
    '/logo.svg',
    '/../src/assets/img/gameCirclePic.png',
    '/logo.svg',
    '/../src/assets/img/FamilyCirclePic.png',
    '/../src/assets/img/gameCirclePic.png',
    '/../src/assets/img/FamilyCirclePic.png',
  ],
  likes: 20,
  looks: 3,
  comments: 104,
};

const static_post_3 = {
  pid: 'post3',
  time: new Date('2024-12-30 12:34'),
  content: '吃饭',
  imgs: [
    '/logo.svg',
    '/../src/assets/img/gameCirclePic.png',
    '/logo.svg',
    '/../src/assets/img/gameCirclePic.png',
    '/../src/assets/img/FamilyCirclePic.png',
  ],
  likes: 20,
  looks: 3,
  comments: 104,
};
const static_circle_card_info_daily = {
  cid: 'daily123',
  cname: '日常分享',
  description:
    '日常分享 | 苏州 | 交友 | 旅行 | 吃喝玩乐 | 拍照 | 逛街 | 买买买 | 美妆 | 美照 | 美食 | 美景 | 美女 | 美男 | 美好生活 | 美好时光 | 美好未来 | 美好回忆 | 美好心情',
  image: '/logo.svg',
  isJoined: false,
};

const static_circle_card_info_game = {
  cid: 'game123',
  cname: '游戏分享',
  description: '游戏分享 | 苏州',
  image: '/src/assets/img/gameCirclePic.png',
  isJoined: false,
};

const static_circle_card_info_game2 = {
  cid: 'game1234',
  cname: '游戏分享',
  description: '游戏分享 | 苏州',
  image: '/src/assets/img/gameCirclePic.png',
  isJoined: false,
};

const static_circle_posts = [
  { poster: static_poster, post: static_post },
  { poster: static_poster_2, post: static_post_2 },
  { poster: static_poster_3, post: static_post_3 },
];

const static_circles_card_info = [
  static_circle_card_info_daily,
  static_circle_card_info_game,
  static_circle_card_info_game2,
];

const static_circles_joined = {
  daily123: true,
  game123: true,
  game1234: true,
};

const static_comment = {
  comid: '123',
  commenter: static_poster,
  time: new Date('2021-09-01 00:12'),
  content:
    'HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\n\
  换行',
  pid: '123',
};
const static_comment2 = {
  comid: '1234',
  commenter: static_poster,
  time: new Date('2021-09-01 12:12').getTime(),
  content:
    'HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\n\
  换行',
  pid: '123',
};
const static_comment3 = {
  comid: '12345',
  commenter: static_poster,
  time: new Date('2021-09-01 13:12').getTime(),
  content:
    'HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\
  HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒\n\
  换行',
  pid: '123',
};

const static_comments = [static_comment, static_comment2, static_comment3];

export {
  static_poster,
  static_poster_2,
  static_poster_3,
  static_post,
  static_post_2,
  static_post_3,
  static_empty_user,
  static_mojo_user,
  static_circle_posts,
  static_circle_card_info_daily,
  static_circle_card_info_game,
  static_circle_card_info_game2,
  static_circles_card_info as static_circles,
  static_circles_joined,
  static_comment,
  static_comment2,
  static_comments,
  static_circle_info,
  static_circles_info,
  static_empty_circle_info,
};
