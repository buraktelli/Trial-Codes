const { staticPool } = require('./index')

for (let i = 0; i < 1000000; i++) {
    staticPool.exec(i).then(async (result) => {
        console.log('result from thread pool:', result); // result will be 2.
    });
    staticPool.exec(i + 1000000).then(async (result) => {
        console.log('result from thread pool 2 :', result); // result will be 2.
    });
}
