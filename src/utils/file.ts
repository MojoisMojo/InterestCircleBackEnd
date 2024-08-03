import { assert } from 'console';
import * as fs from 'fs';
import * as path from 'path';
const projectRoot = path.join(__dirname, '..', '..');
async function storeSingleImg(
  targetDirRPath: string,
  imgname: string,
  img: any
): Promise<boolean> {
  // 定义目标文件夹路径
  const targetDir = path.join(projectRoot, targetDirRPath);

  // 确保目标文件夹存在
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 定义目标文件路径
  const targetFilePath = path.join(targetDir, imgname);

  // 移动文件
  try {
    const reader = fs.createReadStream(img.data);
    const stream = fs.createWriteStream(targetFilePath);
    reader.pipe(stream);
    return true;
  } catch (error) {
    console.error('复制文件时出错:', error);
    return false;
  }
}

async function storeMultipleImgs(
  targetRelativeDir: string,
  imgNames: string[],
  imgs: any[]
) {
  assert(imgs.length === imgNames.length, '图片数量与图片名数量不一致');
  for (let i = 0; i < imgNames.length; i++) {
    const img = imgs[i],
      imgName = imgNames[i];
    await storeSingleImg(targetRelativeDir, imgName, img);
  }
  return true;
}

export { storeSingleImg, storeMultipleImgs };
