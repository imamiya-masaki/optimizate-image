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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.assumeExtension = exports.imageExec = exports.crop = exports.computeXY = exports.optimize = exports.isFileType = exports.fileTypeArray = exports.isOptimizeOptionResize = exports.isObject = void 0;
var lib_1 = require("@squoosh/lib");
var ImageSize = require("image-size");
var es_1 = require("jimp/es");
var os_1 = require("os");
var fs = require("fs/promises");
var fsSync = require("fs");
var isObject = function (value) {
    return value !== null && typeof value === 'object';
};
exports.isObject = isObject;
var isOptimizeOptionResize = function (obj) {
    return (0, exports.isObject)(obj) && (Object.hasOwn(obj, "width") || Object.hasOwn(obj, "height"));
};
exports.isOptimizeOptionResize = isOptimizeOptionResize;
exports.fileTypeArray = ['avif', 'webp', 'jpeg', 'png'];
var isFileType = function (str) {
    return exports.fileTypeArray.includes(str);
};
exports.isFileType = isFileType;
var squooshEncodeExtensions = ['avif', 'webp', 'mozjpeg', 'oxipng'];
var isSquooshEncodeExtension = function (str) {
    return squooshEncodeExtensions.includes(str);
};
/**
 * 指定されたfilepathの画像を最適化する
 *
 * @param filePath
 * @param fileType
 * @param option
 */
