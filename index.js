"use strict";

const path = require("path"),
	tenso = require("tenso"),
	config = require(path.join(__dirname, "config.json")),
	routes = require(path.join(__dirname, "lib", "routes.js"));

if (process.env.NODE_ENV === "production") {
	config.silent = true;
	config.dtrace = false;
}

config.routes = routes;
config.security.secret = process.env.YC_SECURITY_SECRET;
config.session.secret = process.env.YC_SESSION_SECRET;
config.session.redis.host = process.env.YC_SESSION_REDIS_HOST;

const app = tenso(config);

module.exports = app.start();
