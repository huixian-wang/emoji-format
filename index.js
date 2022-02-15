const fs = require('fs');
const Jimp = require("jimp")

const GIFEncoder = require('gifencoder');
const pngDecoder = require('png-file-stream');
const encoder = new GIFEncoder(240, 240);

const folderName = '/Users/bytedance/Desktop/emoji'
const originFloder = `${folderName}/origin`
const pngFolder = `${folderName}/png`
const gifFolder = `${folderName}/gif`
const isImage = fileName => {
    const nameArr = fileName.split('.')
    return ['jpg', 'jpeg', 'png'].includes(nameArr[1])
}

try {
    if (!fs.existsSync(originFloder)) {
        fs.mkdirSync(originFloder)
    }
    fs.readdirSync(originFloder)
        .filter(fileName => isImage(fileName))
        .forEach(fileName => {
            Jimp.read(`${originFloder}/${fileName}`, (err, image) => {
                const name = fileName.split('.')[0]
                if (err) {
                    throw err
                }
                image
                    .resize(240, 240)
                    .write(`${pngFolder}/${name}.png`)
                const stream = pngDecoder(`${pngFolder}/${name}.png`)
                    .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
                    .pipe(fs.createWriteStream(`${gifFolder}/${name}.gif`));
            })
        })

} catch(err) {
    console.log('%c [ err ]', 'font-size:13px; background:pink; color:#bf2c9f;', err);
}