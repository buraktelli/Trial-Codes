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


async function convertToShp() {
    const { convert } = require('geojson2shp')
    
    const options = {
        layer: 'agac2_usr',
        targetCrs: 4326
    }
    
    // Paths
    await convert('./agac.json', './agac2_usr.zip', options)
}

convertToShp()