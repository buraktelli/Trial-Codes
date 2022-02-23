const fs = require('fs')
const { execSync } = require('child_process')
const { XMLParser } = require('fast-xml-parser')
const util = require('./util')

const epsg = '32636'
pipeline2 = {
    pipeline: [
        {
            type: "readers.las",
            filename: "files/tr_istanbul-0-2020.05.12-14.12.57f32_split_224.las"
        },
        {
            type: 'filters.reprojection',
            in_srs: 'EPSG:' + `${epsg}`,
            out_srs: 'EPSG:4326'
        },
        {
            type: "writers.text",
            order:"X,Y,Z",
            precision: 10,
            filename: "files/outputfile.txt"
        }
    ]
}

const pipeline = JSON.stringify(pipeline2)
console.log('-----> ', pipeline);
fs.writeFileSync('pipeline.txt', pipeline, 'utf-8')
execSync('pdal pipeline pipeline.txt')
fs.unlinkSync('pipeline.txt')


// const array = fs.readFileSync('outputfile.txt').toString().split("\n");
// let groupArray = []
// let patchArray = []

// const parser = new XMLParser()
// const data = parser.parse(util.returnXML())
// const dimensionOrderArray = data['pc:PointCloudSchema']['pc:dimension']
//     .map(item => item['pc:name'])
//     .map(dimension => array[0].split(',').indexOf(`"${dimension}"`))

// let columnIndex = array[0].split(',').indexOf('"ScanDirectionFlag"')
// let temp = array[1].split(',')[columnIndex]

// for (let i = 1; i < array.length; i++) {
//     const lineValue = array[i].split(',')[columnIndex]
//     if (array[i].split(',')[columnIndex]) {
//         const orderArray = dimensionOrderArray.map(item => array[i].split(',')[item])
//         array[i] = orderArray.join(',')
//         if (lineValue === temp) {
//             patchArray.push(array[i])
//         } else {
//             groupArray.push(patchArray)
//             patchArray = []
//             patchArray.push(array[i])
//             temp = lineValue
//         }
//     }
// }
// groupArray.push(patchArray)
// groupArray = groupArray.filter(array => array.length > 0)
// const patchStringArray = groupArray.map(group => group.join(','))

// console.log(patchStringArray[0]);
// //SELECT PC_MakePatch(1, ARRAY[-126.99,45.01,1,0, -126.98,45.02,2,0, -126.97,45.03,3,0]);
// //DB insert pa, filename, median_time
