const fs = require('fs');


const loop = 1024;
for (let i = 0; i < loop; i++) {
    const b = Buffer.alloc(20 * 1024 * 1024)
    fs.appendFileSync('foo.txt', b)
}