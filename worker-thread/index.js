const { StaticPool } = require('node-worker-threads-pool');


// async function asd(time) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('fsdgds')
//         }, time)
//     })
// }

const staticPool = new StaticPool({
    size: 100,
    task: "./worker.js"
});
module.exports = {
    staticPool
}


















// const wt = require("worker-thread");

// function worker(n) {
//     return new Promise(r => {
//         console.log('thread 1');
//         const second = Math.floor((Math.random() * 6));
//         setTimeout(() => r(`delay ${second}s: ${n}`), second * 1000);
//     });
// }
// function worker2(n) {
//     return new Promise(r => {
//         console.log('thread 2');
//         const second = Math.floor((Math.random() * 6));
//         setTimeout(() => r(`delay ${second}s: ${n}`), second * 1000);
//     });
// }

// const ch = wt.createChannel(worker, 100);
// const ch2 = wt.createChannel(worker2, 100);

// ch.on("done", (err, result) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log(result);
// });

// ch.on("stop", () => {
//     console.log("channel is stop");
// });
// ch2.on("stop", () => {
//     console.log("channel 2 is stop");
// });

// let i = 0;
// while (i < 100) {
//     ch.add(i++);
//     ch2.add(1000 - i)
// }