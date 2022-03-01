// const express = require('express')
// const { Worker } = require('worker_threads');
// const app = express()
// app.get('/one', (req, res) => {
//     console.log(`Starting the long computation`)
//     let sum = 0;
//     for (let i = 0; i <= 1e9; i++) {
//         sum += i;
//     }
//     console.log(`Done with the computation`)
//     res.send({ sum: sum })
// })
// app.get('/two', (req, res) => {
//     console.log(`Going to create a new worker thread`)
//     const worker = new Worker("./worker.js")
//     worker.on('message', (msg) => {
//         console.log(`Worker: ${msg.result}`);
//     });
//     res.send({ sum: 'fsdfsdf' })
//     console.log(`Other works in the main thread`)
// })
// app.listen(9000, () => {
//     console.log(`listening on port 9000`)
// })

const {
    Worker,
    isMainThread
} = require('worker_threads');

// generate array with random numbers
function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() * max);
    });
}

if (isMainThread) {
    const input = randomArray(10000, 20000);
    // run thread and pass info
    console.time('a')
    const worker = new Worker('./worker.js', { workerData: { value: input } });
    // const worker2 = new Worker('./worker.js', { workerData: { value: input } });
    // const worker3 = new Worker('./worker.js', { workerData: { value: input } });
    // const worker4 = new Worker('./worker.js', { workerData: { value: input } });
    worker.on('message', (result) => {
        console.log('result');
    });
    // worker2.on('message', (result) => {
    //     console.log('result2');
    // });
    // worker3.on('message', (result) => {
    //     console.log('result3');
    // });
    // worker4.on('message', (result) => {
    //     console.log('result4');
    // });
    worker.on('exit', (code) => {
        if (code !== 0)
            throw new Error(`Worker stopped with exit code ${code}`);
        else
            console.log('Worker stopped ' + code);
            console.timeEnd('a')
    });
    // worker2.on('exit', (code) => {
    //     if (code !== 0)
    //         throw new Error(`Worker stopped with exit code ${code}`);
    //     else
    //         console.log('Worker stopped2 ' + code);
    // });
    // worker3.on('exit', (code) => {
    //     if (code !== 0)
    //         throw new Error(`Worker stopped with exit code ${code}`);
    //     else
    //         console.log('Worker stopped3 ' + code);
    // });
    // worker4.on('exit', (code) => {
    //     if (code !== 0)
    //         throw new Error(`Worker stopped with exit code ${code}`);
    //     else
    //         console.log('Worker stopped4 ' + code);
    // });
}