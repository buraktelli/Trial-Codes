// var gdal = require("gdal");
// var dataset = gdal.open("./agac_usr.shp");
// // var layer = dataset.layers.get(0);

// dataset.layers.get(0).features.forEach(function(feature) {
//     console.log(feature);
//     const geojson = {}
//     geojson.type = "Feature"

//     geojson.geometry = JSON.parse(feature.getGeometry().toJSON())

//     geojson.properties = JSON.parse(feature.fields.toJSON())

//     console.log(geojson);
//     console.log(geojson.geometry.coordinates);
// });


// async function convertToShp() {
//     const { convert } = require('geojson2shp')

//     const options = {
//         layer: 'agac2_usr',
//         targetCrs: 4326
//     }

//     // Paths
//     await convert('./agac.json', './agac2_usr.zip', options)
// }

// convertToShp()

// var shapefile = require("shapefile");

// shapefile.open("./agac_usr.shp")
//   .then(source => source.read()
//     .then(function log(result) {
//       if (result.done) return;
//       console.log(result.value.geometry.coordinates);
//       return source.read().then(log);
//     }))
//   .catch(error => console.error(error.stack));


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});
rl.on('line', (line)=>{
    console.log(line);
})
rl.on('history', (history)=>{
    console.log('history',history);
})

var toJSON = require('shp2json');

toJSON.fromShpFile('./agac_usr.shp')
    .pipe(process.stdout);

// rl.close()

// rl.stdout.on('data', chunk => {
//     console.log('stdout says', chunk.toString())
// })
