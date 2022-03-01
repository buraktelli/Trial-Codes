// const {parentPort} = require("worker_threads")
// console.log(`Busy in worker thread`)
// let sum = 0;
// for (let i = 0; i <= 1e9; i++){
//    sum += i;
// }
// parentPort.postMessage({
//   result: sum
// })



const { workerData, parentPort } = require('worker_threads');

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"

// bubble sort
async function sort(array) {
  await f()
  const length = array.length;
  let swapped = false;
  for (let i = 0; i < length; i++) {
    swapped = false;
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return array;
}

parentPort.postMessage('ok');

sort(workerData)
function f() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000);
  })
}