
for (let index = 0; index < 10000; index++) {

    const distance = getDistanceFromLatLonInKm(32.83731181, 39.81415598, 32.83719558, 39.81413228)
    console.log(distance);

}
console.log('bitti');

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(6);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}