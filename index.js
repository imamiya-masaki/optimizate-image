"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var optimize_1 = require("./optimize");
var commander_1 = require("commander");
commander_1.program
    .option('-rw, --resize-width <number>', 'for width resizing')
    .option('-rh, --resize-height <number>', 'for height resizing')
    .option('-c, --crop <number>,<number>,<number>,<number>', 'for crop start <x,y,width,height>')
    .option('-q, --quality <number>', 'for image quality')
    .option('-ft, --output-file-type <number>', 'for output file type (e.g. avif , webp , ..etc)')
    .option('-mc, --mid-crop <number>,<number>', 'this is for mid crop <width, height>. it can expect x and y to crop near of mid');
commander_1.program.parse(process.argv);
var exec = function () {
    return __awaiter(this, void 0, void 0, function () {
        var options, setOption, commands, resize, cropNumbers, x, y, w, h;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = commander_1.program.opts();
                    console.log(options);
                    setOption = {};
                    commands = new Set();
                    commands.add("optimize");
                    if (options.quality) {
                        if (Number.isNaN(Number(options.quality))) {
                            throw Error("The type of quality must be Number.");
                        }
                        setOption.quality = Number(options.quality);
                    }
                    resize = {};
                    if (options.resizeWidth) {
                        if (Number.isNaN(Number(options.resizeWidth))) {
                            throw Error("The type of resizeWidth must be Number.");
                        }
                        resize.width = Number(options.resizeWidth);
                    }
                    if (options.resizeHeight) {
                        if (Number.isNaN(Number(options.resizeHeight))) {
                            throw Error("The type of resizeHeight must be Number.");
                        }
                        resize.height = Number(options.resizeHeight);
                    }
                    if ((0, optimize_1.isOptimizeOptionResize)(resize)) {
                        setOption.resize = resize;
                    }
                    if (options.outputFileType) {
                        if ((0, optimize_1.isFileType)(options.outputFileType)) {
                            setOption.outputFileType = options.outputFileType;
                        }
                        else {
                            throw Error("The type of outputFileType must be ".concat(optimize_1.fileTypeArray.join(' or '), "."));
                        }
                    }
                    // crop
                    if (options.crop) {
                        cropNumbers = options.crop.split(',').map(function (str) { return Number(str); });
                        if (cropNumbers.length === 4 && cropNumbers.every(function (num) { return !Number.isNaN(num); })) {
                            x = cropNumbers[0], y = cropNumbers[1], w = cropNumbers[2], h = cropNumbers[3];
                            setOption.crop = {
                                crop: [x, y, w, h]
                            };
                        }
                        else {
                            throw Error("The format of crop must be <number>,<number>,<number>,<number> .");
                        }
                        commands.add("crop");
                    }
                    // exec
                    console.log("args", commander_1.program.args);
                    if (commander_1.program.args.length !== 1) {
                        throw Error("only one argument is required");
                    }
                    return [4 /*yield*/, (0, optimize_1.imageExec)(commander_1.program.args[0], commands, setOption)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exec();
