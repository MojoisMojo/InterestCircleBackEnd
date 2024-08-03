const ciconPath = ['public', 'circle'];
const avatarPath = ['public', 'avatar'];
const postImgPath = (time: Date) => [
  'public',
  'postImg',
  time.toISOString().slice(0, 10).replace(/-/g, ''),
];

const userAvatarUrl = (path: string) =>
  [...avatarPath, path ? path : 'avatar.svg'].join('/');

export { ciconPath, avatarPath, postImgPath, userAvatarUrl };
