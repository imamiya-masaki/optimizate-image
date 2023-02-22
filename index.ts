import { OptimizeOption, isOptimizeOptionResize, CommandSet, isFileType, fileTypeArray, imageExec } from './optimize';
import {program} from 'commander'

type ProgramOptions = {
  "resizeWidth"?: string,
  "resizeHeight"?: string,
  "crop"?: string,
  "quality"?: string,
  "outputFileType"?: string,
  "midCrop"?: string
}
program
  .option('-rw, --resize-width <number>', 'for width resizing')
  .option('-rh, --resize-height <number>', 'for height resizing')
  .option('-c, --crop <number>,<number>,<number>,<number>', 'for crop start <x,y,width,height>')
  .option('-q, --quality <number>', 'for image quality')
  .option('-ft, --output-file-type <number>', 'for output file type (e.g. avif , webp , ..etc)')
  .option('-mc, --mid-crop <number>,<number>', 'this is for mid crop <width, height>. it can expect x and y to crop near of mid')
program.parse(process.argv);
const exec = async function () {
  const options: ProgramOptions = program.opts();
  console.log(options);

  const setOption: OptimizeOption = {}
  const commands: CommandSet = new Set()
  commands.add("optimize")

  // command-check
  if (options.midCrop && options.crop) {
    // midCropとcropは共存できない
    throw Error("Please select only one of midCrop or crop.")
  }

  if (options.quality) {
    if (Number.isNaN(Number(options.quality))) {
      throw Error("The type of quality must be Number.")
    }
    setOption.quality = Number(options.quality)
  }
  const resize: {width?: number, height?: number} = {}
  if (options.resizeWidth) {
    if (Number.isNaN(Number(options.resizeWidth))) {
      throw Error("The type of resizeWidth must be Number.")
    }
    resize.width = Number(options.resizeWidth);
  }
  if (options.resizeHeight) {
    if (Number.isNaN(Number(options.resizeHeight))) {
      throw Error("The type of resizeHeight must be Number.")
    }
    resize.height = Number(options.resizeHeight);
  }
  if (isOptimizeOptionResize(resize)) {
    setOption.resize = resize;
  }
  if (options.outputFileType) {
    if (isFileType(options.outputFileType)) {
      setOption.outputFileType = options.outputFileType
    } else {
      throw Error(`The type of outputFileType must be ${fileTypeArray.join(' or ')}.`)
    }
  }

  // crop
  if (options.crop) {
    const cropNumbers = options.crop.split(',').map(str => Number(str))
    if (cropNumbers.length === 4 && cropNumbers.every(num => !Number.isNaN(num))) {
      const [x,y,w,h] = cropNumbers
      setOption.crop = {
        crop: [x,y,w,h]
      }
    } else {
      throw Error("The format of crop must be <number>,<number>,<number>,<number> .")
    }
    commands.add("crop")
  }

  if (options.midCrop) {
    const cropNumbers = options.midCrop.split(',').map(str => Number(str))
    if (cropNumbers.length === 2 && cropNumbers.every(num => !Number.isNaN(num))) {
      const [w,h] = cropNumbers
      setOption.crop = {
        midCrop: [w,h]
      }
    } else {
      throw Error("The format of mid-crop must be <number>,<number> .")
    }
    commands.add("crop")
  }
  // exec
  console.log("args", program.args)
  if (program.args.length !== 1) {
    throw Error("only one argument is required")
  }
  await imageExec(program.args[0], commands, setOption)

}
exec()