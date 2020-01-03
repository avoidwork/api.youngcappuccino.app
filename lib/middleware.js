"use strict";

function filter (req, res, next) {
	if (req.headers.origin === void 0) {
		res.error(403);
	} else {
		next();
	}
}

module.exports = {
	filter
};
