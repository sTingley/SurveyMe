/**********************************************************************
Current routes exposed/supported:
-GetSurveys, addSurvey, editSurvey, deleteSurvey
***********************************************************************/

const expose = async (application, db) => {

    const assert = require('assert');
    application.logger.warn('ST: there is a bug');

    /**********************************************************************
    ***********************************************************************/

    application.endpoints.get('/api/v1/getSurveys', (req, res) => {
        application.logger.debug('inside getSurveys');
        const collection = db.collection('surveys');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            if (docs.length > 0) { //TODO: make this better and check req
                res.status(200).send({ docs })
            } else {
                res.status(200).send({ message: 'no surveys found.' })
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
        //TODO-Check if the survey already exists by ID before adding to the DB
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
    application.endpoints.post('api/v1/deleteSurvey/:id', (req, res) => {

        if (!req.body.survey) {
            res.status(404).send({ message: 'must input a request.body.survey' })
        }
        const collection = db.collection('surveys');
        collection.findOne({ ID: req.body.surveyID }, (err, survey) => {

            console.log("response from findOne:  " + JSON.stringify(survey));

            assert.equal(err, null);
            if (survey != null) {
                collection.deleteOne({ ID: req.body.surveyID }, (err, item) => {
                    assert.equal(err, null);
                    console.log("response from deleteOne: " + JSON.stringify(item));
                    res.status(200).send({ message: `might have removed ${req.body.surveyID} from collection` })
                })
            }
        })
    })

}

module.exports = { expose }

