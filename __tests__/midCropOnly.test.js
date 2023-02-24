const {describe, expect, it} = require('@jest/globals')
const {imageExec} = require('../optimize')
const {readFileSync, statSync, writeFileSync, unlinkSync} = require('fs')
const pixelMatch = require('pixelmatch')
const PNG = require('pngjs').PNG
const JPEG = require('jpeg-js');
describe('imageExec crop', () => {
    it('jpeg', async () => {
        const srcFilePath = './__tests__/src/bigimage.jpeg'
        const dstFilePath = './__tests__/dst/bigImageCropOnly.jpeg'
        const srcFileInfo = statSync(srcFilePath)
        writeFileSync(dstFilePath, readFileSync(srcFilePath))
        const option = {
            crop: {midCrop: [ 500, 500 ]}
        }
        /**
         * @type Set<CommandSet>
         */
        const commandSet = new Set()
        commandSet.add('crop')
        await imageExec(dstFilePath, commandSet, option)
        const dstFileInfo = statSync(dstFilePath)
        const dstFileBuffer = readFileSync(dstFilePath)
        const vrtCheckFileBuffer = readFileSync('./__tests__/vrt_check/bigimage_mid-crop_[500,500].jpeg')
        console.log(`size ${dstFileInfo.size} < ${srcFileInfo.size}`)
        // ファイルが生成されているかつ、画像を切り取っているのでサイズが下がっている
        expect(dstFileInfo.size).not.toBe(0)
        expect(dstFileInfo.size).toBeLessThan(srcFileInfo.size)
        const jpegDstFile = JPEG.decode(dstFileBuffer)
        const jpegVrtCheckFile = JPEG.decode(vrtCheckFileBuffer)
        const diff = new PNG({width: 500, height: 500});
        const result = pixelMatch(jpegDstFile.data, jpegVrtCheckFile.data, diff.data, 500, 500, { threshold: 0.1 })
        expect(result).toBe(0)
        unlinkSync(dstFilePath);
    }, 100000)
})