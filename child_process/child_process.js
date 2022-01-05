const { execSync } = require('child_process');

const output = execSync('ssh jenkins@192.168.20.218', { encoding: 'utf-8' });

console.log('The output is:');
console.log(output);

// const { createLogger, format, transports } = require('winston');
// const { combine, timestamp, label, printf } = format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
// });

// const logger = createLogger({
//     level: 'info',
//     format: combine(
//         label({ label: 'right meow!' }),
//         timestamp(),
//         myFormat,
//     ),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//         new transports.Console({
//             format: format.combine(
//                 format.colorize(),
//                 format.simple()
//             )
//         }),
//         new transports.File({
//             filename: 'error.log',
//             level: 'error',
//         }),
//         // new transports.File({ filename: 'combined.log' }),
//     ],
// });

// logger.add(new transports.Console({
//     format: format.simple(),
// }));
// logger.log({
//     level: 'error',
//     message: 'Hello distributed log files!'
// });
