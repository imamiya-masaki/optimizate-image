const {describe, expect, it} = require('@jest/globals')
const {imageExec} = require('../optimize')
const {readFileSync, statSync, writeFileSync, unlinkSync} = require('fs')
const pixelMatch = require('pixelmatch')
const PNG = require('pngjs').PNG
const jpeg = require('jpeg-js')
describe('imageExec crop', () => {
    it('png', async () => {
        const srcFilePath = './__tests__/src/bigimage.png'
        const dstFilePath = './__tests__/dst/bigImageCropOnly.png'
        const srcFileInfo = statSync(srcFilePath)
        writeFileSync(dstFilePath, readFileSync(srcFilePath))
        const option = {
            crop: {crop: [ 500, 500, 500, 500 ]}
        }
        /**
         * @type Set<CommandSet>
         */
        const commandSet = new Set()
        commandSet.add('crop')
        await imageExec(dstFilePath, commandSet, option)
        const dstFileInfo = statSync(dstFilePath)
        const dstFileBuffer = readFileSync(dstFilePath)
        const vrtCheckFileBuffer = readFileSync('./__tests__/vrt_check/bigimage_crop_[500,500,500,500].png')
        console.log(`size ${dstFileInfo.size} < ${srcFileInfo.size}`)
        // ファイルが生成されているかつ、画像を切り取っているのでサイズが下がっている
        expect(dstFileInfo.size).not.toBe(0)
        expect(dstFileInfo.size).toBeLessThan(srcFileInfo.size)
        const pngDstFile = PNG.sync.read(dstFileBuffer)
        const pngVrtCheckFile = PNG.sync.read(vrtCheckFileBuffer)
        const diff = new PNG({width: 500, height: 500});
        const result = pixelMatch(pngDstFile.data, pngVrtCheckFile.data, diff.data, 500, 500, { threshold: 0.1 })
        expect(result).toBe(0)
        unlinkSync(dstFilePath);
    }, 100000)
})