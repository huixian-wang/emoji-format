const fs = require('fs');
const Jimp = require("jimp")
const images = require("images");

const folderName = '/Users/bytedance/Desktop/emoji/cover'
const isImage = fileName => {
    const nameArr = fileName.split('.')
    return ['jpg', 'jpeg', 'png'].includes(nameArr[1])
}

try {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
    }
    fs.readdirSync(folderName)
        .filter(fileName => isImage(fileName))
        .forEach(fileName => {
            const name = fileName.split('.')[0]
            images(`${folderName}/${fileName}`)
                .size(750, 400)
                .save(`${folderName}/${name}.png`)
        })
} catch(err) {
    console.log('%c [ err ]', 'font-size:13px; background:pink; color:#bf2c9f;', err);
}