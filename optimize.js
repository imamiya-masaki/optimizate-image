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
exports.optimize = void 0;
var lib_1 = require("@squoosh/lib");
var os_1 = require("os");
var imagePool = new lib_1.ImagePool((0, os_1.cpus)().length);
var fs = require("fs/promises");
/**
 * 指定されたfilepathの画像を最適化する
 *
 * @param filePath
 * @param fileType
 * @param option
 */
var optimize = function (filePath, fileType, option) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var file, image, preprocessOptions, avif, webp, encodeOption, result, extension, output;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, fs.readFile(filePath)];
                case 1:
                    file = _g.sent();
                    image = imagePool.ingestImage(file);
                    preprocessOptions = {};
                    if (option.resize) {
                        preprocessOptions.resize = option.resize;
                    }
                    return [4 /*yield*/, image.preprocess(preprocessOptions)];
                case 2:
                    _g.sent();
                    avif = {
                        quality: option.quality
                    };
                    webp = {
                        quality: option.quality
                    };
                    encodeOption = {
                        avif: avif,
                        webp: webp
                    };
                    return [4 /*yield*/, image.encode(encodeOption)];
                case 3:
                    result = _g.sent();
                    extension = 'avif';
                    switch (fileType) {
                        case 'avif':
                            extension = 'avif';
                            output = (_b = (_a = result.avif) === null || _a === void 0 ? void 0 : _a.binary) !== null && _b !== void 0 ? _b : Buffer.from("");
                            break;
                        case 'jpeg':
                            extension = 'jpeg';
                            output = (_d = (_c = result.mozjpeg) === null || _c === void 0 ? void 0 : _c.binary) !== null && _d !== void 0 ? _d : Buffer.from("");
                            break;
                        case 'webp':
                            extension = 'webp';
                            output = (_f = (_e = result.webp) === null || _e === void 0 ? void 0 : _e.binary) !== null && _f !== void 0 ? _f : Buffer.from("");
                            break;
                    }
                    return [4 /*yield*/, fs.writeFile(filePath, output)];
                case 4:
                    _g.sent();
                    return [4 /*yield*/, imagePool.close()];
                case 5:
                    _g.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.optimize = optimize;
