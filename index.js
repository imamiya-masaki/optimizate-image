"use strict";
exports.__esModule = true;
var program = require('commander').program;
program
    .option('-rw, --resize-width <number>', 'for width resizing')
    .option('-rh, --resize-height <number>', 'for height resizing');
program.parse(process.argv);
var exec = function () {
    var options = program.opts();
    console.log(options);
    console.log('pizza details:');
    if (options.small)
        console.log('- small pizza size');
    if (options.pizzaType)
        console.log("- ".concat(options.pizzaType));
};
exec();
