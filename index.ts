import { optimize, OptimizeOption } from './optimize';
const { program } = require('commander');
program
  .option('-rw, --resize-width <number>', 'for width resizing')
  .option('-rh, --resize-height <number>', 'for height resizing');

program.parse(process.argv);
const exec = function () {
  const options = program.opts();
  console.log(options);
  console.log('pizza details:');
  if (options.small) console.log('- small pizza size');
  if (options.pizzaType) console.log(`- ${options.pizzaType}`);
}
exec()