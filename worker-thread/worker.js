const { parentPort } = require("worker_threads");

parentPort.on("message", async (data) => {
    parentPort.postMessage({ num: data, fib: await getFib(data) });
});

function getFib(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num)
        }, 10000);
    })
    //   if (num === 0) {
    //     return 0;
    //   } else if (num === 1) {
    //     return 1;
    //   } else {
    //     return getFib(num - 1) + getFib(num - 2);
    //   }
}
