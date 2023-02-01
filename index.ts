import { optimize, OptimizeOption } from './optimize';
const { program } = require('commander');
program
  .option('-rw, --resize-width <number>', 'for width resizing')
  .option('-rh, --resize-height <number>', 'for height resizing')
  .option('-c, --crop <number> <number> <number> <number>', 'for crop start <x,y,width,height>')
  .option('-q, --quality <number>', 'for image quality')
  .option('-ft, --output-file-type <number>', 'for output file type (e.g. avif , webp , ..etc)')
program.parse(process.argv);
const exec = function () {
  const options = program.opts();
  console.log(options);
  console.log('pizza details:');
  if (options.small) console.log('- small pizza size');
  if (options.pizzaType) console.log(`- ${options.pizzaType}`);
}
exec()