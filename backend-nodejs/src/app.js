const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(logRequests);
app.use(router);

function logRequests(request, response, next) {
	const { method, url } = request;
	const loglabel = `[${method.toUpperCase()}] ${url} - ${JSON.stringify(
		request.body
	)}`;
	console.log(loglabel);

	return next(); // Próximo Middleware
}

function errorHandler(err, req, res, next) {
	if (err) {
		return res.status(400).json({ error: err.message });
	}
	return next();
}

app.use((err, req, res, next) => errorHandler(err, req, res, next));

module.exports = app;
