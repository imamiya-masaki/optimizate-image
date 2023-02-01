const {describe, expect, it} = require('@jest/globals')
const {imageExec} = require('../optimize')
const {readFileSync, statSync, writeFileSync, unlinkSync} = require('fs')
describe('imageExec quality', () => {
    it('jpg', async () => {
        const srcFilePath = './__tests__/src/bigimage.jpeg'
        const dstFilePath = './__tests__/dst/imageExecQuality.jpeg'
        const srcFileInfo = statSync(srcFilePath)
        const srcFile = readFileSync(srcFilePath)
        writeFileSync(dstFilePath, srcFile)
        const option = {
            quality: 60
        }
        const commandSet = new Set()
        commandSet.add('optimize')
        await imageExec(dstFilePath, commandSet, option)
        const dstFileInfo = statSync(dstFilePath)
        console.log(`size ${dstFileInfo.size} < ${srcFileInfo.size}`)
        // ファイルが生成されているかつ、sizeが下がっている
        expect(dstFileInfo.size).not.toBe(0)
        expect(dstFileInfo.size).toBeLessThan(srcFileInfo.size)
        unlinkSync(dstFilePath);
    }, 100000)
})