"use strict";

const path = require("path"),
	maxmind = require("maxmind");
let cityLookup;

maxmind.open(path.join(__dirname, "..", "geo", "GeoLite2-City.mmdb")).then(arg => {
	cityLookup = arg;
});

module.exports = (arg = "127.0.0.1") => cityLookup.get(arg);
