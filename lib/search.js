"use strict";

const fetch = require("node-fetch"),
	{URL} = require("url"),
	googleMaps = process.env.YC_GOOGLE_MAPS_KEY;

async function search (lat = 0, long = 0, radius = 1000, distance = true) {
	const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
	let result;

	url.searchParams.set("key", googleMaps);
	url.searchParams.set("keyword", "cappuccino");
	url.searchParams.set("keyword", "coffee");
	url.searchParams.set("keyword", "espresso");
	url.searchParams.set("location", `${lat},${long}`);
	url.searchParams.set("type", "cafe");

	if (distance) {
		url.searchParams.set("rankby", "distance");
	} else {
		url.searchParams.set("radius", radius);
	}

	const res = await fetch(url.href, {method: "GET"}),
		data = await res.json();

	result = data;

	return result;
}

module.exports = search;