var optimize = function (image, fileType, option) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function () {
        var preprocessOptions, outputFileType, avif, webp, mozjpeg, encodeOption, _i, _k, key, result, extension, output;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    preprocessOptions = {};
                    outputFileType = (_a = option.outputFileType) !== null && _a !== void 0 ? _a : fileType;
                    if (option.resize) {
                        preprocessOptions.resize = option.resize;
                    }
                    return [4 /*yield*/, image.preprocess(preprocessOptions)];
                case 1:
                    _l.sent();
                    avif = {
                        quality: option.quality
                    };
                    webp = {
                        quality: option.quality
                    };
                    mozjpeg = {
                        quality: option.quality
                    };
                    encodeOption = {
                        avif: {},
                        webp: {},
                        mozjpeg: {},
                        oxipng: {}
                    };
                    if (option.quality) {
                        for (_i = 0, _k = Object.keys(encodeOption); _i < _k.length; _i++) {
                            key = _k[_i];
                            if (isSquooshEncodeExtension(key)) {
                                encodeOption[key].quality = option.quality;
                            }
                        }
                    }
                    return [4 /*yield*/, image.encode(encodeOption)];
                case 2:
                    result = _l.sent();
                    extension = 'avif';
                    output = Buffer.from("");
                    switch (outputFileType) {
                        case 'avif':
                            extension = 'avif';
                            output = (_c = (_b = result.avif) === null || _b === void 0 ? void 0 : _b.binary) !== null && _c !== void 0 ? _c : Buffer.from("");
                            break;
                        case 'jpeg':
                            extension = 'jpeg';
                            output = (_e = (_d = result.mozjpeg) === null || _d === void 0 ? void 0 : _d.binary) !== null && _e !== void 0 ? _e : Buffer.from("");
                            break;
                        case 'webp':
                            extension = 'webp';
                            output = (_g = (_f = result.webp) === null || _f === void 0 ? void 0 : _f.binary) !== null && _g !== void 0 ? _g : Buffer.from("");
                            break;
                        case 'png':
                            extension = 'png';
                            output = (_j = (_h = result.oxipng) === null || _h === void 0 ? void 0 : _h.binary) !== null && _j !== void 0 ? _j : Buffer.from("");
                    }
                    return [2 /*return*/, { file: output, fileType: extension }];
            }
        });
    });
};
exports.optimize = optimize;
var listFiles = function (dir) {
    return fsSync.readdirSync(dir, { withFileTypes: true }).flatMap(function (dirent) {
        return dirent.isFile() ? ["".concat(dir, "/").concat(dirent.name)] : listFiles("".concat(dir, "/").concat(dirent.name));
    });
};
var computeXY = function (file, fileType, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var imageSizeInfo, midPoint, computeCoordinate;
        return __generator(this, function (_a) {
            if (fileType === "avif") {
                throw Error("Not support mid-crop for avif");
            }
            imageSizeInfo = ImageSize.imageSize(file);
            if (imageSizeInfo.width === undefined || imageSizeInfo.height === undefined) {
                throw Error("Unexpected error in imagesize");
            }
            midPoint = { x: imageSizeInfo.width / 2, y: imageSizeInfo.height / 2 };
            computeCoordinate = { x: midPoint.x - (width / 2), y: midPoint.y - (height / 2) };
            if (computeCoordinate.x < 0 || computeCoordinate.y < 0) {
                throw Error("The width or height specified in mid-crop-option is too large");
            }
            return [2 /*return*/, computeCoordinate];
        });
    });
};
exports.computeXY = computeXY;
var crop = function (file, fileType, cropArray) {
    return __awaiter(this, void 0, void 0, function () {
        var jimpLoaded, buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!cropArray) {
                        throw Error("not specified crop number");
                    }
                    switch (fileType) {
                        case 'jpeg':
                        case 'png':
                            break;
                        default:
                            throw Error("dont support type of resize");
                    }
                    return [4 /*yield*/, es_1["default"].read(file)];
                case 1:
                    jimpLoaded = _a.sent();
                    jimpLoaded.crop.apply(jimpLoaded, cropArray);
                    buffer = jimpLoaded.getBufferAsync("image/" + fileType);
                    return [2 /*return*/, buffer];
            }
        });
    });
};
exports.crop = crop;
var imageExec = function (filePath, commandSet, option) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var imagePool, lastFileName, isDirectory, targetFiles, fileNames, _i, fileNames_1, fileName, file, fileType, file, fileType, outputFiles, _f, targetFiles_1, targetFile, fileBuffer, fileType, cropArray, midCropArray, computedCoordinate, output, image, outputFile, outputFileType, splitFilePath, outputLastFileSplitName, outputLastFileName, outputFilePath, _g, outputFiles_1, outputFile;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    console.log({ filePath: filePath, commandSet: commandSet, option: option });
                    imagePool = new lib_1.ImagePool((0, os_1.cpus)().length);
                    lastFileName = filePath.split('/')[filePath.split('/').length - 1];
                    isDirectory = lastFileName === '';
                    targetFiles = [];
                    // 入力層
                    console.log("imageExec: \u5165\u529B\u5C64, commandSet = ".concat(Array.from(commandSet).join(','), ", outputFileType = ").concat(option.outputFileType));
                    if (!isDirectory) return [3 /*break*/, 5];
                    fileNames = listFiles(filePath);
                    _i = 0, fileNames_1 = fileNames;
                    _h.label = 1;
                case 1:
                    if (!(_i < fileNames_1.length)) return [3 /*break*/, 4];
                    fileName = fileNames_1[_i];
                    return [4 /*yield*/, fs.readFile(fileName)];
                case 2:
                    file = _h.sent();
                    fileType = (0, exports.assumeExtension)(fileName);
                    targetFiles.push({ file: file, fileType: fileType, filePath: fileName });
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, fs.readFile(filePath)];
                case 6:
                    file = _h.sent();
                    fileType = (0, exports.assumeExtension)(filePath);
                    targetFiles.push({ file: file, fileType: fileType, filePath: filePath });
                    _h.label = 7;
                case 7:
                    outputFiles = [];
                    _f = 0, targetFiles_1 = targetFiles;
                    _h.label = 8;
                case 8:
                    if (!(_f < targetFiles_1.length)) return [3 /*break*/, 17];
                    targetFile = targetFiles_1[_f];
                    fileBuffer = targetFile.file;
                    fileType = targetFile.fileType;
                    if (!commandSet.has("crop")) return [3 /*break*/, 13];
                    cropArray = (_a = option === null || option === void 0 ? void 0 : option.crop) === null || _a === void 0 ? void 0 : _a.crop;
                    if (!((_b = option === null || option === void 0 ? void 0 : option.crop) === null || _b === void 0 ? void 0 : _b.midCrop)) return [3 /*break*/, 10];
                    midCropArray = (_c = option === null || option === void 0 ? void 0 : option.crop) === null || _c === void 0 ? void 0 : _c.midCrop;
                    return [4 /*yield*/, (0, exports.computeXY)(fileBuffer, fileType, midCropArray[0], midCropArray[1])];
                case 9:
                    computedCoordinate = _h.sent();
                    cropArray = __spreadArray([computedCoordinate.x, computedCoordinate.y], midCropArray, true);
                    _h.label = 10;
                case 10:
                    if (!cropArray) return [3 /*break*/, 12];
                    return [4 /*yield*/, (0, exports.crop)(fileBuffer, fileType, cropArray)];
                case 11:
                    fileBuffer = _h.sent();
                    return [3 /*break*/, 13];
                case 12:
                    console.table(option === null || option === void 0 ? void 0 : option.crop);
                    throw Error("cropArray is undefined");
                case 13:
                    output = { file: fileBuffer, fileType: fileType };
                    if (!commandSet.has("optimize")) return [3 /*break*/, 15];
                    image = imagePool.ingestImage(output.file);
                    return [4 /*yield*/, (0, exports.optimize)(image, output.fileType, option)];
                case 14:
                    output = _h.sent();
                    _h.label = 15;
                case 15:
                    outputFile = output.file;
                    outputFileType = output.fileType;
                    splitFilePath = targetFile.filePath.split('/');
                    outputLastFileSplitName = splitFilePath[splitFilePath.length - 1].split('.');
                    if ((_d = option.rename) === null || _d === void 0 ? void 0 : _d.suffix) {
                        outputLastFileSplitName[outputLastFileSplitName.length - 2] = outputLastFileSplitName[outputLastFileSplitName.length - 2] + "-" + ((_e = option.rename) === null || _e === void 0 ? void 0 : _e.suffix);
                    }
                    outputLastFileSplitName[outputLastFileSplitName.length - 1] = outputFileType;
                    outputLastFileName = outputLastFileSplitName.join('.');
                    splitFilePath[splitFilePath.length - 1] = outputLastFileName;
                    outputFilePath = splitFilePath.join('/');
                    outputFiles.push({
                        file: outputFile,
                        filePath: outputFilePath
                    });
                    _h.label = 16;
                case 16:
                    _f++;
                    return [3 /*break*/, 8];
                case 17:
                    // 出力層
                    console.log('出力層: outputFiles', outputFiles.map(function (file) { return file.filePath; }), 'dstFilePath: ', filePath);
                    _g = 0, outputFiles_1 = outputFiles;
                    _h.label = 18;
                case 18:
                    if (!(_g < outputFiles_1.length)) return [3 /*break*/, 21];
                    outputFile = outputFiles_1[_g];
                    return [4 /*yield*/, fs.writeFile(outputFile.filePath, outputFile.file)];
                case 19:
                    _h.sent();
                    _h.label = 20;
                case 20:
                    _g++;
                    return [3 /*break*/, 18];
                case 21: return [4 /*yield*/, imagePool.close()];
                case 22:
                    _h.sent();
                    return [2 /*return*/, outputFiles];
            }
        });
    });
};
exports.imageExec = imageExec;
var assumeExtension = function (filePath) {
    var lastFileName = filePath.split('/')[filePath.split('/').length - 1];
    var extension = lastFileName.split('.')[1];
    var fileType = 'jpeg';
    switch (extension) {
        case "jpeg":
        case "jpg":
            fileType = 'jpeg';
            break;
        case "avif":
            fileType = 'avif';
            break;
        case "webp":
            fileType = 'webp';
            break;
        case "png":
            fileType = 'png';
            break;
    }
    return fileType;
};
exports.assumeExtension = assumeExtension;
