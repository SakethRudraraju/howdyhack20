
//calculates the distance between two points and returns in miles
function calcDistance(from, to) {
    var R = 6371; // km
    var dLat = toRad(from[0] - to[0]);
    var dLon = toRad(from[1] - to[1]);
    var lat1 = toRad(from[0]);
    var lat2 = toRad(to[0]);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(from[0]) * Math.cos(to[0]);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// convert to radiasns
function toRad(Value) {
    return Value * Math.PI / 180;
}


exports.calcDistance = calcDistance