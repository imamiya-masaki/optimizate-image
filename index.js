"use strict";
exports.__esModule = true;
var optimize_1 = require("./optimize");
function main() {
    var width = 100;
    var height = 100;
    (0, optimize_1.optimize)(width, height, ".");
    console.log('start: dev');
}
main();
