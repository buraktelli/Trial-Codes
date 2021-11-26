
const { machineIdSync } = require('node-machine-id')
const os = require('os')

let id = machineIdSync()
console.log(id);

// console.log(process);
// console.log(os.networkInterfaces());