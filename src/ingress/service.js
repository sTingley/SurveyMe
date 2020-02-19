const express = require("express");
const log4js = require('log4js');
const routes = require('./routes');
const assert = require('assert');

//MongoClient.connect("mongodb+srv://m001-student:m001-mongodb-basics@cluster0-rmf3a.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true },

const testDbConnection = async (application) => {

	const { MongoClient } = require('mongodb');
	const assert = require('assert');

	MongoClient.connect(`mongodb+srv://${application.config.dbUser}:${application.config.dbPass}@cluster0-rmf3a.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true },
		(err, client) => {

			assert.equal(err, null)
			const db = client.db(`${application.config.dbName}`);
			//we are passing the database object to the routes.expose method -- worry about db access there
			routes.expose(application, db)
				.then(() => {
					application.logger.info(`connected to db on port ${application.config.dbPort}`);
					application.logger.info(`endpoints configured`);
				})
		})
}


const loadDb = async (application) => {

	testDbConnection(application)
		.then(() => {
			application.logger.debug('tested db connection ... \n')
		})
		.catch((err) => {
			application.logger.error(err);
			res.status(501).send({ message: "you got an error", error: err })
		})
}


const loadOtherMiddlewares = async (application) => {
    return new Promise((resolve, reject) => {
        resolve(application.logger.info('Here we could make file system / other calls'))
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

	const loadStuff = loadOtherMiddlewares(application);
	const promiseDB = loadDb(application);

	try {

		await Promise.all([loadStuff, promiseDB])
			.then(() => {
				application.logger.info('middleware and db connection tested...');
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

	application.config = require('/home/tcsuser/Projects/SurveyMe/config.json');

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