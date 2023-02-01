import { ImagePool } from '@squoosh/lib';
import configure from '@jimp/custom'
import jimp from 'jimp'
import { AvifEncodeOptions, codecs as encoders, JxlEncodeOptions, MozJPEGEncodeOptions, OxiPngEncodeOptions, preprocessors, QuantOptions, ResizeOptions, RotateOptions, WebPEncodeOptions, WP2EncodeOptions } from '@squoosh/lib/build/codecs';
import { cpus } from 'os';
import * as fs from 'fs/promises';
const imagePool = new ImagePool(cpus().length);
export type OptimizeOption = Partial<{
  quality: number,
  resize?: {
    width: number,
    height: number
  },
  outputFileType?: FileType,
  crop?: CropOption
}>;

type EncoderOptions = {
  mozjpeg?: Partial<MozJPEGEncodeOptions>;
  webp?: Partial<WebPEncodeOptions>;
  avif?: Partial<AvifEncodeOptions>;
  jxl?: Partial<JxlEncodeOptions>;
  wp2?: Partial<WP2EncodeOptions>;
  oxipng?: Partial<OxiPngEncodeOptions>;
};

type FileType = 'avif' | 'webp' | 'jpeg' | 'png'

type Image = ReturnType<typeof imagePool.ingestImage>
type PreprocessOptions = NonNullable<Parameters<Image["preprocess"]>[0]>
type EncodeOptions = Parameters<Image["encode"]>[0]
type FileSetType = {file: Buffer | Uint8Array, fileType: FileType}
type FileSetBufferType = {file: Buffer, fileType: FileType}
type CommandType = 'crop' | 'optimize'
/**
 * 指定されたfilepathの画像を最適化する
 * 
 * @param filePath 
 * @param fileType 
 * @param option 
 */
export const optimize = async function (file: ArrayBuffer, fileType: FileType, option: OptimizeOption): Promise<FileSetType> {
  const image = imagePool.ingestImage(file);
  const preprocessOptions: PreprocessOptions = {}
  const outputFileType = option.outputFileType ?? fileType
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
  
  let extension: FileType = 'avif';
  let output: Buffer | Uint8Array = Buffer.from("");
  switch(outputFileType) {
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
  

  return {file: output, fileType: extension}
}

type CropOption = {
  crop: [
  x: number,
  y: number,
  w: number,
  h: number
  ],
  // resize: [
  //   x: number,
  //   y: number
  // ],
  // quality: number
}

export const crop = async function (file: Buffer, fileType: FileSetType["fileType"], option?: CropOption): Promise<Buffer> {
  if (!option?.crop) {
    throw Error("not specified crop number")
  }
  switch(fileType) {
    case 'jpeg':
    case 'png':
      break;
    default:
      throw Error("dont support type of resize")
  }
  const jimpLoaded = await jimp.read(file)
  jimpLoaded.crop(...option.crop)
  const buffer = await jimpLoaded.getBufferAsync("image/" + fileType)
  return buffer
}



export const imageExec = async function (filePath: string, commandSet: Set<CommandType>, option: OptimizeOption) {
  const lastFileName = filePath.split('/')[filePath.split('/').length - 1]
  const isDirectory = lastFileName === '';
  const targetFiles: {file: Buffer, fileType: FileType, filePath: string}[] = [];
  // 入力層
  if (isDirectory) {
    const fileNames = await fs.readdir(filePath)
    for (const fileName of fileNames) {
      const file = await fs.readFile(filePath + fileName)
      const fileType = assumeExtension(filePath + fileName)
      targetFiles.push({file, fileType, filePath: filePath + fileName})
    }
  } else {
    const file = await fs.readFile(filePath);
    const fileType = assumeExtension(filePath);
    targetFiles.push({file, fileType, filePath})
  }
  const outputFiles: {file: Buffer | Uint8Array, filePath: string}[] = [];
  for (let targetFile of targetFiles) {
    let fileBuffer = targetFile.file
    let fileType = targetFile.fileType

    // 処理層
    // Buffer | Uint8Arrayではなく、Buffer型で表したい時に利用
    if (commandSet.has("crop")) {
      fileBuffer = await crop(fileBuffer, fileType, option?.crop)
    }
    let output: FileSetType = {file: fileBuffer, fileType: fileType}
    if (commandSet.has("optimize")) {
      output = await optimize(output.file, output.fileType, option) 
    }
    const outputFile = output.file
    const outputFileType = output.fileType
    let splitFilePath = targetFile.filePath.split('/')
    let  outputLastFileSplitName = splitFilePath[splitFilePath.length - 1].split('.')
    outputLastFileSplitName[outputLastFileSplitName.length - 1] = outputFileType
    const outputLastFileName = outputLastFileSplitName.join('.')
    splitFilePath[splitFilePath.length - 1] = outputLastFileName
    const outputFilePath = splitFilePath.join('/')
    outputFiles.push({
      file: outputFile,
      filePath: outputFilePath
    })
  }
  // 出力層
  for (const outputFile of outputFiles) {
    await fs.writeFile(outputFile.filePath, outputFile.file);
  }
  await imagePool.close();
}

export const assumeExtension = function (filePath: string): FileType {
  const lastFileName = filePath.split('/')[filePath.split('/').length - 1]
  const extension = lastFileName.split('.')[1]
  let fileType: FileType = 'jpeg'
  switch(extension) {
    case "jpeg":
    case "jpg":
      fileType = 'jpeg'
      break;
    case "avif":
      fileType = 'avif'
      break;
    case "webp":
      fileType = 'webp'
      break;
    case "png":
      fileType = 'png'
      break;
  }
  return fileType
}