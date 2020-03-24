/**********************************************************************
Current routes exposed/supported:
    GetSurveys (GET,POST), addSurvey, editSurvey, deleteSurvey,
    addUser, getUsers, signIn
***********************************************************************/

const expose = async (application, db) => {

    const assert = require('assert');

    const { /*signIn,*/ welcome, refresh } = require('../auth/auth');
    const jwt = require('jsonwebtoken')
    const jwtKey = 'my_secret_key'
    const jwtExpirySeconds = 300

    //application.endpoints.post('/signin', signIn);
    application.endpoints.get('/welcome', welcome);
    application.endpoints.post('/refresh', refresh);

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/signin', (req, res) => {

        const { username, password } = req.body;
        if (!username || !password) {
            // return 401 error is username or password doesn't exist in request
            return res.status(401).end();
        }

        const collection = db.collection('users');
        collection.findOne({ username: req.body.username }, (err, docs) => {

            assert.equal(err, null);
            if (docs != null && docs.hashedpass == password) {

                // Create a new token with the username in the payload
                // and which expires 300 seconds after issue
                const token = jwt.sign({ username }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                })
                console.log('token:', token);

                // set the cookie as the token string, with a similar max age as the token
                // here, the max age is in milliseconds, so we multiply by 1000
                res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
                res.end();

            } else { res.status(200).send({ message: 'try again broh.' }) }
        })
    })

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.get('/api/v1/getSurveys', (req, res) => {

        const collection = db.collection('surveys');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);

            if (docs.length > 0) {
                res.status(200).send({ docs });
            } else { res.status(200).send({ message: 'no surveys found.' }); }
        })
    })

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/api/v1/getSurveys', (req, res) => {

        if (!req.body) { res.status(400).send({ message: 'must send a request.body' }) }

        const collection = db.collection('surveys');
        collection.find({ owners: req.body.owners }).toArray(function (err, docs) {

            assert.equal(err, null);
            if (docs.length > 0) {
                const filtered = docs.filter((e) => { return e.owners; })
                res.status(200).send({ filtered });

            } else { res.status(200).send({ message: `no surveys found for ${req.body.owners}` }) }
        })
    })

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/api/v1/addUser', (req, res) => {
        //TODO:
        //error handling
        //encryption
        if (!req.body) {
            res.status(400).send({ message: 'must send a request.body' })
        }

        //making new collection for user data
        const collection = db.collection('users');
        const username = req.body.username;

        //encrypt here
        const hashedpass = req.body.password;

        collection.insertOne({ username, hashedpass }, (err, result) => {
            assert.equal(err, null);
            res.status(200).send({ message: 'user added', username: `${username}` });
        })
    })

    /**********************************************************************
    ***********************************************************************/
    //only for dev server will configure later
    application.endpoints.get('/api/v1/getUsers', (req, res) => {
        application.logger.debug('inside get users');
        const collection = db.collection('users');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            if (docs.length > 0) { //TODO: make this better and check req
                res.status(200).send({ docs })
            } else {
                res.status(200).send({ message: 'did not get users.' })
            }
        })
    })

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/api/v1/addSurvey', (req, res) => {

        if (!req.body) {
            res.status(400).send({ message: 'must send a request.body' })
        }
        const collection = db.collection('surveys');
        //TODO-Check if the survey already exists by ID before adding to the DB?
        collection.insertOne(req.body, (err, result) => {
            assert.equal(err, null);
            res.status(200).send({ message: 'survey added' });
        })

    });

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/api/v1/editSurvey/:id', (req, res) => {

        if (!req.body.survey) { //TODO: Pure functions to check for req values to remove duplicate code
            res.status(404).send({ message: 'must input a request.body.ID' })
        }
        const collection = db.collection('surveys');

    });

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/api/v1/deleteSurvey/', (req, res) => {

        if (!req.body.surveyID) {
            res.status(404).send({ message: 'must input a request.body.survey' })
        }
        const collection = db.collection('surveys');
        collection.findOne({ id: req.body.surveyID }, (err, survey) => { //findOne bc no duplicate IDs

            assert.equal(err, null);
            if (survey != null) {
                collection.deleteOne({ id: req.body.surveyID }, (err, item) => {
                    assert.equal(err, null);
                    console.log("response from deleteOne: " + JSON.stringify(item));
                    res.status(200).send({ message: `might have removed ${req.body.surveyID} from collection` })
                })

            } else { res.status(200).send({message: `did not find any survey with ID ${req.body.surveyID}`}) }
        })
    })

}

module.exports = { expose }


