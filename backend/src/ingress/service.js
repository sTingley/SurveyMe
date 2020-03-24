const express = require("express");
const log4js = require('log4js');
//MongoClient.connect("mongodb+srv://m001-student:m001-mongodb-basics@cluster0-rmf3a.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true },

const connectMongo = async (application) => {

	const { MongoClient } = require('mongodb');
	const assert = require('assert');
	let db;

	MongoClient.connect(`mongodb+srv://${application.config.dbUser}:${application.config.dbPass}@cluster0-rmf3a.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true },
		(err, client) => {

			assert.equal(err, null)
			db = client.db(`${application.config.dbName}`);
			application.logger.debug(`connected to db on port ${application.config.dbPort}`);
			const routes = require('./routes');
			routes.expose(application, db) //routes will contain our endpoints
				.then(() => {
					application.logger.info('endpoints exposed');
				})
				.catch((err) => {
					application.logger.error(err);
				})
		})
}


const loadDb = async (application) => {

	connectMongo(application) //Today we are using Mongo but this function doesn't care
		.then(() => {
			application.logger.debug('tested db connection and exposed endpoints ... \n')
		})
		.catch((err) => {
			application.logger.error(err);
		})
}


const authenticate = async (application) => {

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("messing with async syntax"), 1000)
	  });
	
	  let result = await promise; // wait until the promise resolves (*)

}


const start = async (application) => {

	application.logger.info('Configure Express ...\n');
	application.endpoints.use(express.json());
	const cookieParser = require('cookie-parser');
	application.endpoints.use(cookieParser());
	application.logger.info('Use cookie parser ... \n')
	application.endpoints.use((req, res, next) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Headers', 'content-type');
		res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
		next();
	})

	const authenticated = authenticate(application);
	const promiseDB = loadDb(application);

	try {

		await Promise.all([authenticated, promiseDB])
			.then(() => {
				application.logger.info('db connection tested...');
			})
			.then(() => {
				application.endpoints.listen(application.config.apiPort, () => {
					application.logger.info(`express service listening on ${application.config.apiPort}`)
				})
			})
			.catch((err) => {
				application.logger.error('failed to load middleware...');
				throw err;
			})

	} catch (e) {
		throw e;
	}


}

const IngressService = () => {

	const application = {};

	const fs = require('fs');
	application.config = JSON.parse(fs.readFileSync('../config.json', 'utf-8'))

	Object.freeze(application.config);

	log4js.configure(application.config.logger);
	application.logger = log4js.getLogger();

	application.endpoints = express(application);

	return {

		start: () => {
			return start(application);
		}
	}

}

module.exports = IngressService;