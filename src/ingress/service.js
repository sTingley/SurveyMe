const express = require("express");
const log4js = require('log4js');
const routes = require('./routes');
const assert = require('assert');

//MongoClient.connect("mongodb+srv://m001-student:m001-mongodb-basics@cluster0-rmf3a.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true },

const connectMongo = async (application) => {

	const { MongoClient } = require('mongodb');
	const assert = require('assert');

	MongoClient.connect(`mongodb+srv://${application.config.dbUser}:${application.config.dbPass}@cluster0-rmf3a.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true },
		(err, client) => {

			assert.equal(err, null)
			const db = client.db(`${application.config.dbName}`);

			application.logger.debug(`connected to db on port ${application.config.dbPort}`);

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
			application.logger.debug('tested db connection ... \n')
		})
		.catch((err) => {
			application.logger.error(err);
			res.status(501).send({ message: "you got an error", error: err })
		})
}


const authenticate = async (application) => {
	//TO-DO: Have this resolve the auth.js auth method
    return new Promise((resolve, reject) => {
        resolve(application.logger.warn('Session auth is TBD. Likely going to use JWTs.'))
    })
}


const start = async (application) => {

	application.logger.info('load any middleware and connecting to db ...\n');

	application.endpoints.use(express.json());
	application.endpoints.use((req, res, next) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Headers', 'content-type');
		res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
		next();
	})

	const loadStuff = authenticate(application);
	const promiseDB = loadDb(application);

	try {

		await Promise.all([loadStuff, promiseDB])
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
	application.config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

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