const ciconPath = ['public', 'circle'];
const avatarPath = ['public', 'avatar'];
const postImgPath = (time: Date) => [
  'public',
  'postImg',
  time.toISOString().slice(0, 10).replace(/-/g, ''),
];

export { ciconPath, avatarPath, postImgPath };
