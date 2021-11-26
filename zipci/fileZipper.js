const express = require('express');

const archiver = require('archiver')
const fs = require('fs');
const path = require('path');

const folder = '/attachment';

const util = require('util');
// const { finished } = require('stream')
// const streamFinishedPromise = util.promisify(finished);
const readFile = util.promisify(fs.readFile);
const app = express();

app.get('/', start);
async function start(req, res) {

    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    archive.on('error', function (err) {
        console.log('err', err);
    });
    const files = fs.readdirSync(folder).reverse().filter((a, i) => i < 200);
    console.log('files', files);
    res.on('error', (err) => {
        console.log('error', err);
    })
    const writestream = fs.createWriteStream('write.zip')

    archive.pipe(writestream)

    for (const f of files) {
        const ff = path.join(folder, f);
        const b = await readFile(ff);
        console.log('B', b.length);
        archive.append(b, { name: f + '.png' });
    }
    archive.on('end', () => {
        const stream = fs.createReadStream('write.zip');
        stream.pipe(res);
    })
    console.log('bitti');
    await archive.finalize();
}