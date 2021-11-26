const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path');
const OS = require('os');
const archiver = require('archiver');
const util = require('util')
const {finished} = require('stream')
const streamFinishedPromise = util.promisify(finished);

const randomFilePath = path.join(OS.tmpdir(), Date.now() + '_' + (Math.random() * 1000000).toFixed().padStart(10, '0') + '.zip')
// console.log('randomFilePath', randomFilePath);


app.get('/zip', async (req, res) => {
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    res.attachment('foo.zip').type('zip')
    const parentPath = 'C:/Users/Burak/Desktop/attachments';
    const files = fs.readdirSync(parentPath)

    const writeStream = fs.createWriteStream(randomFilePath)
    archive.pipe(writeStream);
    const readStream = fs.createReadStream('foo.txt')
    console.log('hoppala')
    readStream.on('data', (data) => {
        console.log('readstream1 end');
        archive.append(data, { name: 'foo' })

    })

    readStream.on('end', () => {
        archive.finalize()
    })
    archive.on('end', () => {
        console.log('archive bitti');
        const file = fs.createReadStream(randomFilePath)
        file.on('data', (data) => {
            console.log('data geliyor');
            // res.write(data)
        })
        file.pipe(res)
        file.on('end', () => {
            console.log('Readstream bitti');
            // res.end()
            fs.unlink(randomFilePath, (err) => {
                if (err) throw err
                console.log('SILINDI');
            })
        })
    })
    for (const f of files) {
        // const filePath = path.join(parentPath, f);
        // const readStream = fs.createReadStream(filePath);
        // archive.append(readStream, { name: f })
        // await new Promise((res) => {
        //     readStream.on('end', () => {
        //         res();
        //     })
        // })
    }

    // file.pipe(res)
    // archive.pipe(res)

})

app.get('/', async (req, res) => {
    res.attachment('foo.zip').type('zip');
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    const files = [ 'yarn.lock', 'foo.txt', 'index.js', 'package.json']
    // const parentPath = 'C:/Users/Burak/Desktop/attachment';
    // const files = fs.readdirSync(parentPath);
    archive.pipe(res)
    for (const f of files) {
        // const filePath = path.join(parentPath, f)
        const s = fs.createReadStream(f);
        archive.append(s, { name: f });
        await streamFinishedPromise(s);
    }

    await archive.finalize();
    res.end();
})

app.listen(3000)