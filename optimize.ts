import { ImagePool,  } from '@squoosh/lib';
import { cpus } from 'os';
const imagePool = new ImagePool(cpus().length);
import * as fs from 'fs/promises';

type Option = {
  width: number,
  height: number,
  quality: number
};

type Image = ReturnType<typeof imagePool.ingestImage>
type PreprocessOptions = NonNullable<Parameters<Image["preprocess"]>[0]>

export const optimize = async function (filePath: string, option: Option) {
  const file = await fs.readFile(filePath);
  const image = imagePool.ingestImage(file);
  const width = option.width;
  const height = option.height;
  const resize = {
    width,
    height
  }
  const preprocessOptions: PreprocessOptions = {resize}
  await image.preprocess(preprocessOptions)
  const encodeOption = {
    mozjpeg: {},
    jxl: {
      quality: 90
    }
  }
}