const archiver = require('archiver')
const fs = require('fs');
const path = require('path');
const OS = require('os');

// const util = require('util');

// const stream = require('stream');

// const pipeline = util.promisify(stream.pipeline);
// const pipeline = util.promisify(stream.finished);
// const streamFinished = util.promisify(stream.finished);

// OS.tmpdir() + Date.now() + Math.random()
const randomFilePath = path.join(OS.tmpdir(), Date.now() + '_' + (Math.random() * 1000000).toFixed().padStart(10, '0') + '.zip')
console.log('randomFilePath', randomFilePath);


async function start() {

    const archive = archiver('zip', {
        zlib: { level: 9 }
    });


    const parentPath = 'C:/Users/Burak/Desktop/attachments';
    const files = fs.readdirSync(parentPath)

    const writeStream = fs.createWriteStream(randomFilePath)
    archive.pipe(writeStream);

    for (const f of files) {
        const filePath = path.join(parentPath, f);
        const readStream = fs.createReadStream(filePath);
        archive.append(readStream, { name: f })
        await new Promise((res) => {
            readStream.on('end', () => {
                res();
            })
        })
        // const ss = fs.createWriteStream('foo.txt');
        // console.log('HOP');
        // await pipeline(readStream, archive.wrie)

        // await streamFinished(readStream)
    }
    archive.finalize()
    // console.log('files', files);
    fs.unlink(randomFilePath, (err) => {
        if (err) throw err
        console.log('SILINDI');
    })

    // writeStream.on('finish', () => {
    //     console.log('finish')
    // })
}
start();
// console.log(archive)



