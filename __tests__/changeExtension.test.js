const {describe, expect, it} = require('@jest/globals')
const {imageExec} = require('../optimize')
const {readFileSync, statSync, writeFileSync, unlinkSync} = require('fs')
describe('imageExec quality', () => {
    it('jpgToAvif', async () => {
        const srcFilePath = './__tests__/src/bigimage.jpeg'
        let dstFilePath = './__tests__/dst/jpgToAvif.jpeg'
        const srcFileInfo = statSync(srcFilePath)
        const srcFile = readFileSync(srcFilePath)
        writeFileSync(dstFilePath, srcFile)
        const option = {
            outputFileType: "avif"
        }
        const commandSet = new Set()
        commandSet.add('optimize')
        await imageExec(dstFilePath, commandSet, option)
        // imageExecで変換後のものが保存される
        unlinkSync(dstFilePath);
        dstFilePath = dstFilePath.slice(0, dstFilePath.length - 4) + "avif"
        const dstFileInfo = statSync(dstFilePath)
        console.log(`size ${dstFileInfo.size} < ${srcFileInfo.size}`)
        // ファイルが生成されているかつ、sizeが下がっている
        expect(dstFileInfo.size).not.toBe(0)
        expect(dstFileInfo.size).toBeLessThan(srcFileInfo.size)
        unlinkSync(dstFilePath);
    }, 100000)
    it('jpgToWebp', async () => {
        const srcFilePath = './__tests__/src/bigimage.jpeg'
        let dstFilePath = './__tests__/dst/jpgToWebp.jpeg'
        const srcFileInfo = statSync(srcFilePath)
        const srcFile = readFileSync(srcFilePath)
        writeFileSync(dstFilePath, srcFile)
        const option = {
            outputFileType: "webp"
        }
        const commandSet = new Set()
        commandSet.add('optimize')
        await imageExec(dstFilePath, commandSet, option)
        // imageExecで変換後のものが保存される
        unlinkSync(dstFilePath);
        dstFilePath = dstFilePath.slice(0, dstFilePath.length - 4) + "webp"
        const dstFileInfo = statSync(dstFilePath)
        console.log(`size ${dstFileInfo.size} < ${srcFileInfo.size}`)
        // ファイルが生成されているかつ、sizeが下がっている
        expect(dstFileInfo.size).not.toBe(0)
        expect(dstFileInfo.size).toBeLessThan(srcFileInfo.size)
        unlinkSync(dstFilePath);
    }, 100000)
    it('pngToAvif', async () => {
        const srcFilePath = './__tests__/src/bigimage.png'
        let dstFilePath = './__tests__/dst/pngToAvif.png'
        const srcFileInfo = statSync(srcFilePath)
        const srcFile = readFileSync(srcFilePath)
        writeFileSync(dstFilePath, srcFile)
        const option = {
            outputFileType: "avif"
        }
        const commandSet = new Set()
        commandSet.add('optimize')
        await imageExec(dstFilePath, commandSet, option)
        // imageExecで変換後のものが保存される
        unlinkSync(dstFilePath);
        dstFilePath = dstFilePath.slice(0, dstFilePath.length - 3) + "avif"
        const dstFileInfo = statSync(dstFilePath)
        console.log(`size ${dstFileInfo.size} < ${srcFileInfo.size}`)
        // ファイルが生成されているかつ、sizeが下がっている
        expect(dstFileInfo.size).not.toBe(0)
        expect(dstFileInfo.size).toBeLessThan(srcFileInfo.size)
        unlinkSync(dstFilePath);
    }, 100000)
    it('pngToWebp', async () => {
        const srcFilePath = './__tests__/src/bigimage.png'
        let dstFilePath = './__tests__/dst/pngToWebp.png'
        const srcFileInfo = statSync(srcFilePath)
        const srcFile = readFileSync(srcFilePath)
        writeFileSync(dstFilePath, srcFile)
        const option = {
            outputFileType: "webp"
        }
        const commandSet = new Set()
        commandSet.add('optimize')
        await imageExec(dstFilePath, commandSet, option)
        // imageExecで変換後のものが保存される
        unlinkSync(dstFilePath);
        dstFilePath = dstFilePath.slice(0, dstFilePath.length - 3) + "webp"
        const dstFileInfo = statSync(dstFilePath)
        console.log(`size ${dstFileInfo.size} < ${srcFileInfo.size}`)
        // ファイルが生成されているかつ、sizeが下がっている
        expect(dstFileInfo.size).not.toBe(0)
        expect(dstFileInfo.size).toBeLessThan(srcFileInfo.size)
        unlinkSync(dstFilePath);
    }, 100000)
})