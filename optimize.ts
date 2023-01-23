import { ImagePool } from '@squoosh/lib';
import { AvifEncodeOptions, codecs as encoders, JxlEncodeOptions, MozJPEGEncodeOptions, OxiPngEncodeOptions, preprocessors, QuantOptions, ResizeOptions, RotateOptions, WebPEncodeOptions, WP2EncodeOptions } from '@squoosh/lib/build/codecs';
import { cpus } from 'os';
const imagePool = new ImagePool(cpus().length);
import * as fs from 'fs/promises';

export type OptimizeOption = Partial<{
  quality: number,
  resize: {
    width: number,
    height: number
  }
}>;

type EncoderOptions = {
  mozjpeg?: Partial<MozJPEGEncodeOptions>;
  webp?: Partial<WebPEncodeOptions>;
  avif?: Partial<AvifEncodeOptions>;
  jxl?: Partial<JxlEncodeOptions>;
  wp2?: Partial<WP2EncodeOptions>;
  oxipng?: Partial<OxiPngEncodeOptions>;
};

type FileType = 'avif' | 'webp' | 'jpeg'

type Image = ReturnType<typeof imagePool.ingestImage>
type PreprocessOptions = NonNullable<Parameters<Image["preprocess"]>[0]>
type EncodeOptions = Parameters<Image["encode"]>[0]
/**
 * 指定されたfilepathの画像を最適化する
 * 
 * @param filePath 
 * @param fileType 
 * @param option 
 */
export const optimize = async function (filePath: string, fileType: FileType, option: OptimizeOption) {
  const file = await fs.readFile(filePath);
  const image = imagePool.ingestImage(file);
  const preprocessOptions: PreprocessOptions = {}
  if (option.resize) {
    preprocessOptions.resize = option.resize;
  }
  await image.preprocess(preprocessOptions)
  const avif: AvifEncodeOptions = {
    quality: option.quality
  };
  const webp: WebPEncodeOptions = {
    quality: option.quality
  };
  const encodeOption: EncodeOptions = {
    avif,
    webp
  }
  const result = await image.encode(encodeOption)
  
  let extension = 'avif';
  let output: Buffer | Uint8Array ;
  switch(fileType) {
    case 'avif':
      extension = 'avif';
      output = result.avif?.binary ?? Buffer.from("")
      break;
    case 'jpeg':
      extension = 'jpeg';
      output = result.mozjpeg?.binary ?? Buffer.from("")
      break;
    case  'webp':
      extension = 'webp';
      output = result.webp?.binary ?? Buffer.from("")
      break   
  }
  await fs.writeFile(filePath, output);
  await imagePool.close();
}