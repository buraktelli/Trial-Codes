var gdal = require("gdal");
var dataset = gdal.open("./agac_usr.shp");
var dataset2 = gdal.open("./poligonn_usr.dbf");
var layer = dataset.layers.get(0);

// console.log("number of features: " + layer.features.count());
// console.log("fields: " + layer.fields.getNames());
// console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'));




// console.log(layer.features);


dataset.layers.get(0).features.forEach(function(feature) {

    const geojson = {}

    geojson.type = "Feature"



   



    geojson.geometry = JSON.parse(feature.getGeometry().toJSON())

    geojson.properties = JSON.parse(feature.fields.toJSON())

    console.log(geojson);

});
// dataset2.layers.get(0).features.forEach(function(feature) {

//     console.log(feature.fields);
//     feature.fields.forEach((value, key) => {
//         console.log(value);
//         console.log(key);
//     });

// });