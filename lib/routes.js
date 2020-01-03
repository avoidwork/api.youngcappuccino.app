"use strict";

const path = require("path"),
	lru = require("tiny-lru"),
	cache = lru(1e3, 900),
	clone = require(path.join(__dirname, "clone.js")),
	{filter} = require(path.join(__dirname, "middleware.js")),
	geo = require(path.join(__dirname, "geo.js")),
	search = require(path.join(__dirname, "search.js"));

const routes = {
	"always": {
		"/.*": filter
	},
	"get": {
		"/": ["api"],
		"/api": ["geo", "search"],
		"/api/geo": (req, res) => {
			const key = `ip_${req.ip}`,
				cached = cache.get(key);
			let result;

			if (cached !== void 0) {
				result = cached;
			} else {
				result = geo(req.ip);
				cache.set(key, clone(result));
			}

			res.send(result);
		},
		"/api/search": async (req, res) => {
			const lat = req.parsed.searchParams.get("lat"),
				long = req.parsed.searchParams.get("long"),
				radius = req.parsed.searchParams.get("radius");

			if (lat !== null && long !== null && isNaN(lat) === false && isNaN(long) === false) {
				const key = `search_${lat}_${long}_${radius}`,
					cached = cache.get(key);

				if (cached !== void 0) {
					res.send(cached);
				} else {
					const result = await search(lat, long, radius !== null && isNaN(radius) === false ? radius : void 0);

					if (result instanceof Error) {
						res.error(500, result);
					} else if (result.error_message !== void 0) {
						res.error(500, new Error(result.error_message));
					} else {
						const output = result.results.map(i => {
							return {id: i.id, name: i.name, address: i.vicinity, price: i.price_level, rating: i.rating};
						});

						cache.set(key, clone(output));
						res.send(output);
					}
				}
			} else {
				res.error(400, new Error("Must specify 'lat' and 'long' in query string"));
			}
		}
	}
};

module.exports = routes;
